import { menus } from 'assets/db'
import close from 'assets/icons/close.png'
import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.scss'
const Sidebar = ({ active, setActive }) => {
	return (
		<>
			{active ? (
				<div
					className={styles.back_black__cover}
					id='cover'
					onClick={e => {
						if (e.target.id === 'cover') {
							setActive(false)
						}
					}}
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
										<li onClick={() => setActive(false)} key={i}>
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
				</div>
			</div>
		</>
	)
}

export default Sidebar
