import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { createStudentValidationSchema } from "../student/studentValidation";
import { createFacultyValidationSchema } from "../Faculty/validation.faculty";
import { createAdminValidationSchema } from "../Admin/validation.admin";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;
