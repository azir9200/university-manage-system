import { academicSemesterNameCodeMapper } from "./academSem.const";
import { TAcademicSemester,  } from "./academSemi.interface";
import { AcademicSemester } from "./academSemi.model";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) =>{

if(academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code){
   throw new Error('Invalid Semester Code')
}
   const result = await AcademicSemester.create(payLoad);
return result;
}

const getAllAcademicSemestersFromDB = async () => {
   const result = await AcademicSemester.find();
   return result;
 };

 const getSingleAcademicSemesterFromDB = async (id: string) => {
   const result = await AcademicSemester.findById(id);
   return result;
 };
 
 const updateAcademicSemesterIntoDB = async (
   id: string,
   payload: Partial<TAcademicSemester>,
 ) => {
   if (
     payload.name &&
     payload.code &&
     academicSemesterNameCodeMapper[payload.name] !== payload.code
   ) {
     throw new Error('Invalid Semester Code');
   }
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
     new: true,
   });
   return result;
 };

 export const  AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB,
 }