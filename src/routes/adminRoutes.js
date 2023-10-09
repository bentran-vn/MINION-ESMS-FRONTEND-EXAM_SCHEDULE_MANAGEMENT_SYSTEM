import configs from "@/configs";

import Login from "@/pages/Login";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUser from "@/pages/AdminUser";
import AdminSemesters from "@/pages/AdminSemesters";
import AdminSlots from "@/pages/AdminSlots";
import AdminSubjects from "@/pages/AdminSubjects";
import StaffDashboard from "@/pages/StaffDashboard";
import StaffLayout from "@/layouts/StaffLayout";
import StaffTestNaNe from "@/pages/StaffTestNaNe";
import StaffExamPhase from "@/pages/StaffExamPhase";
import LecturerLayout from "@/layouts/LecturerLayout";
import LecturerDashboard from "@/pages/LecturerDashboard";
import LecturerExamPhase from "@/pages/LecturerExamPhase";
import StaffExamRoom from "@/pages/StaffExamRoom";

const adminRoutes = [
    {
        id: 1,
        path: configs.routes.login,
        component: Login,
        layout: null,
    },
    {
        id: 2,
        path: configs.routes.admin,
        component: AdminDashboard,
        layout: AdminLayout,
    },
    {
        id: 3,
        path: configs.routes.adminUsers,
        component: AdminUser,
        layout: AdminLayout,
    },
    {
        id: 4,
        path: configs.routes.adminSemesters,
        component: AdminSemesters,
        layout: AdminLayout,
    },
    {
        id: 5,
        path: configs.routes.adminSlots,
        component: AdminSlots,
        layout: AdminLayout,
    },
    {
        id: 6,
        path: configs.routes.adminSubjects,
        component: AdminSubjects,
        layout: AdminLayout,
    },
    {
        id: 7,
        path: configs.routes.staff,
        component: StaffDashboard,
        layout: StaffLayout,
    },
    {
        id: 8,
        path: configs.routes.staffTestNaNe,
        component: StaffTestNaNe,
        layout: StaffLayout,
    },
    {
        id: 9,
        path: configs.routes.staffExamPhase,
        component: StaffExamPhase,
        layout: StaffLayout,
    },
    {
        id: 10,
        path: configs.routes.staffExamRoom,
        component: StaffExamRoom,
        layout: StaffLayout,
    },
    {
        id: 11,
        path: configs.routes.lecturer,
        component: LecturerDashboard,
        layout: LecturerLayout,
    },
    {
        id: 12,
        path: configs.routes.lecturerExamPhase,
        component: LecturerExamPhase,
        layout: LecturerLayout,
    },
];

export default adminRoutes;
