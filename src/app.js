import express from "express";
import chalk from "chalk";
import bodyParser from "body-parser";
import { ZENCODE_DIR, HTTP_PORT, HTTPS_PORT, HOST } from "./config";
import zencode from "@restroom-mw/core";
import ui from "./ui/index";
import db from "@restroom-mw/db";
import http from "http";
import fs from "fs";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("morgan")("dev"));
app.set("json spaces", 2);

app.use(db);
app.use("/docs/:user", ui);
app.use("/api/*", zencode);

const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, HOST, () => {
  console.log(
    "Restroom started on " + chalk`{bold.blue http://0.0.0.0:${HTTP_PORT}}`
  );
});
