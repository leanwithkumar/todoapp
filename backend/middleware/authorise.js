import jwt from 'jsonwebtoken';
import User from '../Models/users.models.js';

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;


  if (!token) {
    return res.status(400).json({ errors: "There is no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.userid);

    if (!req.user) {
      return res.status(401).json({ errors: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ errors: "Unauthorized", error });
  }
};
