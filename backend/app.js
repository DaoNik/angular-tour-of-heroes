require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { errors } = require("celebrate");
const routes = require("./routes");
const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT = 4500 } = process.env;

const app = express();

app.use(bodyParser.json());

const allowedCors = ["http://localhost:4200"];

app.use(requestLogger);

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

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.listen(PORT, () => {
  console.log(`App has been started port ${PORT}`);
});
