import { lazy } from "react";

const AdminHome = lazy(()=>import('pages/admin/home/home'))
const GoogleMap = lazy(()=>import('pages/admin/home/GoogleMaps'))
const Employee = lazy(()=>import("pages/admin/employee"))
const Clients = lazy(() => import('pages/admin/clients'))
const Products = lazy(() => import('pages/admin/products'))
const Branches = lazy(() => import('pages/admin/branches'))
const Statistics = lazy(() => import('pages/admin/statistics'))
const Settings = lazy(() => import('pages/admin/settings'))
const Archive = lazy(() => import('pages/admin/archive'))


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
							component: <Employee />,
						},
						{
							path: '/clients',
							component: <Clients />,
						},
						{
							path: '/products',
							component: <Products />,
						},
						{
							path: '/branches',
							component: <Branches />,
						},
						{
							path: '/statistics',
							component: <Statistics />,
						},
						{
							path: '/settings',
							component: <Settings />,
						},
						{
							path: '/archive',
							component: <Archive />,
						},
					],
				}

export const authPages = [];
