"use strict";

import express from "express";
import multer from "multer";
import { Log } from "../api";
import { handleError } from "../utils";
import {Login} from "../services"

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/contratos/");
  },
  filename: function(req, file, cb) {
    const fileObj = {
      "image/png": ".png",
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg"
    };
    if (fileObj[file.mimetype] == undefined) {
      cb(new Error("file format not valid"));
    } else {
      cb(null, file.fieldname + "-" + Date.now() + fileObj[file.mimetype]);
    }
  }
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 }
});
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const data = await Contratos.find();
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const data = await Contratos.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
});

app.post("/",  async (req, res) => {
  try {
    const data = await Log.singIn(req.body);
    let q = req.body;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'An error ocurred',
      error: error.toString()
    });
  }
});
export default app;
