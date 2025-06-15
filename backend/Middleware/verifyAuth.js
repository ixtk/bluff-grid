const admin = require('firebase-admin');

const serviceAccount = require('../firebase-adminsdk.json'); 

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  if (!admin.apps.length) {
  }
}

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token was not provided or is malformed.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Authorization token has expired. Please sign in again.' });
    }
    return res.status(403).json({ message: 'Invalid token.', error: error.message });
  }
};

module.exports = verifyAuth;