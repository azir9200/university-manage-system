import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterValidation } from './academSemi.validation';
import { AcademicSemesterControllers } from './acaSemController';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,),
AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
  );

  router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
      
    ),
    AcademicSemesterControllers.updateAcademicSemester,
  );

export const AcademicSemesterRoutes = router;
