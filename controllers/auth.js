const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require('../errors');
const UnauthError = require('../errors')

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: newUser.name, userID: newUser._id }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    throw new BadRequest('must provide an email and password');
  }

  const user = await User.findOne({ email });
  if(!user){
    throw new UnauthError('Invalid Credentials')
  }

  const isPassCorrect = await user.comparePassword(password);
  if(!isPassCorrect){
    throw new UnauthError('Invalid Credentials')
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, userID: user.id }, token });
};

module.exports = { register, login };
