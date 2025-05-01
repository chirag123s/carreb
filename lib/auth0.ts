import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Initialize the Auth0 client 
export const auth0 = new Auth0Client({
  domain: 'dev-w44f8loqfmt8l6ga.us.auth0.com',
  clientId: '0eotoOen82ceMQJtprftOy94QUO2R8pE',
  clientSecret: 'E3TWzLY0wEcNhVlkMWVcwXeLOLD75hPNUdXLt1Vnl6NLh_7jC514fFnwWbAfth26',
  appBaseUrl: 'http://localhost:3000',
  secret: '6f7720ecb9a834a9a30fde64aab6e0168b39595662b617180f02be847bc17849',
//   authorizationParameters: {
//     // In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables are no longer automatically picked up by the SDK.
//     // Instead, we need to provide the values explicitly.
//     scope: process.env.AUTH0_SCOPE,
//     audience: process.env.AUTH0_AUDIENCE,
//   }
});