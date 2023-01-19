import { Request, Response } from "express";
import models from "../models";
const restaurantModel = models.restaurants;

class Restaurants {
  async addRestaurant(req: Request, res: Response) {
    try {
      return res.status(200).send("connected");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
  async makeUserToRestaurant(req: Request, res: Response) {
    try {
      return res.status(200).send("connected");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
  async getMyRestaurantDetails(req: Request, res: Response) {
    try {
      return res.status(200).send("connected");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
  async getRestaurantById(req: Request, res: Response) {
    try {
      return res.status(200).send("connected");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
}

export default new Restaurants();
