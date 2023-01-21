import { Router } from "express";
import auth from "./auth";
import category from "./category";
import restaurants from "./restaurants";
import foods from "./foods";
const app = Router();

export default () => {
  category(app);
  auth(app);
  restaurants(app);
  foods(app);
  return app;
};
