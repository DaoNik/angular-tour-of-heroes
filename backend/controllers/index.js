const heroes = require("../jsons/heroes.json");
const books = require("../jsons/books.json");

const login = (req, res, next) => {
  const { username, password } = req.body;
};

const getHeroes = (req, res, next) => {
  res.send(heroes);
};

const getBooks = (req, res, next) => {
  res.send(books);
};

module.exports = {
  login,
  getHeroes,
  getBooks,
};
