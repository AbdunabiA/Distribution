import { lazy } from "react";

const AdminHome = lazy(()=>import('pages/admin/home/home'))
const GoogleMap = lazy(()=>import('pages/admin/home/GoogleMaps'))


export const pages = {
    admin:[
        {
            path:'/',
            component: <AdminHome/>,
        },
        {
            path:"/google-maps",
            component: <GoogleMap/>,
        }
    ]
}

export const authPages = [];
