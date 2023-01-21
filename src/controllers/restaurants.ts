import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import models from "../models";
const restaurantModel = models.restaurants;
const authModel = models.auth;
const categoryModel = models.category;

class Restaurants {
  async addRestaurant(req: Request, res: Response) {
    let createObj = {};
    let restaurant;
    try {
      Object.assign(createObj, { name: req.body.name });
      Object.assign(createObj, { email: req.body.email });
      Object.assign(createObj, { username: req.body.username });
      Object.assign(createObj, { role: "restaurant" });
      const hash = await argon2.hash(req.body.password);
      //   let uuid = await argon2.hash("password");
      Object.assign(createObj, { password: hash });
      let registeredUser: any = await authModel.create(createObj);
      registeredUser = registeredUser.toObject();
      delete registeredUser.password;
      delete registeredUser.__v;
      var token = jwt.sign(registeredUser, process.env.JSON_WEB_TOKEN || "");
      let uuid = await argon2.hash(JSON.stringify(registeredUser));
      delete registeredUser.isDeleted;
      delete registeredUser.createdAt;
      delete registeredUser.isActive;
      delete registeredUser.updatedAt;
      delete registeredUser.role;

      await authModel.updateOne(
        { _id: registeredUser._id },
        { uuid: uuid.substring(uuid.length / 1.32), token: token }
      );
      let restaurantObject = {};
      Object.assign(restaurantObject, {
        restaurantName: req.body.restaurantName,
      });
      Object.assign(restaurantObject, {
        userId: registeredUser._id,
      });
      if (req.body.Location)
        Object.assign(restaurantObject, { Location: req.body.Location });
      if (req.body.parentCategoryId)
        Object.assign(restaurantObject, {
          parentCategoryId: req.body.parentCategoryId,
        });
      restaurant = await restaurantModel.create({
        ...restaurantObject,
        "createdBy.User": registeredUser._id,
      });
      //   console.log(registeredUser);
      //   console.log(restaurant);
      return res
        .status(200)
        .send({ ...registeredUser, restaurantName: restaurant.restaurantName });
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
  async getMyRestaurantDetails(req: any, res: Response) {
    try {
      let restaurantDetails = await restaurantModel
        .findOne({
          userId: req.user._id,
        })
        .select("restaurantName");
      let userDetails = await authModel
        .findOne({ _id: req.user._id })
        .select("name email username");
      return res
        .status(200)
        .send({ ...restaurantDetails?.toObject(), ...userDetails?.toObject() });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
  async getRestaurantCollection(req: any, res: Response) {
    try {
      let restaurantDetails: any = await restaurantModel
        .findOne({
          userId: req.user._id,
        })
        .select("restaurantName parentCategoryId");
      let aggregateArray: any = [
        {
          $match: {
            _id: {
              $in: restaurantDetails.parentCategoryId,
            },
          },
        },
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentId",
            as: "children",
            depthField: "depth",
            restrictSearchWithMatch: {
              isDeleted: false,
            },
          },
        },
        {
          $unwind: {
            path: "$children",
          },
        },
        {
          $sort: {
            depth: 1,
            "children.createdAt": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            categoryName: {
              $first: "$categoryName",
            },
            children: {
              $push: "$children",
            },
          },
        },
      ];
      let categorySchema = await categoryModel.aggregate(aggregateArray);
      return res.status(200).send(categorySchema);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong");
    }
  }
}

export default new Restaurants();
