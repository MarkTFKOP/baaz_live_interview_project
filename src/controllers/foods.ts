import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import models from "../models";
const foodModel = models.foods;

class Foods {
  async getAllFoods(req: any, res: Response) {
    try {
      return res.status(200).send("Connected");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
  async addRestaurant(req: any, res: Response) {
    try {
      return res.status(200).send("Connected");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
}

export default new Foods();
