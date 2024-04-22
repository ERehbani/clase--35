// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const cluster = require("cluster");
const express = require("express");
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const { cpus } = require("os");
const numeroDeProcesadores = cpus().length;
const app = express();

if (cluster.isPrimary) {
  console.log("este es un proceso primario");
  for (let i = 0; i < numeroDeProcesadores; i++) {
    cluster.fork();
  }
} else {
  console.log(`este es un proceso secundario ${process.pid}`);
}

app.get("/operacionsimple", (req, res) => {
  let suma = 0;

  for (let i = 0; i < 1000000; i++) {
    suma += i;
  }

  res.send({ suma });
});

app.get("/operacioncompleja", (req, res) => {
  let suma = 0;

  for (let i = 0; i < 5e8; i++) {
    suma += i;
  }

  res.send({ suma });
});

app.listen(3000, () => {
  console.log(3000);
});
