
import { error } from "console";
import config from "../../config";
import { TAcademicSemester } from "../academicSemister/academSemi.interface";
import { AcademicSemester } from "../academicSemister/academSemi.model";
// import { AcademicSemester } from "../academicSemister/academSemi.model";
import { TStudent } from "../student/student.interface";
import { Student,  } from "../student/student.model";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { TUser } from "./user.interface";
import AppError from "../../app/errors/App.Error";
import httpStatus from "http-status";


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    const userData: Partial<TUser > = {    
    };
    
    userData.password = password || (config.default_password as string);

 userData.role = 'student';


 const admissionSemester = await AcademicSemester.findById(payload.admissionSemester,);
 if(!admissionSemester){
  
  throw new AppError(httpStatus.NOT_FOUND,'Admission  semester is not correct !  ', );
 }

 try{} 
 catch(err){

 }
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
export const UserServices = {
    createStudentIntoDB
}