import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { z } from "zod";
import studentValidationSchema from './studentValidation';

const createStudent = async (req: Request, res: Response) => {
  try {
    
    const { student: studentData } = req.body;

const zodParseData = studentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParseData);
console.log(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success:false,
      message: "Hey Azir, You did something wrong",
      //  error: error.details
    })
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success:false,
      message: "Hey Azir, to get all Students are something wrong",
      //  error: error.details
    })
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully by Azir',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success:false,
      message: " to get single data are something wrong",
      //  error: error.details
    })
    console.log(err);
  }
};

const deleteStudent = async(req: Request, res: Response) =>{
  try{
const {studentId} = req.params;
console.log(studentId);
const result = await StudentServices.deleteStudentFromDB(studentId);

res.status(200).json({
  success: true,
  message: 'Student is deleted successfully !',
  data: result,
})
  }catch(err: any){
    res.status(500).json({
      success:false,
      message: " to delete single data are something wrong",
    })
    console.log(err);
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
//route-control-service-model-interface