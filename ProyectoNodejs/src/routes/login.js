"use strict";

import express from "express";
import multer from "multer";
import { Log } from "../api";
import { handleError } from "../utils";
import {Login} from "../services"


const app = express.Router();

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
