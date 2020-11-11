"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const executeBot_1 = __importDefault(require("./utils/executeBot"));
const app = express_1.default();
app.get("/", (_, res) => {
    res.send("Hello World!");
});
setInterval(executeBot_1.default, 600000);
app.listen(3000, () => {
    console.log("App is listening on port 3000!");
});
//# sourceMappingURL=index.js.map