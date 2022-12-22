"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        const prototypes = Object.getOwnPropertyNames(target.prototype);
        for (let key of prototypes) {
            const path = Reflect.getMetadata("path", target.prototype, key);
            const method = Reflect.getMetadata("method", target.prototype, key);
            const handler = target.prototype[key];
            const middleware = Reflect.getMetadata("middleware", target.prototype, key);
            if (path && method) {
                const fullPath = root === "/" ? path : `${root}${path}`;
                if (middleware) {
                    router_1.default[method](fullPath, middleware, handler);
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
