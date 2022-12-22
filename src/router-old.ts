import fs from "fs";
import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import Crawler from "./utils/crawler";
import Analyzer1 from "./utils/analyzer1";
import { getResponseData } from "./utils/util";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const checkLogin = (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    // res.send("401 error!");
    res.json(getResponseData(null, "401 error!"));
  }
};

const router = Router();
router.get("/", () => {});

// router.post("/getData", (req: RequestWithBody, res: Response) => {
//   const { password } = req.body;
//   if (password === "1") {
//     const secret = "secretKey";
//     const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

//     const analyzer = Analyzer1.getInstance();
//     new Crawler(url, analyzer);

//     res.send("get data success!");
//   } else {
//     res.send(`${req.myName}, password error!`);
//   }
// });

router.get("/logout", (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true));
  res.redirect("/");
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(null, "already login!"));
    // res.send("already login!");
  } else {
    if (password === "1" && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
      // res.send("login success!");
    } else {
      res.json(getResponseData(null, "login error!"));
      // res.send("login error!");
    }
  }
});

router.get("/getData", checkLogin, (req: RequestWithBody, res: Response) => {
  // const isLogin = req.session ? req.session.login : false;
  // if (isLogin) {
  const secret = "secretKey";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

  const analyzer = Analyzer1.getInstance();
  new Crawler(url, analyzer);

  res.json(getResponseData(true));
  // res.send("get data success!");
  // } else {
  // res.send("401 error!");
  // }
});

router.get("/showData", checkLogin, (req: RequestWithBody, res: Response) => {
  try {
    const result = fs.readFileSync(
      path.resolve(__dirname, "../data/course.json"),
      "utf8"
    );
    res.json(getResponseData(JSON.parse(result)));
    // res.json(JSON.parse(result));
  } catch (e) {
    res.json(getResponseData(null, "show error!"));
    // res.send("show error!");
  }
});

export default router;
