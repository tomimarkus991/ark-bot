"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const difference_1 = __importDefault(require("./difference"));
const areSame = (array1, array2) => {
    if (JSON.stringify(array1) === JSON.stringify(array2)) {
        return "no changes";
    }
    else {
        return difference_1.default(array1, array2);
    }
};
exports.default = areSame;
//# sourceMappingURL=areSame.js.map