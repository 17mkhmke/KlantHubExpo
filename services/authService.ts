// import { authorize } from 'react-native-app-auth';

// const config = {   
//     issuer: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843',   
//     clientId: 'adb142b4-830f-4842-8ddf-478f5d3af9db',   
//     redirectUrl: 'msauth.klantHub://auth',   
//     scopes: ['openid', 'profile', 'email'],   
//     serviceConfiguration: {     
//         authorizationEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/authorize',     
//         tokenEndpoint: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843/oauth2/v2.0/token',   }, 
//     };  

//     export const authenticate = async () => {
//         try {
//           const result = await authorize(config);
//           console.log('Authorization Result:', result);
//           return result;
//         } catch (error) {
//           console.error('Authorization Error:', error);
//           throw error;
//         }
//       };
