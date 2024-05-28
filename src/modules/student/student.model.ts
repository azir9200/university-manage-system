import { model, Schema } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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
  password: {type: String, required: [true, 'Password is required '], maxLength: [20, 'Password can not be more than 20 characters.']},
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
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{Value}  is not a valid status',
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
});
// PRE hook  middleware then post
studentSchema.pre('save', async function(next){
  // console.log(this, 'pre hook: we will save data !')
const user = this
 user.password  = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
 next();
})


studentSchema.post('save', function(doc,next){
  doc.password = "";
  next();
  // console.log( 'post hook: our data is already saved !')
})
// Query middleware for delete a data; 

studentSchema.pre('find', function (next){
  console.log(this);
  // this.find({isDeleted: {$ne:true}})
  // next();
})

export const StudentModel = model<TStudent>('Student', studentSchema);