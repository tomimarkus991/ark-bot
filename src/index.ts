import express from "express";
import executeBot from "./utils/executeBot";

const main = async () => {
  require("dotenv").config();

  const app = express();

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  const port = process.env.PORT || 5000;

  executeBot();
  app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
  });
};

main();
