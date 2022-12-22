import express, { Request, Response, NextFunction } from "express";
// import router from "./router";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import "./controller/LoginController";
import "./controller/CrawlerController";
// import { router } from "./controller/decorator";
import router from './router';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  req.myName = "Rion";
  next();
});
app.use(
  cookieSession({
    name: "session",
    keys: ["rion ts"],
    maxAge: 24 * 3600 * 1000
  })
);

app.use(router);

app.listen(7001, () => {
  console.log("running¬¬ ");
});
