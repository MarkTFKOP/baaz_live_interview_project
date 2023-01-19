import { Request, Response } from "express";
import models from "../models";
const categoryModel = models.category;
class Category {
  async GetAllCategories(req: Request, res: Response) {
    try {
      let categorySchema = await categoryModel.find();
      return res.send(categorySchema);
    } catch (error) {
      return res.status(500);
    }
  }
  async GetAllCategoryAndGraph(req: Request, res: Response) {
    try {
      let aggregateArray: any = [
        {
          $match: {
            parentId: {
              $exists: false,
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
      return res.send(categorySchema);
    } catch (error) {
      return res.status(500);
    }
  }
  async AddOneCategory(req: Request, res: Response) {
    try {
      console.log(req.body);
      let createObj = {};
      if (req.body.categoryName)
        Object.assign(createObj, { categoryName: req.body.categoryName });
      if (req.body.parentId)
        Object.assign(createObj, { parentId: req.body.parentId });
      // Object.assign(createObj, { $inc: { categoryId: 1 } });
      let categorySchema = await categoryModel.create({
        ...createObj,
        $inc: { categoryId: 1 },
      });
      return res.send(`Category Added ${categorySchema}`);
    } catch (error) {
      return res.status(500);
    }
  }

  async uploadCategoryImage(req: Request, res: Response) {
    try {
      console.log(req.body.categoryName);
      console.log(req.file);
      console.log(req.files);
      let categorySchema;
      // let categorySchema = await categoryModel.create({});
      return res.send(`uploadCategoryImage Added ${categorySchema}`);
    } catch (error) {
      return res.status(500);
    }
  }
}

export default new Category();
