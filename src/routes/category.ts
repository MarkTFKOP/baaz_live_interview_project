import { Router } from "express";
import controllers from "../controllers";
import { uploadData } from "../middlewares/uploadData";
import uploadFile from "../middlewares/uploadFile";
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const router = Router();
export default (app: Router) => {
  app.use("/category", router);
  router.get("/", controllers.category.GetAllCategories);
  router.post("/", controllers.category.AddOneCategory);
  router.post(
    "/image",
    upload.single("image"),
    controllers.category.uploadCategoryImage
  );
  return router;
};
