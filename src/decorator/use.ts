import { RequestHandler } from "express";
import { LoginController, CrawlerController } from "../controller";

export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrawlerController, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
