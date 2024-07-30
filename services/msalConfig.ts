//msalConfig.ts
const config = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  scopes: ['openid', 'profile', 'User.Read'],
  authority: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843}',
  tenantId: 'a4a6e0c1-b531-4689-a0a0-1ad2250ba843'
};

export default config;
