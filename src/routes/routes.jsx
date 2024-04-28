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
<<<<<<< HEAD
const ManagerProfile = lazy(() => import("pages/manager/profile/index"));
const ManagerSingleClient = lazy(() =>
  import("pages/manager/clients/singleClient")
);
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
      path: "/clients/single",
      component: <ManagerSingleClient/>,
    },
    {
      path: "/products",
      component: <ManagerProducts />,
    },
      //  {
      //    path: "/branches",
      //    component: <ManagerBranches />,
      //  },
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
=======
const ManagerProduct = lazy(() => import('pages/manager/products/product'))
const ManagerProfile = lazy(()=> import("pages/profile"))

export const pages = {
         admin: [
           {
             path: "/",
             component: <AdminHome />,
             name: "",
           },
           {
             path: "/google-maps",
             component: <GoogleMap />,
             name: "",
           },
           {
             path: "/employee",
             component: <AdminEmployee />,
             name: "",
           },
           {
             path: "/clients",
             component: <AdminClients />,
             name: "",
           },
           {
             path: "/products",
             component: <AdminProducts />,
             name: "",
           },
           {
             path: "/branches",
             component: <AdminBranches />,
             name: "",
           },
           {
             path: "/statistics",
             component: <AdminStatistics />,
             name: "",
           },
           {
             path: "/settings",
             component: <AdminSettings />,
             name: "",
           },
           {
             path: "/archive",
             component: <AdminArchive />,
             name: "",
           },
         ],
         manager: [
           {
             path: "/",
             component: <ManagerBranches />,
             name: "Filiallar",
           },
           {
             path: "/employee",
             component: <ManagerEmployee />,
             name: "Xodimlar",
           },
           {
             path: "/profile",
             component: <ManagerProfile />,
             name: "Profil",
           },
           {
             path: "/clients",
             component: <ManagerClients />,
             name: "Mijozlar",
           },
           {
             path: "/products",
             component: <ManagerProducts />,
             name: "Mahsulotlar",
             children:[
              {
                path: "/products/:productId",
                component: <ManagerProduct/>,
                name:"Mahsulot"
              }
             ]
           },
           //    {
           //      path: "/branches",
           //      component: <ManagerBranches />,
           //    },
           {
             path: "/tasks",
             component: <ManagerTasks />,
             name: "Topshiriqlar",
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
             name: "Arxiv",
           },
         ],
       };
>>>>>>> f1d60b82010043dd621d4af37c5a992df95a4b11

export const authPages = [];
