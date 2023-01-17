import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { getResponseData } from "../utils/util";
import { controller, use, get } from "../decorator";
import Crawler from "../utils/crawler";
import Analyzer1 from "../utils/analyzer1";
import fs from "fs";
import path from "path";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

interface DataStructure {
  [key: string]: CourseItem[];
}

interface CourseItem {
  title: string;
  count: number;
}

const checkLogin = (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
): void => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    // res.send("401 error!");
    res.json(getResponseData(null, "401 error!"));
  }
};

@controller("/api")
export class CrawlerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response): void {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = Analyzer1.getInstance();
    new Crawler(url, analyzer);

    res.json(getResponseData<boolean>(true));
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: RequestWithBody, res: Response): void {
    try {
      const result = fs.readFileSync(
        path.resolve(__dirname, "../../data/course.json"),
        "utf8"
      );
      res.json(getResponseData<DataStructure>(JSON.parse(result)));
      // res.json(JSON.parse(result));
    } catch (e) {
      res.json(getResponseData<boolean>(false, "show error!"));
      // res.send("show error!");
    }
  }
}
