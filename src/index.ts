import express, { Request, Response } from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/", (req: Request, res: Response) => {
  res.json({ response: "Hello!" })
});

// more router handlers here .. 

app.use("/.netlify/functions/index", router);

module.exports = app;
module.exports.handler = serverless(app);
