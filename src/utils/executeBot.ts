import AreSame from './areSame';
import GetData from './getData';
import Twit from 'twit';
import { ElementData } from '../types/types';

const ExecuteBot = async () => {
  const config = {
    consumer_key: process.env.CONSUMER_KEY as string,
    consumer_secret: process.env.CONSUMER_SECRET as string,
    access_token: process.env.ACCESS_TOKEN as string,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
  };

  const T = new Twit(config);

  let newFreeTimes: ElementData[] = [];

  let initialData = await GetData(
    'https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml',
  );

  setInterval(async () => {
    let newData = await GetData(
      'https://eteenindus.mnt.ee/public/vabadSoidueksamiajad.xhtml',
    );

    const _AreSame = AreSame(initialData.data, newData.data);
    if (_AreSame === 'no changes') {
      initialData.data = newData.data;
      console.log('No changes 1');
      return;
    } else {
      for (let i = 0; i <= Object.keys(_AreSame).length - 1; i++) {
        if (Object.keys(_AreSame[i].newTimes).length > 0) {
          newFreeTimes.push({
            city: newData.cities[i],
            newTimes: _AreSame[i].newTimes,
          });
        }
      }
      let tweet = '';
      initialData.data = newData.data;

      // Shows all the cities that have new Driving Times Available
      newFreeTimes.forEach(newTime => {
        tweet += `${newTime.city} `;
      });

      // Removes Year from the Updated At Time
      let updatedAt = newData.data[0].updatedAt.replace(
        /(?:(?:.20|.21)[0-9]{2})/g,
        '',
      );

      // 17:53
      let updatedAtTime = updatedAt.slice(6, 11);

      // 04.11
      let updatedAtDate = updatedAt.slice(0, 5);

      // Adds Updated at to the Tweet
      tweet += `\n\nUpdated at ${updatedAtTime} ${updatedAtDate}`;

      // Adds city and driving test times
      // for every city and adds them to the tweet
      newFreeTimes.forEach(newTime => {
        let time1 = '',
          time2 = '',
          time3 = '';
        if (newTime.newTimes.time1) time1 = newTime.newTimes.time1;
        if (newTime.newTimes.time2) time2 = newTime.newTimes.time2;
        if (newTime.newTimes.time3) time3 = newTime.newTimes.time3;

        let n = '\n   ';
        let times = n.concat(time1, n, time2, n, time3).trim();
        let message = `\n\n${newTime.city}:\n   ${times}`;
        tweet += message;
      });

      // Adds a Link to the tweet to get to MNT e-teenindus
      tweet += `\n\nhttps://eteenindus.mnt.ee/main.jsf`;

      // When there are new Times for atleast 1 city, bot will tweet.
      if (newFreeTimes.length >= 1) {
        T.post('statuses/update', { status: tweet }, err => {
          if (err) {
            console.log(`Error: ${err.message}`);
            if (err.message.includes('Tweet needs to be a bit shorter')) {
              let firstTweet = tweet.slice(0, 257);
              let secondTweet = tweet.slice(257, 500);
              let thirdTweet = tweet.slice(500, 750);
              let fourthTweet = tweet.slice(750, tweet.length);

              if (fourthTweet) {
                T.post('statuses/update', { status: fourthTweet });
                // console.log(fourthTweet);
              }
              if (thirdTweet) {
                setTimeout(() => {
                  T.post('statuses/update', { status: thirdTweet });
                  // console.log(thirdTweet);
                }, 1500);
              }
              if (secondTweet) {
                setTimeout(() => {
                  T.post('statuses/update', { status: secondTweet });
                  // console.log(secondTweet);
                }, 3000);
              }
              if (firstTweet) {
                setTimeout(() => {
                  T.post('statuses/update', { status: firstTweet });
                  // console.log(firstTweet);
                }, 4500);
              }
            }
          } else {
            console.log('Tweeted');
          }
        });
      } else {
        console.log('No changes 2');
      }
      // Resets new driving test times
      newFreeTimes = [];
    }
  }, 1000 * 60 * 2); // every 2 minutes 1000 * 60 * 2
};

export default ExecuteBot;
