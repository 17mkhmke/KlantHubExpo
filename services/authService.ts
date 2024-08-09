import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const microsoftGraphDiscovery = {
  authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
};

const dataBalkDiscovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}/oauth2/v2.0/token`,
};

const ticketProxyDiscovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}/oauth2/v2.0/token`,
};

const MICROSOFT_GRAPH_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
const TICKET_PROXY_CLIENT_ID = process.env.NEXT_PUBLIC_TICKETPROXY_CLIENT_ID || '';

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const GRAPH_SCOPES = 'User.Read openid profile offline_access';
const DATABALK_SCOPES = process.env.NEXT_PUBLIC_DATABALK_ROBOT_SCOPE || '';
const TICKETPROXY_SCOPES = process.env.NEXT_PUBLIC_DATABALK_ROBOT_SCOPE || '';

const exchangeCodeForToken = async (
  code: string,
  codeVerifier: string,
  redirectUri: string,
  discovery: { authorizationEndpoint: string, tokenEndpoint: string },
  clientId: string,
  scope: string
): Promise<AuthResult> => {
  const params = new URLSearchParams({
    client_id: clientId,
    scope,
    code,
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
    refreshToken: json.refresh_token || '',
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

// Refresh tokens when they expire
const refreshAccessToken = async (
  refreshToken: string,
  scope: string,
  discovery: { authorizationEndpoint: string, tokenEndpoint: string },
  clientId: string,
): Promise<AuthResult> => {
  const redirectUri = AuthSession.makeRedirectUri();
  const params = new URLSearchParams({
    client_id: clientId,
    scope,
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
    refreshToken: json.refresh_token || '',
    expiresIn: json.expires_in,
  };
};

// Unified authentication function for all APIs
export const authenticateAllAPIs = async (): Promise<void> => {
  const redirectUri = AuthSession.makeRedirectUri();

  // Microsoft Graph authentication
  const graphRequest = new AuthSession.AuthRequest({
    clientId: MICROSOFT_GRAPH_CLIENT_ID,
    scopes: GRAPH_SCOPES.split(' '),
    redirectUri,
    usePKCE: true,
  });

  const graphResult = await graphRequest.promptAsync(microsoftGraphDiscovery);
  if (graphResult.type !== 'success' || !graphResult.params || !graphResult.params.code) {
    throw new Error(`Microsoft Graph authentication failed: ${graphResult.type}`);
  }

  const graphTokens = await exchangeCodeForToken(
    graphResult.params.code,
    graphRequest.codeVerifier as string,
    redirectUri,
    microsoftGraphDiscovery,
    MICROSOFT_GRAPH_CLIENT_ID,
    GRAPH_SCOPES
  );

  await storeToken('msGraphAccessToken', graphTokens.accessToken);
  await storeToken('msGraphRefreshToken', graphTokens.refreshToken);
  await storeToken('msGraphTokenExpiration', (Date.now() + graphTokens.expiresIn * 1000).toString());

  const dataBalkRequest = new AuthSession.AuthRequest({
    clientId: MICROSOFT_GRAPH_CLIENT_ID,
    scopes: DATABALK_SCOPES.split(' '),
    redirectUri,
    usePKCE: true,
  });

  const dataBalkResult = await dataBalkRequest.promptAsync(dataBalkDiscovery);
  if (dataBalkResult.type !== 'success' || !dataBalkResult.params || !dataBalkResult.params.code) {
    throw new Error(`DataBalkRobot authentication failed: ${dataBalkResult.type}`);
  }

  const dataBalkTokens = await exchangeCodeForToken(
    dataBalkResult.params.code,
    dataBalkRequest.codeVerifier as string,
    redirectUri,
    dataBalkDiscovery,
    MICROSOFT_GRAPH_CLIENT_ID,
    DATABALK_SCOPES
  );

  await storeToken('dataBalkAccessToken', dataBalkTokens.accessToken);
  await storeToken('dataBalkRefreshToken', dataBalkTokens.refreshToken);
  await storeToken('dataBalkTokenExpiration', (Date.now() + dataBalkTokens.expiresIn * 1000).toString());

  const ticketProxyRequest = new AuthSession.AuthRequest({
    clientId: TICKET_PROXY_CLIENT_ID, 
    scopes: TICKETPROXY_SCOPES.split(' '),
    redirectUri,
    usePKCE: true,
  });

  const ticketProxyResult = await ticketProxyRequest.promptAsync(ticketProxyDiscovery);
  if (ticketProxyResult.type !== 'success' || !ticketProxyResult.params || !ticketProxyResult.params.code) {
    throw new Error(`TicketProxy authentication failed: ${ticketProxyResult.type}`);
  }

  const ticketProxyTokens = await exchangeCodeForToken(
    ticketProxyResult.params.code,
    ticketProxyRequest.codeVerifier as string,
    redirectUri,
    ticketProxyDiscovery,
    TICKET_PROXY_CLIENT_ID,
    TICKETPROXY_SCOPES
  );

  await storeToken('ticketProxyAccessToken', ticketProxyTokens.accessToken);
  await storeToken('ticketProxyRefreshToken', ticketProxyTokens.refreshToken);
  await storeToken('ticketProxyTokenExpiration', (Date.now() + ticketProxyTokens.expiresIn * 1000).toString());
};

// Get token for a specific service
export const getToken = async (keyPrefix: string, scope: string, discovery: { authorizationEndpoint: string, tokenEndpoint: string }): Promise<string> => {
  const accessToken = await getTokenFromStorage(`${keyPrefix}AccessToken`);
  const expiration = await getTokenFromStorage(`${keyPrefix}TokenExpiration`);

  if (accessToken && expiration && parseInt(expiration) > Date.now()) {
    return accessToken;
  }

  const refreshToken = await getTokenFromStorage(`${keyPrefix}RefreshToken`);
  if (!refreshToken) throw new Error('No valid token available');

  // Determine the client ID to use based on the keyPrefix
  const clientId = keyPrefix === 'ticketProxy' ? TICKET_PROXY_CLIENT_ID : MICROSOFT_GRAPH_CLIENT_ID;

  const newTokens = await refreshAccessToken(refreshToken, scope, discovery, clientId);
  await storeToken(`${keyPrefix}AccessToken`, newTokens.accessToken);
  await storeToken(`${keyPrefix}RefreshToken`, newTokens.refreshToken);
  await storeToken(`${keyPrefix}TokenExpiration`, (Date.now() + newTokens.expiresIn * 1000).toString());

  return newTokens.accessToken;
};

// Fetch user details from Microsoft Graph
export const fetchUserDetailsFromMicrosoftGraph = async (accessToken: string): Promise<UserDetails> => {
  const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch user details: ${json.error.message || json.error}`);
  }

  // Fetch the user's profile photo
  const photoResponse = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!photoResponse.ok) {
    console.error('Failed to fetch profile photo:', photoResponse.statusText);
    return {
      name: json.displayName,
      email: json.mail || json.userPrincipalName,
      role: json.jobTitle || '',
      photoUrl: '',
    };
  }

  // Convert the photo blob to a Base64-encoded string
  const photoBlob = await photoResponse.blob();
  const reader = new FileReader();

  const photoUrl = await new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject('Failed to convert blob to base64');
    };
    reader.readAsDataURL(photoBlob);
  });

  return {
    name: json.displayName,
    email: json.mail || json.userPrincipalName,
    role: json.jobTitle || '',
    photoUrl, 
  };
};

// User details interface
interface UserDetails {
  photoUrl: string;
  name: string;
  email: string;
  role: string;
}
