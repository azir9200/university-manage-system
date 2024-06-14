import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };
  
    
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }
  
    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }
  
    if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdatedData[`localGuardian.${key}`] = value;
      }
    }
  
    console.log(modifiedUpdatedData);
  
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });
    return result;
  };
  export const UpdateStudent = {
updateStudentIntoDB,
  }