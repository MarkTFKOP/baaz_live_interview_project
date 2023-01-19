import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
const router = Router();
export default (app: Router) => {
  app.use("/restaurant", router);
  router.get(
    "/get",
    middlewares.isAuth,
    middlewares.isRole.isRestaurant,
    controllers.restaurants.getMyRestaurantDetails
  );
  router.get(
    "/getRestaurantCollection",
    middlewares.isAuth,
    // middlewares.isRole.isRestaurant,
    controllers.restaurants.getRestaurantCollection
  );
  router.post("/createRestaurant", controllers.restaurants.addRestaurant);
  router.post(
    "/userToRestaurant",
    controllers.restaurants.makeUserToRestaurant
  );
  return router;
};
