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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
require("reflect-metadata");
const util_1 = require("../utils/util");
const decorator_1 = require("../decorator");
let LoginController = class LoginController {
    isLogin(req, res) {
        const isLogin = !!(req.session ? req.session.login : false);
        res.json((0, util_1.getResponseData)(isLogin));
    }
    login(req, res) {
        const { password } = req.body;
        const isLogin = req.session ? req.session.login : false;
        if (isLogin) {
            res.json((0, util_1.getResponseData)(true, "already login!"));
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
    }
    logout(req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json((0, util_1.getResponseData)(true));
        res.redirect("/");
    }
};
__decorate([
    (0, decorator_1.get)("/isLogin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "isLogin", null);
__decorate([
    (0, decorator_1.post)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "login", null);
__decorate([
    (0, decorator_1.get)("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "logout", null);
LoginController = __decorate([
    (0, decorator_1.controller)("/api")
], LoginController);
exports.LoginController = LoginController;
