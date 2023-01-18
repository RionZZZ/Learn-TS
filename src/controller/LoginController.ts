import "reflect-metadata";
import { Request, Response } from "express";
import { getResponseData } from "../utils/util";
import { controller, get, post } from "../decorator";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller("/api")
export class LoginController {
  @get("/isLogin")
  isLogin(req: RequestWithBody, res: Response): void {
    const isLogin = !!(req.session ? req.session.login : false);
    res.json(getResponseData<responseResult.isLogin>(isLogin));
  }

  @post("/login")
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResponseData<responseResult.login>(true, "already login!"));
      // res.send("already login!");
    } else {
      if (password === "1" && req.session) {
        req.session.login = true;
        res.json(getResponseData<responseResult.login>(true));
        // res.send("login success!");
      } else {
        res.json(getResponseData<responseResult.login>(false, "login error!"));
        // res.send("login error!");
      }
    }
  }

  @get("/logout")
  logout(req: RequestWithBody, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<responseResult.logout>(true));
    res.redirect("/");
  }

  // @get("/")
  // home(req: RequestWithBody, res: Response): void {
  //   const isLogin = req.session ? req.session.login : false;
  //   if (isLogin) {
  //     res.send(
  //       `
  //     <html>
  //       <body>
  //         <a href="/getData">Crawler</a>
  //         <a href="/showData">show</a>
  //         <a href="/logout">logout</a>
  //       </body>
  //     </html>
  //     `
  //     );
  //   } else {
  //     res.send(
  //       `
  //     <html>
  //       <body>
  //         <form method="post" action="/login">
  //           <input type="password" name="password" />
  //           <button>登录</button>
  //         </form>
  //       </body>
  //     </html>
  //     `
  //     );
  //   }
  // }
}
