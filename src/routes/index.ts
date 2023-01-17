import { Router } from "express";
import auth from "./auth";
import category from "./category";
const app = Router();

export default () => {
  category(app);
  auth(app);
  return app;
};
