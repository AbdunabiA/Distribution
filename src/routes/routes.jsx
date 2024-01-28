import { lazy } from "react";
const AdminHome = lazy(()=>import('pages/admin/home/home'))
const GoogleMap = lazy(()=>import('pages/admin/home/GoogleMaps'))
const AdminEmployee = lazy(()=>import("pages/admin/employee/employee"))
const AdminClients = lazy(() => import('pages/admin/clients'))
const AdminProducts = lazy(() => import('pages/admin/products'))
const AdminBranches = lazy(() => import('pages/admin/branches'))
const AdminStatistics = lazy(() => import('pages/admin/statistics'))
const AdminSettings = lazy(() => import('pages/admin/settings'))
const AdminArchive = lazy(() => import('pages/admin/archive'))
export const pages = {
					admin: [
						{
							path: '/',
							component: <AdminHome />,
						},
						{
							path: '/google-maps',
							component: <GoogleMap />,
						},
						{
							path: '/employee',
							component: <AdminEmployee />,
						},
						{
							path: '/clients',
							component: <AdminClients />,
						},
						{
							path: '/products',
							component: <AdminProducts />,
						},
						{
							path: '/branches',
							component: <AdminBranches />,
						},
						{
							path: '/statistics',
							component: <AdminStatistics />,
						},
						{
							path: '/settings',
							component: <AdminSettings />,
						},
						{
							path: '/archive',
							component: <AdminArchive />,
						},
					],
				}

export const authPages = [];
