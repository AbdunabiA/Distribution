import { helpers, menus } from 'assets/db'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.scss'
import close from "assets/icons/close.png"
import {GiHamburgerMenu} from 'react-icons/gi';


const Sidebar = () => {
	const [active, setActive] = useState(false)
	const onTouch = () => {
		setActive(e => !e)
		console.log(active);
	}
	return (
		<>
			<button
				onClick={onTouch}
				className={styles.hamburgerMenu}
				>
				<GiHamburgerMenu />
			</button>
			{active ? (
				<div
					className='back-black__cover'
					id='cover'
					// onClick={e => {
					// 	if (e.target.id === 'cover') {
					// 		setSideMenu(false)
					// 	}
					// }}
				></div>
			) : null}
			<div className={`${styles.sidebar}  ${active ? styles.active : ''}`}>
				{/* <div className='logo-wrapper' onClick={() => navigate('/')}>
					<img src={logo} alt='logo' />
				</div> */}
				<div className={styles.sidebar_wrapper}>
					<div className={styles.menus_wrapper}>
						<div className={`${!active && styles.closed}`}>
							<h1>Menu</h1>
							<div
								onClick={() => setActive(false)}
								className={styles.close_icon__wrapper}
							>
								<img src={close} alt='icon' />
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
													isPending
														? styles.pending
														: isActive
														? styles.active
														: ''
												}
											>
												<div>
													<img src={menu.icon} alt='icon' />
												</div>
												<p
													className={`${styles.menu_title}
												 ${!active ? 'active' : ''}`}
												>
													{menu.title}
												</p>
											</NavLink>
										</li>
									)
								})}
							</ul>
						</nav>
					</div>
					<div
						className='helpers-wrapper'
						style={{
							display: 'none',
						}}
					>
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
