"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escapeChars = {
    "¢": "cent",
    "£": "pound",
    "¥": "yen",
    "€": "euro",
    "©": "copy",
    "®": "reg",
    "<": "lt",
    ">": "gt",
    "\"": "quot",
    "&": "amp",
    "'": "#39"
};
let regexString = "[";
for (const key in escapeChars) {
    regexString += key;
}
regexString += "]";
const regex = new RegExp(regexString, "g");
function escapeHTML(str) {
    return `${str}`.replace(regex, (m) => {
        return "&" + escapeChars[m] + ";";
    });
}
exports.default = escapeHTML;
;
