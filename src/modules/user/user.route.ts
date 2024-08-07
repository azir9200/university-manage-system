import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/studentValidation";
import { createFacultyValidationSchema } from "../Faculty/validation.faculty";
import { createAdminValidationSchema } from "../Admin/validation.admin";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

// router.post(
//   "/create-student",
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent
// );

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;
