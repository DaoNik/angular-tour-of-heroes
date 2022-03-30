const heroes = require("../jsons/heroes.json");
const books = require("../jsons/books.json");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthorizationError = require("../errors/AuthorizationError");
const ValidationError = require("../errors/ValidationError");

const { JWT_SECRET = "secret" } = process.env;

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
        return res.status(200).send({ token });
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

const getHeroes = (req, res, next) => {
  res.send(heroes);
};

const getBooks = (req, res, next) => {
  res.send(books);
};

module.exports = {
  login,
  register,
  getHeroes,
  getBooks,
};
