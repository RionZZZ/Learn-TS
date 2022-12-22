import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crawler";

export default class Analyzer2 implements Analyzer {
  public analyze(filePath: string, html: string) {
    return html;
  }
}
