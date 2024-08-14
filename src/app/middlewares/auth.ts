import { NextFunction, Request } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/App.Error";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../../modules/user/user.interface";

// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

const auth = (...requiredRoles: TUserRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token, " token");

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized !");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not Authorized !"
          );
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized  ola !"
          );
        }
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};
export default auth;
