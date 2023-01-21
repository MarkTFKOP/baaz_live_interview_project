import { Request, Response } from "express";
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

  async addRestaurant(req: Request, res: Response) {
    try {
      let createObj = {};
      Object.assign(createObj, { foodName: req.body.foodName });
      Object.assign(createObj, { price: req.body.price });
      Object.assign(createObj, { categoryId: req.body.categoryId });
      // let foodData = await foodModel.create(createObj);
      (async () => {
        await foodModel.create({
          ...createObj,
          // "createdBy.User": req.user._id,
        });
      })();
      return res.status(200).send("Connected");
    } catch (error) {
      return res.status(500).send("Something went wrong");
    }
  }
}

export default new Foods();
