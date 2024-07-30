import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataBalkRobotEndpoints } from './dataBalkRobot';
import { HttpMethod } from "../src/core/utils/types";

const microsoftGraphDiscovery = {
  authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
};

const dataBalkDiscovery = {
  authorizationEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/token',
};

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const exchangeCodeForToken = async (code: string, codeVerifier: string, redirectUri: string, discovery: typeof microsoftGraphDiscovery): Promise<AuthResult> => {
  const clientId = 'adb142b4-830f-4842-8ddf-478f5d3af9db';
  const params = new URLSearchParams({
    client_id: clientId,
    scope: discovery === microsoftGraphDiscovery ? 'User.Read' : 'api://ddbce1b6-ea7d-408e-9b52-5eebe91cf895/read.data',
    code: code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    code_verifier: codeVerifier,
  });

  const response = await fetch(discovery.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to exchange code for token: ${json.error_description || json.error}`);
  }

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token || null,
    expiresIn: json.expires_in,
  };
};

const storeToken = async (key: string, value: string | null) => {
  try {
    if (value === null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    console.error('Error storing token:', error);
    throw error;
  }
};

const getTokenFromStorage = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

export const authenticateWithMicrosoftGraph = async (): Promise<void> => {
  try {
    const clientId = 'adb142b4-830f-4842-8ddf-478f5d3af9db';
    const redirectUri = AuthSession.makeRedirectUri();
    const scopes = ['User.Read'];

    const request = new AuthSession.AuthRequest({
      clientId,
      scopes,
      redirectUri,
      usePKCE: true,
    });

    const result = await request.promptAsync(microsoftGraphDiscovery);

    console.log('Authentication result for Microsoft Graph:', result);

    if (result.type === 'success' && result.params && result.params.code) {
      const tokens = await exchangeCodeForToken(result.params.code, request.codeVerifier as string, redirectUri, microsoftGraphDiscovery);
      await storeToken('msGraphAccessToken', tokens.accessToken);
      await storeToken('msGraphRefreshToken', tokens.refreshToken);
      await storeToken('msGraphTokenExpiration', (Date.now() + tokens.expiresIn * 1000).toString());
    } else {
      throw new Error(`Authentication failed: ${result.type}`);
    }
  } catch (error) {
    console.error('Microsoft Graph authentication error:', error);
    throw error;
  }
};

export const authenticateWithDataBalkAPI = async (): Promise<void> => {
  try {
    const clientId = 'adb142b4-830f-4842-8ddf-478f5d3af9db';
    const redirectUri = AuthSession.makeRedirectUri();
    const scopes = ['api://ddbce1b6-ea7d-408e-9b52-5eebe91cf895/read.data'];

    const request = new AuthSession.AuthRequest({
      clientId,
      scopes,
      redirectUri,
      usePKCE: true,
    });

    const result = await request.promptAsync(dataBalkDiscovery);

    console.log('Authentication result for DataBalk API:', result);

    if (result.type === 'success' && result.params && result.params.code) {
      const tokens = await exchangeCodeForToken(result.params.code, request.codeVerifier as string, redirectUri, dataBalkDiscovery);
      await storeToken('dataBalkAccessToken', tokens.accessToken);
      await storeToken('dataBalkRefreshToken', tokens.refreshToken);
      await storeToken('dataBalkTokenExpiration', (Date.now() + tokens.expiresIn * 1000).toString());
    } else {
      throw new Error(`Authentication failed: ${result.type}`);
    }
  } catch (error) {
    console.error('DataBalk API authentication error:', error);
    throw error;
  }
};

const refreshAccessToken = async (refreshToken: string, discovery: typeof microsoftGraphDiscovery): Promise<AuthResult> => {
  const clientId = 'adb142b4-830f-4842-8ddf-478f5d3af9db';
  const redirectUri = AuthSession.makeRedirectUri();

  const params = new URLSearchParams({
    client_id: clientId,
    scope: discovery === microsoftGraphDiscovery ? 'User.Read' : 'api://ddbce1b6-ea7d-408e-9b52-5eebe91cf895/read.data',
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    redirect_uri: redirectUri,
  });

  const response = await fetch(discovery.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${json.error_description || json.error}`);
  }

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresIn: json.expires_in,
  };
};

export const getToken = async (keyPrefix: string): Promise<string> => {
  const accessToken = await getTokenFromStorage(`${keyPrefix}AccessToken`);
  const expiration = await getTokenFromStorage(`${keyPrefix}TokenExpiration`);
  
  console.log(`${keyPrefix} Access Token:`, accessToken);
  console.log(`${keyPrefix} Token Expiration:`, expiration);

  if (accessToken && expiration && parseInt(expiration) > Date.now()) {
    return accessToken;
  }
  
  const refreshToken = await getTokenFromStorage(`${keyPrefix}RefreshToken`);
  console.log(`${keyPrefix} Refresh Token:`, refreshToken);

  if (refreshToken) {
    const newAuth = await refreshAccessToken(refreshToken, keyPrefix === 'msGraph' ? microsoftGraphDiscovery : dataBalkDiscovery);
    await storeToken(`${keyPrefix}AccessToken`, newAuth.accessToken);
    await storeToken(`${keyPrefix}RefreshToken`, newAuth.refreshToken);
    await storeToken(`${keyPrefix}TokenExpiration`, (Date.now() + newAuth.expiresIn * 1000).toString());
    return newAuth.accessToken;
  }
  
  throw new Error('No valid token available');
};

export const fetchUserEmail = async (accessToken: string): Promise<string> => {
  const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch user email: ${json.error.message || json.error}`);
  }

  return json.mail || json.userPrincipalName;
};

export const fetchUserDetailsFromMicrosoftGraph = async () => {
  try {
    const msGraphToken = await getToken('msGraph');
    const email = await fetchUserEmail(msGraphToken);
    console.log('User Email:', email);

    // You can extend this function to fetch more user details if needed
    return { email };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const fetchUserDetails = async () => {
  try {
    // Step 1: Authenticate with Microsoft Graph to get user email
    await authenticateWithMicrosoftGraph();
    const userDetailsFromGraph = await fetchUserDetailsFromMicrosoftGraph();

    // Step 2: Authenticate with DataBalk API to get user details
    await authenticateWithDataBalkAPI();
    const dataBalkToken = await getToken('dataBalk');
    console.log('DataBalk API Token:', dataBalkToken);

    const userDetailsEndpoint = `${dataBalkRobotEndpoints.getUserDetails}${userDetailsFromGraph.email}`;
    console.log('User Details Endpoint:', userDetailsEndpoint);

    const response = await fetch(userDetailsEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${dataBalkToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching user details:', response.status, response.statusText, errorText);
      throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
    }

    const dataBalkUser = await response.json();
    console.log('DataBalk User:', dataBalkUser);

    return dataBalkUser;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};