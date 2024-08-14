import { NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/App.Error";
import httpStatus from "http-status";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token, " tok oto");

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized !");
    }

    next();
  });
};
export default auth;
