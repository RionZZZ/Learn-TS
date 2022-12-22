"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import router from "./router";
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrawlerController");
// import { router } from "./controller/decorator";
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    req.myName = "Rion";
    next();
});
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["rion ts"],
    maxAge: 24 * 3600 * 1000
}));
app.use(router_1.default);
app.listen(7001, () => {
    console.log("running¬¬ ");
});
