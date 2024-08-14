import httpStatus from "http-status";
import AppError from "../../app/errors/App.Error";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);
  console.log(user);

  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, "This user  is not found !");
  // }

  // const isUserExist = await User.findOne({ id: payload?.id });

  // if (!isUserExist) {
  //   throw new AppError(httpStatus.NOT_FOUND, "This user  is not found !");
  // }
  // console.log(isUserExist.password, "IS USER");
  // const isDeleted = user?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, "This user  is Deleted !");
  // }
  // const userStatus = user?.status;
  // if (userStatus === "blocked") {
  //   throw new AppError(httpStatus.FORBIDDEN, "This user  is blocked !");
  // }
  //match password

  // another way
  // const isPasswordMatched = await bcrypt.compare(
  //   payload?.password,
  //   isUserExist?.password
  // );
  // console.log(isPasswordMatched, "matched");

  // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     "Password does not matched, Forbidden !"
  //   );

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return { accessToken, needsPasswordChanged: user.needsPasswordChange };
};

export const AuthServices = {
  loginUser,
};
