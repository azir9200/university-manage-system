import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  console.log(payload, " auth service");
  return {};
};

export const AuthServices = {
  loginUser,
};
