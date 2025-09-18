const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.redirect('/auth/login');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.redirect('/auth/login');

  req.session.user = user;
  res.redirect('/');
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { username, password, email, phone } = req.body;
  const hashedPw = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPw, email, phone });
  await user.save();
  res.redirect('/auth/login');
};

exports.getForgot = (req, res) => {
  res.render('forgot');
};

exports.postForgot = async (req, res) => {
  // Giả lập: chỉ in ra email, không gửi thực
  console.log("Reset link gửi tới: ", req.body.email);
  res.redirect('/auth/login');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
