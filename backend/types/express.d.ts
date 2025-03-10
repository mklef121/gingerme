import { users } from "@prisma/client";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: users;
  }
}

declare global {
  interface BigInt {
      toJSON(): Number;
  }
}
