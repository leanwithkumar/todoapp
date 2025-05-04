import jwt from 'jsonwebtoken';
import User from '../Models/users.models.js';

const generatetoken = async (userid, res) => {
  const token = jwt.sign({ userid }, process.env.SECRET_KEY, {
    expiresIn: '10d',
  });

  
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,        
    sameSite: 'lax',
    path: '/',
  });

  await User.findByIdAndUpdate(userid, { token });

  return token;
};

export default generatetoken;
