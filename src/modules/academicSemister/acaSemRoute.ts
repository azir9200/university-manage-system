import express from "express";
import validateRequest from "../../app/middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academSemi.validation";
import { AcademicSemesterControllers } from "./acaSemController";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  auth("admin"),
  AcademicSemesterControllers.getAllAcademicSemesters
);

router.get(
  "/:semesterId",
  AcademicSemesterControllers.getSingleAcademicSemester
);

router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
