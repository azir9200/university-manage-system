import { model, Schema } from "mongoose";
// import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academSemi.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academSem.const";
import { TAcademicSemester } from "./academSemi.interface";
import AppError from "../../app/errors/App.Error";
import httpStatus from "http-status";

  

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String, required: true, enum: AcademicSemesterName,
        },
        year: {
            type: String, required: true,
        },
        code: {
            type: String, required: true, enum: AcademicSemesterCode, 
        },
        startMonth: {
            type: String, required: true, enum: months,
        },
        endMonth: {
            type: String, required: true, enum: months,
        }
    },
    {
        timestamps: true,
    },
);

academicSemesterSchema.pre('save', async function (next){
      const isSemesterExists = await AcademicSemester.findOne({
        year: this.year, name: this.name 
      })
      
      if(isSemesterExists){
        //throw new Error('Semester is already exists !')
        throw new AppError(httpStatus.NOT_FOUND,'This department does not exist! ', );
      }
      next();
})
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema,);