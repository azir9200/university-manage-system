import {  NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";

const createStudent :RequestHandler = async (req, res, next: NextFunction) => {
    try {      
      const { password, student: studentData } = req.body;
  
  const result = await UserServices.createStudentIntoDB(password, studentData);
  console.log(studentData);
  sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student is Created successfully by Azir',
  data: result,
  })
      // res.status(200).json({
      //   success: true,
      //   message: 'Student(user) is created successfully',
      //   data: result,
      // });

    } catch (err) {     
      next(err);
    }
  };

  export const UserControllers = {
    createStudent,
  }