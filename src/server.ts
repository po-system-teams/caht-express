import express from "express";
import consturctSocket from "./socket/index";
import consturctMySql from "./model/mysql";

const middleware  = require('./middleware');
const { serverconfig } = require("./config");

const app = express();

const { CORS_ALLOW_ORIGIN } = process.env;
export const sequelize = consturctMySql();

const messageRouter = require("./router/message");
const loginRouter = require("./router/login");

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (!req.path.includes(".")) {
    res.set({
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin":
        CORS_ALLOW_ORIGIN || req.headers.origin || "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Content-Type": "application/json; charset=utf-8",
    });
  }
  req.method === "OPTIONS" ? res.status(204).end() : next();
});
app.use(middleware);

app.use("/message", messageRouter);
app.use("/", loginRouter);
const server = app.listen(serverconfig.port, serverconfig.host, () => {
  console.log(`Server is running at http://${serverconfig.host}:${serverconfig.port}`);
});
consturctSocket(server);

