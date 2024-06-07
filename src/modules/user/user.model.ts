import { model, Schema } from "mongoose";
import { TRUserName, TUser,  } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';


const userNameRSchema = new Schema<TRUserName>({
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

const userSchema = new Schema<TUser>({
    
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password:  {
        type: String,
        required: true,
    },
    needsPasswordChange:  {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']        
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },    
},
{
    timestamps: true,
},);

// PRE hook  middleware then post
userSchema.pre('save', async function(next){
    // console.log(this, 'pre hook: we will save data !')
  const user = this
   user.password  = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds),);
   next();
  });
  
  
  userSchema.post('save', function(doc,next){
    doc.password = "";
    next();
    // console.log( 'post hook: our data is already saved !')
  })
  // Query middleware for delete a data; 
  
//   studentSchema.pre('find', function (next){
//     console.log(this);
//      this.find({isDeleted: {$ne:true}})
//      next();
//   })
  

export const User = model<TUser>('User', userSchema)