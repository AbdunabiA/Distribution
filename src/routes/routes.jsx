import { lazy } from "react";
//?ADMIN PAGES
const AdminHome = lazy(() => import("pages/admin/home/home"));
const GoogleMap = lazy(() => import("pages/admin/home/GoogleMaps"));
const AdminEmployee = lazy(() => import("pages/admin/employee/employee"));
const AdminClients = lazy(() => import("pages/admin/clients"));
const AdminProducts = lazy(() => import("pages/admin/products"));
const AdminBranches = lazy(() => import("pages/admin/branches"));
const AdminStatistics = lazy(() => import("pages/admin/statistics"));
const AdminSettings = lazy(() => import("pages/admin/settings"));
const AdminArchive = lazy(() => import("pages/admin/archive"));

//?MANAGER PAGES
const ManagerArchive = lazy(() => import("pages/manager/archive/archive"));
const ManagerBranches = lazy(() => import("pages/manager/branches/branches"));
const ManagerClients = lazy(() => import("pages/manager/clients/clients"));
const ManagerEmployee = lazy(() => import("pages/manager/employee/employee"));
const ManagerProducts = lazy(() => import("pages/manager/products/products"));
const ManagerTasks = lazy(() => import("pages/manager/tasks/tasks"));
const ManagerProfile = lazy(()=> import("pages/manager/profile/index"))

export const pages = {
  admin: [
    {
      path: "/",
      component: <AdminHome />,
    },
    {
      path: "/google-maps",
      component: <GoogleMap />,
    },
    {
      path: "/employee",
      component: <AdminEmployee />,
    },
    {
      path: "/clients",
      component: <AdminClients />,
    },
    {
      path: "/products",
      component: <AdminProducts />,
    },
    {
      path: "/branches",
      component: <AdminBranches />,
    },
    {
      path: "/statistics",
      component: <AdminStatistics />,
    },
    {
      path: "/settings",
      component: <AdminSettings />,
    },
    {
      path: "/archive",
      component: <AdminArchive />,
    },
  ],
  manager: [
    {
      path: "/",
      component: <ManagerBranches />,
    },
    //    {
    //      path: "/google-maps",
    //      component: <GoogleMap />,
    //    },
    {
      path: "/employee",
      component: <ManagerEmployee />,
    },
    {
      path: "/profile",
      component: <ManagerProfile />,
    },
    {
      path: "/clients",
      component: <ManagerClients />,
    },
    {
      path: "/products",
      component: <ManagerProducts />,
    },
    //    {
    //      path: "/branches",
    //      component: <ManagerBranches />,
    //    },
    {
      path: "/tasks",
      component: <ManagerTasks />,
    },
    //    {
    //      path: "/statistics",
    //      component: <AdminStatistics />,
    //    },
    //    {
    //      path: "/settings",
    //      component: <AdminSettings />,
    //    },
    {
      path: "/archive",
      component: <ManagerArchive />,
    },
  ],
};

export const authPages = [];
