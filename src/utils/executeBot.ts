import areSame from "./areSame";
import getData from "./getData";
import Twit from "twit";

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
    consumer_key: process.env.CONSUMER_KEY as string,
    consumer_secret: process.env.CONSUMER_SECRET as string,
    access_token: process.env.ACCESS_TOKEN as string,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
  };

  const T = new Twit(config);

  const cities = [
    "Haapsalu",
    "Jõhvi",
    "Kuressaare",
    "Kärdla",
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

  setInterval(async () => {
    let newData = await getData(
      "https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml"
    );

    const _areSame = areSame(initialData, newData);
    if (_areSame === "no changes") {
      initialData = newData;
      console.log("No changes 1");
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
      let tweet = "";
      initialData = newData;

      // Shows all the Cities that have new Driving Times Available
      newFreeTimes.forEach((newTime: ElementData) => {
        tweet += `${newTime.city} `;
      });

      // Removes Year from the Updated At Time
      let updatedAt = newData[0].updatedAt.replace(
        /(?:(?:.20|.21)[0-9]{2})/g,
        ""
      );

      // 17:53
      let updatedAtTime = updatedAt.slice(6, 11);

      // 04.11
      let updatedAtDate = updatedAt.slice(0, 5);

      // Adds Updated at to the Tweet
      tweet += `\n\nUpdated at ${updatedAtTime} ${updatedAtDate}`;

      // Adds city and driving test times
      // for every city and adds them to the tweet
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
        tweet += message;
      });

      // Adds a Link to the tweet to get to MNT e-teenindus
      tweet += `\n\nhttps://eteenindus.mnt.ee/main.jsf`;

      // When there are new Times for atleast 1 city, bot will tweet.
      if (newFreeTimes.length >= 1) {
        T.post("statuses/update", { status: tweet }, (err) => {
          if (err) {
            console.log(`Error: ${err.message}`);
            if (err.message.includes("Tweet needs to be a bit shorter")) {
              let firstTweet = tweet.slice(0, 264);
              let secondTweet = tweet.slice(264, 500);
              let thirdTweet = tweet.slice(500, 750);
              let fourthTweet = tweet.slice(750, tweet.length);

              if (fourthTweet) {
                T.post("statuses/update", { status: fourthTweet });
              } else if (thirdTweet) {
                setTimeout(() => {
                  T.post("statuses/update", { status: thirdTweet });
                  console.log("posted secondTweet");
                }, 1500);
              } else if (secondTweet) {
                setTimeout(() => {
                  T.post("statuses/update", { status: secondTweet });
                  console.log("posted secondTweet");
                }, 3000);
              } else if (firstTweet) {
                setTimeout(() => {
                  T.post("statuses/update", { status: firstTweet });
                  console.log("posted firstTweet");
                }, 4500);
              }
            }
          } else {
            console.log("Tweeted");
          }
        });
      } else {
        console.log("No changes 2");
      }
      // Resets new driving test times
      newFreeTimes = [];
    }
  }, 1000 * 60 * 2); // every 8 minutes 1000 * 60 * 8
};

export default executeBot;

// Data for Testing

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
