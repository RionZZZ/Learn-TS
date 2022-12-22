"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.Methods = void 0;
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["put"] = "put";
    Methods["delete"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
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
