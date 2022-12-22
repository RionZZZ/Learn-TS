import superagent from "superagent";
import fs from "fs";
import path from "path";
import Analyzer1 from "./analyzer1";
import Analyzer2 from "./analyzer2";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crawler {
  private filePath = path.resolve(__dirname, "../../data/course.json");

  private async getRowHtml() {
    const res = await superagent.get(this.url);
    return res.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRowHtml();
    const fileContent = this.analyzer.analyze(this.filePath, html);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    console.log("crawler constructor");
    this.initSpiderProcess();
  }
}

const secret = "secretKey";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = Analyzer1.getInstance();
// const analyzer = new Analyzer2();
// new Crawler(url, analyzer);

export default Crawler;


console.log(123);
