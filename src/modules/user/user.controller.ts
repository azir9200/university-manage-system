// import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
console.log(password);
  const result = await UserServices.createStudentIntoDB(password, studentData);
  console.log(studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Created successfully by Azir",
    data: result,
  });
});


export const UserControllers = {
  createStudent,

};
