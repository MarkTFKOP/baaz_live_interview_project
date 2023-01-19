import { Router } from "express";
import controllers from "../controllers";
const router = Router();
export default (app: Router) => {
  app.use("/restaurant", router);
  router.post("/createRestaurant", controllers.restaurants.addRestaurant);
  router.post(
    "/userToRestaurant",
    controllers.restaurants.makeUserToRestaurant
  );
  return router;
};
