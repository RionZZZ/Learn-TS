"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const crawler_1 = __importDefault(require("./utils/crawler"));
const analyzer1_1 = __importDefault(require("./utils/analyzer1"));
const util_1 = require("./utils/util");
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        // res.send("401 error!");
        res.json((0, util_1.getResponseData)(null, "401 error!"));
    }
};
const router = (0, express_1.Router)();
router.get("/", () => { });
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
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json((0, util_1.getResponseData)(true));
    res.redirect("/");
});
router.post("/login", (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json((0, util_1.getResponseData)(null, "already login!"));
        // res.send("already login!");
    }
    else {
        if (password === "1" && req.session) {
            req.session.login = true;
            res.json((0, util_1.getResponseData)(true));
            // res.send("login success!");
        }
        else {
            res.json((0, util_1.getResponseData)(null, "login error!"));
            // res.send("login error!");
        }
    }
});
router.get("/getData", checkLogin, (req, res) => {
    // const isLogin = req.session ? req.session.login : false;
    // if (isLogin) {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = analyzer1_1.default.getInstance();
    new crawler_1.default(url, analyzer);
    res.json((0, util_1.getResponseData)(true));
    // res.send("get data success!");
    // } else {
    // res.send("401 error!");
    // }
});
router.get("/showData", checkLogin, (req, res) => {
    try {
        const result = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../data/course.json"), "utf8");
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
        // res.json(JSON.parse(result));
    }
    catch (e) {
        res.json((0, util_1.getResponseData)(null, "show error!"));
        // res.send("show error!");
    }
});
exports.default = router;
