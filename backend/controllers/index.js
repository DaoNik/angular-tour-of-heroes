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
        throw new AuthorizationError("Invalid email");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError("Invalid password");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "1m",
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

        return res.status(200).send({ token, refreshToken });
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
          next(new ValidationError("Invalid data for user"));
        } else if (err.name === "MongoServerError" && err.code === 11000) {
          const error = new Error("Current user is already registered");
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
      if (!user || !refreshToken) {
        throw new AuthorizationError("Invalid token");
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "1m",
      });

      return res.status(200).send({ token });
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
