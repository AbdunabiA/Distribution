import { lazy } from "react";

const AdminHome = lazy(()=>import('pages/admin/home/home'))
const GoogleMap = lazy(()=>import('pages/admin/home/GoogleMaps'))
const Employe = lazy(()=>import("pages/admin/employe"))


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
							path: '/employe',
							component: <Employe />,
						},
					],
				}

export const authPages = [];
