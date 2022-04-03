"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const body_parser_1 = __importDefault(require("body-parser"));
const htmlEntities_1 = __importDefault(require("./htmlEntities"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const objBeautifier = (obj) => {
    let html = "";
    Object.keys(obj).forEach((key) => {
        html += `<span class="key">${(0, htmlEntities_1.default)(key)}</span>: <span class="value">${(0, htmlEntities_1.default)(obj[key])}</span><br>`;
    });
    html += `
<style>
body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#json { 
  padding: 5vw; 
  width: 70vw; 
  background-color: #eee;
  word-wrap: break-word;
}

.key {
  color: blue;
}

.value {
  color: #333;
}
</style>`;
    return `<div id="json">${html}</div>`;
};
router.get("/", (req, res) => {
    //res.type("json").send(JSON.stringify(req.headers, null, 2) + "\n");
    res.status(200).send(objBeautifier(req.headers));
});
// more router handlers here .. 
app.use("/.netlify/functions/index", router);
module.exports = app;
module.exports.handler = (0, serverless_http_1.default)(app);
