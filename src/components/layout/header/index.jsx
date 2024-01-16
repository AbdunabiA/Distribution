import Carts from 'components/cart/cart'
import styles from "./header.module.scss"
import {GiHamburgerMenu} from 'react-icons/gi'
const Header = ({onTouch}) => {
	
	return (
		<div>
			<button
			 onClick={onTouch}
			 className={styles.hamburgerMenu}
			 >
				<GiHamburgerMenu />
			</button>
			<Carts />
		</div>
	)
}

export default Header
