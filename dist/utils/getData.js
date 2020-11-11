"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
const getData = (link) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_promise_1.default.get(link);
    const $ = cheerio_1.default.load(result);
    const updatedAt = $(`div > table > thead > tr > th > span`)
        .text()
        .slice(23, 40);
    let data = [];
    for (let i = 1; i <= 11; i++) {
        const city = $(`tr.ui-widget-content:nth-child(${i}) > td:nth-child(1) > span:nth-child(1)`).text();
        const time1 = $(`tr.ui-widget-content:nth-child(${i}) > td:nth-child(3)`).text();
        const time2 = $(`tr.ui-widget-content:nth-child(${i}) > td:nth-child(4)`).text();
        const time3 = $(`tr.ui-widget-content:nth-child(${i}) > td:nth-child(5)`).text();
        const times = { city, updatedAt, newTimes: { time1, time2, time3 } };
        data.push(times);
    }
    return data;
});
exports.default = getData;
//# sourceMappingURL=getData.js.map