import { academicSemesterNameCodeMapper } from "./academSem.const";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterNameCodeMapper } from "./academSemi.interface";
import { AcademicSemester } from "./academSemi.model";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) =>{


if(academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code){
   throw new Error('Invalid Semester Code')
}

   const result = await AcademicSemester.create(payLoad);
return result;
}
 

 export const  AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
 }