import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
const router = Router();
export default (app: Router) => {
  app.use("/foods", router);
  router.get("/get", controllers.foods.getAllFoods);
  router.post(
    "/add",
    middlewares.isAuth,
    middlewares.isRole.isRestaurant,
    controllers.foods.addRestaurant
  );
  return router;
};
