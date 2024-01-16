import { Outlet } from "react-router-dom"
import Header from "./header"
import Sidebar from "./sidebar"
import s from './layout.module.scss'
import { useState } from 'react'

const Layout = () => {
  const [active, setActive] = useState(false)
	const onTouch = () => {
		setActive(e => !e)
	}
  return (
    <div className={s.layout}>
      <Sidebar active={active} setActive={setActive} />
      <div className={s.content}>
        <Header onTouch={onTouch}/>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout