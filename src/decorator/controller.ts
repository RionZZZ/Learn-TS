import { RequestHandler } from "express";
import router from "../router";
import { Methods } from "./request";

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    const prototypes = Object.getOwnPropertyNames(target.prototype);
    for (let key of prototypes) {
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const handler = target.prototype[key];
      const middleware: RequestHandler = Reflect.getMetadata(
        "middleware",
        target.prototype,
        key
      );
      if (path && method) {
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
