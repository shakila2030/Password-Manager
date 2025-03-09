const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    // Remove the "Bearer " prefix from the token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;  // Add the decoded user information to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token. Access denied.' });
  }
};

module.exports = authenticate;
