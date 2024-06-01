import { model, Schema } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academSemi.interface";
import { AcademicSemesterCode, months } from "./academSem.const";

  

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String, required: true, enum: []
        },
        year: {
            type: Date, required: true,
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
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema,);