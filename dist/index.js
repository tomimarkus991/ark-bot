"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const executeBot_1 = __importDefault(require("./utils/executeBot"));
require("dotenv").config();
const app = express_1.default();
const port = process.env.PORT || 5000;
executeBot_1.default();
app.listen(port, () => {
    console.log(`App is listening on port ${port}!`);
});
//# sourceMappingURL=index.js.map