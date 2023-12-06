import { helpers, menus } from 'assets/db'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.scss'
import close from "assets/icons/close.png"
import { GiHamburgerMenu } from "react-icons/gi"

const Sidebar = () => {
	const [active, setActive] = useState(true)
	return (
		<>
			{!active ? <div className='back-black__cover' id='cover'></div> : null}
			<div className={`sidebar  ${active ? 'active' : ''}`}>
				{/* <div className='logo-wrapper' onClick={() => navigate('/')}>
					<img src={logo} alt='logo' />
				</div> */}
				<div className='sidebar-wrapper'>
					<div className='menus-wrapper'>
						<div className={`${!active && 'closed'}`}>
							<h1>Menu</h1>
							<div
								onClick={() => setActive(e => !e)}
								className='close-icon__wrapper'
							>
								{active ? 
								
								<img src={close} alt='icon' />
								:
								<GiHamburgerMenu />
								 }
							</div>
						</div>
						<nav>
							<ul>
								{menus['admin'].map((menu, i) => {
									return (
										<li key={i}>
											<NavLink
												to={menu.path}
												className={({ isActive, isPending }) =>
													isPending ? 'pending' : isActive ? 'active' : ''
												}
											>
												<div>
													<img src={menu.icon} alt='icon' />
												</div>
												<p className={`menu-title ${!active ? 'active' : ''}`}>
													{menu.title}
												</p>
											</NavLink>
										</li>
									)
								})}
							</ul>
						</nav>
					</div>
					<div className='helpers-wrapper' style={{
						display: "none"
					}}>
						<h1>Yordam</h1>

						<nav>
							<ul>
								{helpers['admin'].map((menu, i) => {
									return (
										<li key={i}>
											<NavLink
												to={menu.path}
												className={({ isActive, isPending }) =>
													isPending ? 'pending' : isActive ? 'active' : ''
												}
											>
												<div>
													<img src={menu.icon} alt='icon' />
												</div>
												<p>{menu.title}</p>
											</NavLink>
										</li>
									)
								})}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar
