import { GiHamburgerMenu } from 'react-icons/gi'
import styles from './header.module.scss'
const Header = ({ onTouch }) => {
	return (
		<div>
			<button onClick={onTouch} className={styles.hamburgerMenu}>
				<GiHamburgerMenu />
			</button>
		</div>
	)
}

export default Header
