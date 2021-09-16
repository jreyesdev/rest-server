const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = '') => {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { email, name, picture: image } = ticket.getPayload();
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  /*{
    // These six fields are included in all Google ID Tokens.
    "iss": "https://accounts.google.com",
    "sub": "110169484474386276334",
    "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
    "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
    "iat": "1433978353",
    "exp": "1433981953",
   
    // These seven fields are only included when the user has granted the "profile" and
    // "email" OAuth scopes to the application.
    "email": "testuser@gmail.com",
    "email_verified": "true",
    "name" : "Test User",
    "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
    "given_name": "Test",
    "family_name": "User",
    "locale": "en"
   }*/
  return { name, email, image }
}

module.exports = { googleVerify }