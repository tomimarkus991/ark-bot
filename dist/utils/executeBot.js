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
    let newFreeTimes = [];
    let initialData = yield getData_1.default("https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml");
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        let newData = yield getData_1.default("https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml");
        const _areSame = areSame_1.default(initialData.data, newData.data);
        if (_areSame === "no changes") {
            initialData.data = newData.data;
            console.log("No changes 1");
            return;
        }
        else {
            for (let i = 0; i <= Object.keys(_areSame).length - 1; i++) {
                if (Object.keys(_areSame[i].newTimes).length > 0) {
                    newFreeTimes.push({
                        city: newData.cities[i],
                        newTimes: _areSame[i].newTimes,
                    });
                }
            }
            let tweet = "";
            initialData.data = newData.data;
            newFreeTimes.forEach((newTime) => {
                tweet += `${newTime.city} `;
            });
            let updatedAt = newData.data[0].updatedAt.replace(/(?:(?:.20|.21)[0-9]{2})/g, "");
            let updatedAtTime = updatedAt.slice(6, 11);
            let updatedAtDate = updatedAt.slice(0, 5);
            tweet += `\n\nUpdated at ${updatedAtTime} ${updatedAtDate}`;
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
                tweet += message;
            });
            tweet += `\n\nhttps://eteenindus.mnt.ee/main.jsf`;
            if (newFreeTimes.length >= 1) {
                T.post("statuses/update", { status: tweet }, (err) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        if (err.message.includes("Tweet needs to be a bit shorter")) {
                            let firstTweet = tweet.slice(0, 257);
                            let secondTweet = tweet.slice(257, 500);
                            let thirdTweet = tweet.slice(500, 750);
                            let fourthTweet = tweet.slice(750, tweet.length);
                            if (fourthTweet) {
                                T.post("statuses/update", { status: fourthTweet });
                            }
                            if (thirdTweet) {
                                setTimeout(() => {
                                    T.post("statuses/update", { status: thirdTweet });
                                }, 1500);
                            }
                            if (secondTweet) {
                                setTimeout(() => {
                                    T.post("statuses/update", { status: secondTweet });
                                }, 3000);
                            }
                            if (firstTweet) {
                                setTimeout(() => {
                                    T.post("statuses/update", { status: firstTweet });
                                }, 4500);
                            }
                        }
                    }
                    else {
                        console.log("Tweeted");
                    }
                });
            }
            else {
                console.log("No changes 2");
            }
            newFreeTimes = [];
        }
    }), 1000 * 60 * 2);
});
exports.default = executeBot;
//# sourceMappingURL=executeBot.js.map