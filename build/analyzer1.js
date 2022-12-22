"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class Analyzer1 {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Analyzer1();
        }
        return this.instance;
    }
    getCourseInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courseItems = $(".course-item");
        const courseInfos = [];
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
    generateJson(path, json) {
        let fileContent = {};
        if (fs_1.default.existsSync(path)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(path, "utf-8"));
        }
        fileContent[json.time] = json.data;
        return fileContent;
    }
    analyze(filePath, html) {
        const courseResult = this.getCourseInfo(html);
        const fileContent = this.generateJson(filePath, courseResult);
        return JSON.stringify(fileContent);
    }
}
exports.default = Analyzer1;
