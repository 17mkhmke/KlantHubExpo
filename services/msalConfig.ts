
const config = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  scopes: ['openid', 'profile', 'User.Read'],
  authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_TENANT_ID}`,
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID
};

export default config;
