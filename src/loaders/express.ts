import routes from "../routes";
import mongoose from "mongoose";
import { Request, Response } from "express";

export default (express: any) => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  const MONGO_URI = process.env.MONGO_URI || "";

  app.use(express.json());
  app.use("/", routes());

  app.use("/status", (req: Request, res: Response) => {
    res.send("server connected");
  });

  app.listen(PORT, () => {
    console.log(`
            #####################################################
                           server connected: ${PORT}
            #####################################################`);
  });

  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URI).then(() => {
    console.log(`                           db connected
            #####################################################
      `);
  });
};
