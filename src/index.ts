import express from "express";
import executeBot from "./utils/executeBot";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

setInterval(executeBot, 600000); //600000 = 10min

app.listen(3000, () => {
  console.log("App is listening on port 3000!");
});
