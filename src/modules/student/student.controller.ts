import {   NextFunction, Request,  RequestHandler, Response,  } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import { UpdateStudent } from './updateStudent';



const getAllStudents  = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
      })   
  });

const getSingleStudent  = catchAsync(async (req, res) => {
  
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrived successfully by Azir',
    data: result,
    })

});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await UpdateStudent.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent =catchAsync(  async (req, res) =>{
 const {studentId} = req.params;
const result = await StudentServices.deleteStudentFromDB(studentId);

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student is deleted successfully !',
  data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
//route-control-service-model-interface