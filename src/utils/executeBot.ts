import areSame from "./areSame";
import getData from "./getData";
import Twit from "twit";
import {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
} from "./config";

const executeBot = async () => {
  type ElementData = {
    city: string;
    newTimes: {
      time1: string;
      time2: string;
      time3: string;
    };
  };
  const config = {
    consumer_key,
    consumer_secret,
    access_token,
    access_token_secret,
  };
  const T = new Twit(config);
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
  let newFreeTimes: any[] = [];

  let initialData = await getData(
    "https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml"
  );
  let newData = await getData(
    "https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml"
  );
  T.post("statuses/update", { status: "testing" });
  // console.log(
  //   await getData("https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml")
  // );

  const _areSame = areSame(initialData, newData);
  if (_areSame === "no changes") {
    console.log("no changes");
    return;
  } else {
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

    newFreeTimes.forEach((newTime: ElementData) => {
      let time1 = "",
        time2 = "",
        time3 = "";
      if (newTime.newTimes.time1) time1 = newTime.newTimes.time1;
      if (newTime.newTimes.time2) time2 = newTime.newTimes.time2;
      if (newTime.newTimes.time3) time3 = newTime.newTimes.time3;

      let n = "\n   ";
      let times = n.concat(time1, n, time2, n, time3).trim();
      let message = `\n\n${newTime.city}:\n   ${times}`;
      bigMessage += message;
    });
    bigMessage +=
      "\n\nhttps://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml";

    T.post("statuses/update", { status: bigMessage });
    console.log(bigMessage);

    newFreeTimes = [];
  }
};

export default executeBot;

// let initialData = [
//   {
//     city: "Haapsalu",
//     updatedAt: "08.11.2020 17:53",
//     newTimes: {
//       time1: "26.01.2021 09:00",
//       time2: "26.01.2021 10:00",
//       time3: "26.01.2021 11:00",
//     },
//   },
//   {
//     city: "Jõhvi",
//     updatedAt: "08.11.2020 17:53",
//     newTimes: {
//       time1: "11.02.2021 09:00",
//       time2: "11.02.2021 13:15",
//       time3: "11.02.2021 14:30",
//     },
//   },
//   {
//     city: "Kuressaare",
//     updatedAt: "08.11.2020 17:53",
//     newTimes: {
//       time1: "26.01.2021 13:15",
//       time2: "26.01.2021 14:30",
//       time3: "26.01.2021 15:45",
//     },
//   },
// ];
// let newData = [
//   {
//     city: "Haapsalu",
//     updatedAt: "08.11.2020 17:53",
//     newTimes: {
//       time1: "03.01.2021 09:00",
//       time2: "02.01.2021 10:00",
//       time3: "02.01.2021 11:00",
//     },
//   },
//   {
//     city: "Jõhvi",
//     updatedAt: "08.11.2020 17:53",
//     newTimes: {
//       time1: "14.02.2021 09:00",
//       time2: "12.02.2021 13:15",
//       time3: "15.02.2021 14:30",
//     },
//   },
//   {
//     city: "Kuressaare",
//     updatedAt: "08.11.2020 17:53",
//     newTimes: {
//       time1: "30.02.2021 13:15",
//       time2: "12.03.2021 14:30",
//       time3: "11.04.2021 15:45",
//     },
//   },
// ];
