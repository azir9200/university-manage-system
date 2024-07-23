import { Router } from "express";
import { UserRoutes } from "../../modules/user/user.route";
import { StudentRoutes } from "../../modules/student/student.route";
import { AcademicSemesterRoutes } from "../../modules/academicSemister/acaSemRoute";
import { AcademicFacultyRoutes } from "../../modules/academicFaculty/route.academicFaulty";
import { AcademicDepartmentRoutes } from "../../modules/academicDepartment/route.academicDepartment";
import { AdminRoutes } from "../../modules/Admin/route.admin";
import { FacultyRoutes } from "../../modules/Faculty/route.faculty";
import { CourseRoutes } from "../../modules/Courses/router.course";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
      },
      {
        path: '/faculties',
        route: FacultyRoutes,
      },
    {
        path: '/admin',
        route: AdminRoutes,
      },
    {
        path: '/course',
        route: CourseRoutes,
      },
]

moduleRoutes.forEach((route) =>router.use(route.path, route.route));

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

export default router;