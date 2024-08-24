import express from "express";
import validateRequest from "../../app/middlewares/validateRequest";
import { AcademicFacultyValidation } from "./validation.academicFaculty";
import { AcademicFacultyControllers } from "./controller.academicFaculty";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get(
  "/",
  auth(USER_ROLE.student),
  AcademicFacultyControllers.getAllAcademicFaculties
);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
