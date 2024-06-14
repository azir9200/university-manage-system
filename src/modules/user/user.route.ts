import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/studentValidation';




const router = express.Router();



router.post('/create-student',validateRequest(createStudentValidationSchema),
UserControllers.createStudent);




export const UserRoutes = router;