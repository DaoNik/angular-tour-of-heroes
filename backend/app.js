const bodyParser = require("body-parser");
const express = require("express");
const heroes = require("./jsons/heroes.json");
const books = require("./jsons/books.json");
const auth = require("./middleware/auth");

const PORT = 4500;

const app = express();

app.use(bodyParser.json());

const allowedCors = ["http://localhost:4200"];

app.use((req, res, next) => {
  const { origin } = req.headers;
  // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { method } = req;
  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers["access-control-request-headers"];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/users/authenticate", (req, res, next) => {
  const { username, password } = req.body;
  const user = { username: "HelloWb", password: "admin" };
  console.log(username, password);
  if (username === user.username && password === user.password) {
    res.send(user);
  } else {
    next(new Error("Неверные данные"));
  }
});

app.use(auth);

app.get("/heroes", (req, res) => {
  res.send(heroes);
});

app.get("/books", (req, res) => {
  res.send(books);
});

app.listen(PORT, () => {
  console.log(`App has been started port ${PORT}`);
});
