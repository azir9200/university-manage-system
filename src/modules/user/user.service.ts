
import { error } from "console";
import config from "../../config";
import { TAcademicSemester } from "../academicSemister/academSemi.interface";
import { AcademicSemester } from "../academicSemister/academSemi.model";
// import { AcademicSemester } from "../academicSemister/academSemi.model";
import { TStudent } from "../student/student.interface";
import { Student,  } from "../student/student.model";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import { TUser } from "./user.interface";
import AppError from "../../app/errors/App.Error";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/interface.faculty";
import { AcademicDepartment } from "../academicDepartment/model.academicdepartment";
import mongoose from "mongoose";
import { Faculty } from "../Faculty/model.faculty";
import { Admin } from "../Admin/model.admin";


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    const userData: Partial<TUser > = {};
    
    userData.password = password || (config.default_password as string);

 userData.role = 'student';


 const admissionSemester = await AcademicSemester.findById(payload.admissionSemester,);
 if(!admissionSemester){
  
  throw new AppError(httpStatus.NOT_FOUND,'Admission  semester is not correct !  ', );
 }

//  try{} 
//  catch(err){

//  }
  //set  generated id
userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);
 if( Object.keys(newUser).length){
    payload.id = newUser.id; //embedded id
    payload.user = newUser._id  // Reference id

    const newStudent = await Student.create(payload);
    return newStudent;
 }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};


  userData.password = password || (config.default_password as string);

   userData.role = 'faculty';

   const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};