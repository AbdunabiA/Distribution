import { lazy } from "react";

const Login = lazy(() => import("pages/login"));
const Profile = lazy(() => import("pages/profile/index"));

//?ADMIN PAGES
const AdminHome = lazy(() => import("pages/admin/home/home"));
const GoogleMap = lazy(() => import("pages/admin/home/GoogleMaps"));
const AdminEmployees = lazy(() => import("pages/admin/employee/employee"));
const AdminClients = lazy(() => import("pages/admin/clients"));
const AdminProducts = lazy(() => import("pages/admin/products"));
const AdminBranches = lazy(() => import("pages/admin/branches"));
const AdminStatistics = lazy(() => import("pages/admin/statistics"));
const AdminSettings = lazy(() => import("pages/admin/settings"));
const AdminArchive = lazy(() => import("pages/admin/archive"));

//?MANAGER PAGES
const ManagerArchive = lazy(() => import("pages/manager/archive/archive"));
const ManagerBranches = lazy(() => import("pages/manager/branches/branches"));
const ManagerBranch = lazy(() => import("pages/manager/branches/branch"));
const ManagerClients = lazy(() => import("pages/manager/clients/clients"));
const ManagerEmployees = lazy(() => import("pages/manager/employee/employees"));
const ManagerProducts = lazy(() => import("pages/manager/products/products"));
const ManagerTasks = lazy(() => import("pages/manager/tasks/tasks"));
const ManagerProduct = lazy(() => import("pages/manager/products/product"));
const ManagerSingleClient = lazy(() =>
  import("pages/manager/clients/singleClient")
);
const ManagerBranchTasks = lazy(() =>
  import("pages/manager/branches/branchTasks")
);
const ManagerBranchProducts = lazy(() =>
  import("pages/manager/branches/branchProducts")
);
const ManagerBranchClients = lazy(() =>
  import("pages/manager/branches/branchClients")
);
const ManagerBranchEmployees = lazy(() =>
  import("pages/manager/branches/branchEmployees")
);

const ManagerEmployeeSingle = lazy(() =>
  import("pages/manager/employee/employeeSingle")
);
const ManagerBranchOrders = lazy(() =>
  import("pages/manager/branches/branchOrders")
);

//?BRANCH DIRECTOR PAGES
const BranchDirectorProducts = lazy(() =>
  import("pages/branchDirector/products/products")
);
const BranchDirectorClients = lazy(() =>
  import("pages/branchDirector/clients/clients")
);
const BranchDirectorTasks = lazy(() =>
  import("pages/branchDirector/tasks/tasks")
);
const BranchDirectorEmployees = lazy(() =>
  import("pages/branchDirector/employee/employees")
);
const BranchDirectorOrders = lazy(() =>
  import("pages/branchDirector/orders/orders")
);
const BranchDirectorSingleClient = lazy(() =>
  import("pages/branchDirector/clients/singleClient")
);

//?OPERATOR PAGES
const OperatorOrders = lazy(() => import("pages/operator/orders/orders"));
const OperatorProducts = lazy(() => import("pages/operator/products/products"));
const OperatorClients = lazy(() => import("pages/operator/clients/clients"));
const OperatorDrivers = lazy(() => import("pages/operator/drivers/drivers"));

//?OPERATOR PAGES
const AgentTasks = lazy(() => import("pages/agent/tasks/tasks"));
const AgentClients = lazy(() => import("pages/agent/clients/clients"));
const AgentProducts = lazy(() => import("pages/agent/products/products"));

//?SUPERVISOR PAGES
const SupervisorTasks = lazy(() => import("pages/supervisor/tasks/tasks"));
const SupervisorClients = lazy(() =>
  import("pages/supervisor/clients/clients")
);
const SupervisorProducts = lazy(() =>
  import("pages/supervisor/products/products")
);
const SupervisorAgents = lazy(() => import("pages/supervisor/agents/agents"));
const SupervisorSingleClient = lazy(() =>
  import("pages/supervisor/clients/singleClient")
);

export const pages = {
         admin: [
           {
             path: "/",
             component: <ManagerBranches />,
             name: "Filiallar",
             children: [
               {
                 path: "/branches/:branchId",
                 component: <ManagerBranch />,
                 children: [
                   {
                     path: "/branches/:branchId/tasks",
                     component: <ManagerBranchTasks />,
                   },
                   {
                     path: "/branches/:branchId/products",
                     component: <ManagerBranchProducts />,
                   },
                   {
                     path: "/branches/:branchId/clients",
                     component: <ManagerBranchClients />,
                   },
                   {
                     path: "/branches/:branchId/employees",
                     component: <ManagerBranchEmployees />,
                   },
                   {
                     path: "/branches/:branchId/orders",
                     component: <ManagerBranchOrders />,
                   },
                 ],
               },
             ],
           },
           {
             path: "/employee",
             component: <ManagerEmployees />,
             name: "Xodimlar",
             children: [
               {
                 path: "/employee/:employeeId",
                 component: <ManagerEmployeeSingle />,
               },
             ],
           },
           {
             path: "/profile",
             component: <Profile />,
             name: "Profil",
           },
           {
             path: "/clients",
             component: <ManagerClients />,
             name: "Mijozlar",
             children: [
               {
                 path: "/clients/:clintId",
                 component: <ManagerSingleClient />,
               },
             ],
           },
           {
             path: "/products",
             component: <ManagerProducts />,
             name: "Mahsulotlar",
             children: [
               {
                 path: "/products/:productId",
                 component: <ManagerProduct />,
                 name: "Mahsulot",
               },
             ],
           },
           {
             path: "/tasks",
             component: <ManagerTasks />,
             name: "Topshiriqlar",
           },
           {
             path: "/archive",
             component: <ManagerArchive />,
             name: "Arxiv",
           },
         ],
         manager: [
           {
             path: "/",
             component: <ManagerBranches />,
             name: "Filiallar",
             children: [
               {
                 path: "/branches/:branchId",
                 component: <ManagerBranch />,
                 children: [
                   {
                     path: "/branches/:branchId/tasks",
                     component: <ManagerBranchTasks />,
                   },
                   {
                     path: "/branches/:branchId/products",
                     component: <ManagerBranchProducts />,
                   },
                   {
                     path: "/branches/:branchId/clients",
                     component: <ManagerBranchClients />,
                   },
                   {
                     path: "/branches/:branchId/employees",
                     component: <ManagerBranchEmployees />,
                   },
                   {
                     path: "/branches/:branchId/orders",
                     component: <ManagerBranchOrders />,
                   },
                 ],
               },
             ],
           },
           {
             path: "/employee",
             component: <ManagerEmployees />,
             name: "Xodimlar",
             children: [
               {
                 path: "/employee/:employeeId",
                 component: <ManagerEmployeeSingle />,
               },
             ],
           },
           {
             path: "/profile",
             component: <Profile />,
             name: "Profil",
           },
           {
             path: "/clients",
             component: <ManagerClients />,
             name: "Mijozlar",
             children: [
               {
                 path: "/clients/:clintId",
                 component: <ManagerSingleClient />,
               },
             ],
           },
           {
             path: "/products",
             component: <ManagerProducts />,
             name: "Mahsulotlar",
             children: [
               {
                 path: "/products/:productId",
                 component: <ManagerProduct />,
                 name: "Mahsulot",
               },
             ],
           },
           {
             path: "/tasks",
             component: <ManagerTasks />,
             name: "Topshiriqlar",
           },
           {
             path: "/archive",
             component: <ManagerArchive />,
             name: "Arxiv",
           },
         ],
         branch_director: [
           {
             path: "/",
             component: <BranchDirectorProducts />,
             name: "Mahsulotlar",
           },
           {
             path: "/clients",
             component: <BranchDirectorClients />,
             name: "Mijozlar",
           },
           {
             path: "/clients/:clintId",
             component: <BranchDirectorSingleClient />,
             name: "Mijoz",
           },
           {
             path: "/tasks",
             component: <BranchDirectorTasks />,
             name: "Topshiriqlar",
           },
           {
             path: "/employee",
             component: <BranchDirectorEmployees />,
             name: "Xodimlar",
           },
           {
             path: "/profile",
             component: <Profile />,
             name: "Profil",
           },

           {
             path: "/orders",
             component: <BranchDirectorOrders />,
             name: "Buyurtmalar",
           },
         ],
         operator: [
           {
             path: "/",
             component: <OperatorOrders />,
             name: "Buyurtmalar",
           },
           {
             path: "/products",
             component: <OperatorProducts />,
             name: "Mahsulotlar",
           },
           {
             path: "/clients",
             component: <OperatorClients />,
             name: "Mijozlar",
           },
           {
             path: "/drivers",
             component: <OperatorDrivers />,
             name: "Yetkazib beruvchilar",
           },
           {
             path: "/profile",
             component: <Profile />,
             name: "Profil",
           },
         ],
         agent: [
           {
             path: "/",
             component: <AgentTasks />,
             name: "Topshiriqlar",
           },
           {
             path: "/products",
             component: <AgentProducts />,
             name: "Mahsulotlar",
           },
           {
             path: "/clients",
             component: <AgentClients />,
             name: "Mijozlar",
           },
         ],
         supervisor: [
           {
             path: "/",
             component: <SupervisorTasks />,
             name: "Topshiriqlar",
           },
           {
             path: "/products",
             component: <SupervisorProducts />,
             name: "Mahsulotlar",
           },
           {
             path: "/clients",
             component: <SupervisorClients />,
             name: "Mijozlar",
           },
           {
             path: "/clients/:clintId",
             component: <SupervisorSingleClient />,
             name: "Mijoz",
           },
           {
             path: "/agents",
             component: <SupervisorAgents />,
             name: "Agentlar",
           },
           {
             path: "/profile",
             component: <Profile />,
             name: "Profil",
           },
         ],
       };

export const authPages = [
  {
    path: "/login",
    component: <Login />,
  },
];
