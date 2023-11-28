import { Outlet } from "react-router-dom"
import Header from "./header"
import Sidebar from "./sidebar"
import s from './layout.module.scss'

const Layout = () => {
  return (
    <div className={s.layout}>
      <Sidebar />
      <div className={s.content}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout