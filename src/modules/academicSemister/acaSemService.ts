import { TAcademicSemesterCode } from "./academSemi.interface";
import { AcademicSemester } from "./academSemi.model";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemesterCode) =>{

const result = await AcademicSemester.create(payLoad);
return result;

}
 

 export const  AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
 }