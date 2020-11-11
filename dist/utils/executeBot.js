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
const areSame_1 = __importDefault(require("./areSame"));
const getData_1 = __importDefault(require("./getData"));
const twit_1 = __importDefault(require("twit"));
const executeBot = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    };
    const T = new twit_1.default(config);
    const cities = [
        "Haapsalu",
        "Jõhvi",
        "Kuressaare",
        "Narva",
        "Paide",
        "Pärnu",
        "Rakvere",
        "Tallinn",
        "Tartu",
        "Viljandi",
        "Võru",
    ];
    let newFreeTimes = [];
    let initialData = yield getData_1.default("https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml");
    let newData = yield getData_1.default("https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml");
    const _areSame = areSame_1.default(initialData, newData);
    if (_areSame === "no changes") {
        console.log("no changes");
        return;
    }
    else {
        for (let i = 0; i <= Object.keys(_areSame).length - 1; i++) {
            if (Object.keys(_areSame[i].newTimes).length > 0) {
                newFreeTimes.push({
                    city: cities[i],
                    newTimes: _areSame[i].newTimes,
                });
            }
        }
        initialData = newData;
        let bigMessage = `Updated at ${newData[0].updatedAt}`;
        newFreeTimes.forEach((newTime) => {
            let time1 = "", time2 = "", time3 = "";
            if (newTime.newTimes.time1)
                time1 = newTime.newTimes.time1;
            if (newTime.newTimes.time2)
                time2 = newTime.newTimes.time2;
            if (newTime.newTimes.time3)
                time3 = newTime.newTimes.time3;
            let n = "\n   ";
            let times = n.concat(time1, n, time2, n, time3).trim();
            let message = `\n\n${newTime.city}:\n   ${times}`;
            bigMessage += message;
        });
        bigMessage +=
            "\n\nhttps://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml";
        console.log(bigMessage);
        newFreeTimes = [];
    }
});
exports.default = executeBot;
//# sourceMappingURL=executeBot.js.map