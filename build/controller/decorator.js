"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.del = exports.put = exports.post = exports.get = exports.controller = void 0;
const router_1 = __importDefault(require("../router"));
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["put"] = "put";
    Methods["delete"] = "delete";
})(Methods || (Methods = {}));
function controller(target) {
    const prototypes = Object.getOwnPropertyNames(target.prototype);
    for (let key of prototypes) {
        const path = Reflect.getMetadata("path", target.prototype, key);
        const method = Reflect.getMetadata("method", target.prototype, key);
        const handler = target.prototype[key];
        const middleware = Reflect.getMetadata("middleware", target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                router_1.default[method](path, middleware, handler);
            }
            else {
                router_1.default[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
function getRequestDecorator(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", method, target, key);
        };
    };
}
// export function get(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }
// export function post(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
exports.put = getRequestDecorator(Methods.put);
exports.del = getRequestDecorator(Methods.delete);
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
exports.use = use;
