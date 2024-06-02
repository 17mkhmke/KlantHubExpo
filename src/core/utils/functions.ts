// import { PublicClientApplication } from '@azure/msal-browser';
// import config from '../../../services/msalConfig';

// console.log('MSAL Config:', config); // Debug log to check config values

// const msalConfig = {
//   auth: {
//     clientId: config.clientId,
//     authority: config.authority,
//     redirectUri: config.redirectUri,
//   },
// };

// export const msalInstance = new PublicClientApplication(msalConfig);

// export const getToken = async () => {
//   const loginRequest = {
//     scopes: config.scopes,
//   };

//   try {
//     const response = await msalInstance.acquireTokenSilent(loginRequest);
//     return response.accessToken;
//   } catch (error) {
//     if (error.name === 'InteractionRequiredAuthError') {
//       const response = await msalInstance.loginPopup(loginRequest);
//       return response.accessToken;
//     } else {
//       throw error;
//     }
//   }
// };
