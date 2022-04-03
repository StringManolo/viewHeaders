"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
router.get("/", (req, res) => {
    res.json({ response: "Hello!" });
});
// more router handlers here .. 
app.use("/.netlify/functions/index", router);
module.exports = app;
module.exports.handler = (0, serverless_http_1.default)(app);
