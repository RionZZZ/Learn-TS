import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crawler";

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface CourseContent {
  [propName: number]: Course[];
}

export default class Analyzer1 implements Analyzer {
  private static instance: Analyzer1;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Analyzer1();
    }
    return this.instance;
  }

  private constructor() {}

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    const courseInfos: Course[] = [];
    courseItems.map((_, element) => {
      const descList = $(element).find(".course-desc");
      const title = descList.eq(0).text();
      const count = +descList.eq(1).text().split("：")[1];
      courseInfos.push({
        title,
        count
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos
    };
  }

  private generateJson(path: string, json: CourseResult) {
    let fileContent: CourseContent = {};
    if (fs.existsSync(path)) {
      fileContent = JSON.parse(fs.readFileSync(path, "utf-8"));
    }
    fileContent[json.time] = json.data;
    return fileContent;
  }

  public analyze(filePath: string, html: string) {
    const courseResult = this.getCourseInfo(html);
    const fileContent = this.generateJson(filePath, courseResult);
    return JSON.stringify(fileContent);
  }
}
