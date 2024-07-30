// src/core/utils/providers.ts

import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import config from '../../../services/msalConfig';
import * as Linking from 'expo-linking';

const redirectUri = Linking.createURL('/oauth2redirect');

// const redirectUri = AuthSession.makeRedirectUri({
// //   useProxy,
//   native: MSALConfig.redirectUri,
// });

export const azureAdConfig = {
  clientId: config.clientId,
  redirectUri,
  scopes: config.scopes,
  extraParams: {
    access_type: 'offline',
  },
  prompt: AuthSession.Prompt.SelectAccount,
  responseType: AuthSession.ResponseType.Code,
  usePKCE: true,
};

export const discovery = {
  authorizationEndpoint: `${config.authority}/oauth2/v2.0/authorize`,
  tokenEndpoint: `${config.authority}/oauth2/v2.0/token`,
};