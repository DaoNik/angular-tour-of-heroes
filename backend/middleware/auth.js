module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const user = { username: "HelloWb", password: "admin" };
  if (
    !authorization &&
    !authorization.includes(user.username) &&
    !authorization.includes(user.password)
  ) {
    const error = new Error("Необходима авторизация");
    error.statusCode = 401;
    next(error);
  }

  next();
};
