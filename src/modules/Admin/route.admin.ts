 import express from 'express';
import { AdminControllers } from './controller.admin';
import validateRequest from '../../app/middlewares/validateRequest';
import { updateAdminValidationSchema } from './validation.admin';


const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;