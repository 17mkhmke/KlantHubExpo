// src/services/authService.ts

import * as AuthSession from 'expo-auth-session';
import config from './msalConfig';

const discovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
};

export const authenticate = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: config.redirectUri,
    });

    const authRequest = new AuthSession.AuthRequest({
      clientId: config.clientId,
      redirectUri,
      scopes: config.scopes,
    });

    await authRequest.makeAuthUrlAsync(discovery);
    const result = await authRequest.promptAsync(discovery);

    if (result.type === 'success') {
      const tokenResponse = await fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${config.clientId}&redirect_uri=${redirectUri}&grant_type=authorization_code&code=${result.params.code}&scope=${config.scopes.join(
          ' '
        )}`,
      });

      const token = await tokenResponse.json();
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};
