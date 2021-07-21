import cheerio from 'cheerio';
import request from 'request-promise';
import { Data } from '../types/types';

const GetData = async (link: string) => {
  const result = await request.get(link);
  const $ = cheerio.load(result);

  const updatedAt = $(`div > table > thead > tr > th > span`)
    .text()
    .slice(23, 40);

  let data: Data[] = [];

  // Counts how many cities are on the page
  const howManyCities: number = $(`div > table > tbody > tr`).length;

  let cities: string[] = [];
  for (let i = 1; i <= howManyCities; i++) {
    // Gets Driving Test City
    const city = $(
      `tr.ui-widget-content:nth-child(${i}) > td:nth-child(1) > span:nth-child(1)`,
    ).text();

    // Gets First Driving test time
    const time1 = $(
      `tr.ui-widget-content:nth-child(${i}) > td:nth-child(3)`,
    ).text();

    // Gets Second Driving test time
    const time2 = $(
      `tr.ui-widget-content:nth-child(${i}) > td:nth-child(4)`,
    ).text();

    // Gets Third Driving test time
    const time3 = $(
      `tr.ui-widget-content:nth-child(${i}) > td:nth-child(5)`,
    ).text();

    // Pushes Cities to Array
    cities.push(city);
    // Formats Test Times
    const times = { city, updatedAt, newTimes: { time1, time2, time3 } };

    // Pushes formated times to Array
    data.push(times);
  }

  return { data, cities };
};

export default GetData;
