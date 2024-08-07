import express from "express";
import validateRequest from "../../app/middlewares/validateRequest";
import { CourseValidations } from "./validation.course";
import { CourseControllers } from "./controllers.course";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get("/:id", CourseControllers.getSingleCourse);

router.get("/", CourseControllers.getAllCourses);

router.delete("/:id", CourseControllers.deleteCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

export const CourseRoutes = router;
