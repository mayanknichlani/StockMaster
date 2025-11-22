const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(error);
  }
};
