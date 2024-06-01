import { optional, z } from 'zod';
// import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

export const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string().min(1),
});

export const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

 const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

export const createStudentValidationSchema = z.object({
  body:z.object({  
    password: z.string().max(20),
   student: z.object({
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'others']),
    dateOfBirth: z.date().optional(),
    email: z.string().email(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string(),
   }),    
  }),
})

export const studentValidation = {
  createStudentValidationSchema,
}
