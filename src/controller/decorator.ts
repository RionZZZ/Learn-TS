import { RequestHandler } from "express";
import router from "../router";

enum Methods {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete"
}

export function controller(target: any) {
  const prototypes = Object.getOwnPropertyNames(target.prototype);
  for (let key of prototypes) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: Methods = Reflect.getMetadata("method", target.prototype, key);
    const handler = target.prototype[key];
    const middleware = Reflect.getMetadata("middleware", target.prototype, key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}

function getRequestDecorator(method: Methods) {
  return function (path: string) {
    return function (target: any, key: string) {
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
export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
export const put = getRequestDecorator(Methods.put);
export const del = getRequestDecorator(Methods.delete);

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
