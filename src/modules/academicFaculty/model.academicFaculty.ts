import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./interface.academicFaculty";

  const academicFacultySchema = new Schema<TAcademicFaculty>({
    name:{type: String,
         required: true, 
        unique: true},
},
{timestamps: true,});

export const AcademicFaculty = model<TAcademicFaculty>('academicFaculty', academicFacultySchema,)

