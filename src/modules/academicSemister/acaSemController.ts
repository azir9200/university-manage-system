import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicSemesterServices } from "./acaSemService";

const  createAcademicSemester = catchAsync(async (req, res) => {
const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Semester is created by Azir',
        data: result,
    });
});
export const AcademicSemesterControllers = {
    createAcademicSemester,
}