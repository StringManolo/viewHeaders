import express, { Request, Response } from "express";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import escapeHTML from "./htmlEntities";

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const objBeautifier = (obj: any) => {
  let html = "";
  Object.keys(obj).forEach( (key) => {
    html += `<span class="key">${escapeHTML(key)}</span>: <span class="value">${escapeHTML(obj[key])}</span><br>`;
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
  return `<div id="json">${html}</div>`
}


router.get("/", (req: Request, res: Response) => {
  res.status(200).send(objBeautifier(req.headers));
});

// more router handlers here .. 

app.use("/.netlify/functions/index", router);

module.exports = app;
module.exports.handler = serverless(app);
