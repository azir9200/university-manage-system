import { model, Schema } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academSemi.interface";
import { AcademicSemesterCode, months } from "./academSem.const";

  

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String, required: true, enum: []
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
      const isSemesterExists = await AcademicSemester.find({
        year: this.year, name: this.name 
      })
      
      if(isSemesterExists){
        throw new Error('Semester is already exists !')
      }
      next();
})
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema,);