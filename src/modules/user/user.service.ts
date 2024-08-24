import config from "../../config";
import { AcademicSemester } from "../academicSemister/academSemi.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { User } from "./user.model";
import { generateAdminId, generateStudentId } from "./user.utils";
import { TUser } from "./user.interface";
import AppError from "../../app/errors/App.Error";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Admin } from "../Admin/model.admin";
import { TAdmin } from "../Admin/interface.admin";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );
  if (!admissionSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Admission  semester is not correct !  "
    );
  }

  userData.id = await generateStudentId(admissionSemester);
  // console.log(userData);
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //embedded id
    studentData.user = newUser._id; // Reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

// const createAdminIntoDB = async (password: string, payload: TAdmin) => {
//   const userData: Partial<TUser> = {};
//   userData.password = password || (config.default_password as string);

//   userData.role = "admin";
//   userData.id = await generateAdminId();
//   const newUser = await User.create([userData]);
//   //create a admin
//   if (!newUser.length) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
//   }
//   // set id , _id as user
//   payload.id = newUser[0].id;
//   payload.user = newUser[0]._id; //reference _id
//   const newAdmin = Admin.create([payload]);
//   if (!newAdmin) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
//   }
//   return newAdmin;
// };

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = {
  createStudentIntoDB,
  createAdminIntoDB,
};
