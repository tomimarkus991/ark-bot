import * as dotenv from "dotenv";

dotenv.config();

export const consumer_key = process.env.CONSUMER_KEY as string;
export const consumer_secret = process.env.CONSUMER_SECRET as string;
export const access_token = process.env.ACCESS_TOKEN as string;
export const access_token_secret = process.env.ACCESS_TOKEN_SECRET as string;
