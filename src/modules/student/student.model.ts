import { model, Schema } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});



const studentSchema = new Schema<TStudent>({
  id: { type: String, required: [true, 'ID is required']},
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'Password is required '],unique: true,
    ref: 'User',
  },
  // password: {type: String, required: [true, 'Password is required '], maxLength: [20, 'Password can not be more than 20 characters.']},
  name: userNameSchema,
  gender: ['male', 'female', 'others'],
  dateOfBirth: { type: String },
  email: { type: String},
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String},
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

export const Student = model<TStudent>('Student', studentSchema);