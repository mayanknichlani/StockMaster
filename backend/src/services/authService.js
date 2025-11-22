const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

exports.signup = async ({ name, email, password, role }) => {
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password, // raw password (model will hash it)
    role
  });

  return user;
};

exports.login = async ({ email, password }) => {

  // FIX: must explicitly select password!
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error("Invalid email or password");
  }
  console.log("FOUND USER:", user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.generateToken(user._id, user.role);
  return token;
};
