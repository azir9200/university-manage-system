 import express from 'express';
import { FacultyControllers } from './controller.faculty';
import validateRequest from '../../app/middlewares/validateRequest';
import { updateFacultyValidationSchema } from './validation.faculty';


const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;