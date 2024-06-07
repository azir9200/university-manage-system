import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicFacultyValidation } from './validation.academicFaculty';
import { AcademicFacultyControllers } from './controller.academicFaculty';

const router = express.Router();

router.post('/create-academic-faculty', validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
),AcademicFacultyControllers.createAcademicFaculty);

router.get('/',AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch('/:facultyId', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema,), 
AcademicFacultyControllers.updateAcademicFaculty,);

export  const AcademicFacultyRoutes = router;