const heroes = require("../jsons/heroes.json");
const books = require("../jsons/books.json");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthorizationError = require("../errors/AuthorizationError");
const ValidationError = require("../errors/ValidationError");

const { JWT_SECRET = "secret" } = process.env;
const { SUPER_RANDOM } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new AuthorizationError("Неправильная почта");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError("Неправильный пароль");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "2h",
        });

        const refreshToken = jwt.sign(
          { _key: `${SUPER_RANDOM}${token.slice(-6)}` },
          JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );

        User.findByIdAndUpdate(user._id, { refreshToken }, { new: true })
          .then((user) => {
            console.log(user);
          })
          .catch(next);

        const date = Math.floor(Date.now() / 1000) + 60 * 60 * 2;

        return res.status(200).send({ token, refreshToken, date });
      });
    })
    .catch(next);
};

const register = (req, res, next) => {
  const { email, password, ...body } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    console.log(email, password, body, hash);
    return User.create({
      email,
      password: hash,
      ...body,
    })
      .then((user) => {
        console.log(user);
        const newUser = user.toObject();
        delete newUser.password;
        res.send(newUser);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          next(new ValidationError("Неверно введены данные для пользователя"));
        } else if (err.name === "MongoServerError" && err.code === 11000) {
          const error = new Error("Данный пользователь уже зарегистрирован");
          error.statusCode = 409;

          next(error);
        }

        next(err);
      });
  });
};

const updateToken = (req, res, next) => {
  const { refreshToken } = req.body;

  return User.findOne({ refreshToken })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new AuthorizationError("Неправильный токен");
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "2m",
      });

      const date = Math.floor(Date.now() / 1000) + 60 * 60 * 2;

      return res.status(200).send({ token, date });
    })
    .catch(next);
};

const getHeroes = (req, res, next) => {
  res.send(heroes);
};

const getBooks = (req, res, next) => {
  res.send(books);
};

module.exports = {
  login,
  register,
  updateToken,
  getHeroes,
  getBooks,
};
