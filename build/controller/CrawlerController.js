"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
require("reflect-metadata");
const util_1 = require("../utils/util");
const decorator_1 = require("../decorator");
const crawler_1 = __importDefault(require("../utils/crawler"));
const analyzer1_1 = __importDefault(require("../utils/analyzer1"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
let CrawlerController = class CrawlerController {
    getData(req, res) {
        const secret = "secretKey";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyzer = analyzer1_1.default.getInstance();
        new crawler_1.default(url, analyzer);
        res.json((0, util_1.getResponseData)(true));
    }
    showData(req, res) {
        try {
            const result = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../data/course.json"), "utf8");
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
            // res.json(JSON.parse(result));
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(null, "show error!"));
            // res.send("show error!");
        }
    }
};
__decorate([
    (0, decorator_1.get)("/getData"),
    (0, decorator_1.use)(checkLogin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrawlerController.prototype, "getData", null);
__decorate([
    (0, decorator_1.get)("/showData"),
    (0, decorator_1.use)(checkLogin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrawlerController.prototype, "showData", null);
CrawlerController = __decorate([
    (0, decorator_1.controller)("/api")
], CrawlerController);
exports.CrawlerController = CrawlerController;
