import { Router } from "express";
import auth from "./auth";
import category from "./category";
import restaurants from "./restaurants";
const app = Router();

export default () => {
  category(app);
  auth(app);
  restaurants(app);
  return app;
};
