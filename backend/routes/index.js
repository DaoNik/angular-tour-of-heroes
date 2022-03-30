const router = require("express").Router();
const auth = require("../middleware/auth");
const NotFoundError = require("../errors/NotFoundError");

const {
  login,
  register,
  updateToken,
  getHeroes,
  getBooks,
} = require("../controllers/index");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/login", login);

router.post("/register", register);

router.post("/update", updateToken);

router.use(auth);

router.get("/heroes", getHeroes);

router.get("/books", getBooks);

router.use(/.*/, (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

module.exports = router;
