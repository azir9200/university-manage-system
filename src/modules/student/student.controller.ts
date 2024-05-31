import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import { z } from "zod";
import studentValidationSchema from './studentValidation';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents :RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
      })
    // res.status(200).json({
    //   success: true,
    //   message: 'Students are retrieved successfully',
    //   data: result,
    // });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent :RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is Created successfully by Azir',
      data: result,
      })
  } catch (err: any) {
        next(err);
  }
};

const deleteStudent :RequestHandler = async (req, res, next: NextFunction) =>{
  try{
const {studentId} = req.params;
console.log(studentId);
const result = await StudentServices.deleteStudentFromDB(studentId);

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student is deleted successfully !',
  data: result,
  })

  }catch(err: any){
    next(err);
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
//route-control-service-model-interface