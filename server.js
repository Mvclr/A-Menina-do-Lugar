// to colocando uns comentários aí que acho que vou terminar esse sistema depois de entregar, mas dei também uma explicada do que eu usei que não foi passado em aula
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const router = require("./routes");
const app = express();

app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
