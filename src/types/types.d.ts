// declare namespace Express {
//   export interface Request {
//     user: any;
//   }
//   export interface Response {
//     user: any;
//   }
// }

import { Request } from "express";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}
