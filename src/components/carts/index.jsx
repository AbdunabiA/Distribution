import { cart_data } from 'assets/db.js'
import Cart from 'components/carts/cart'
import styles from './cart.module.scss'
const Carts = () => {
	return (
		<div className={styles.carts_container}>
			{cart_data.map((item, i) => (
				<Cart
					key={i}
					total_amount={item.total_amount}
					r_b_amount={item.r_b_amount}
					cart_text={item.cart_text}
				/>
			))}
		</div>
	)
}

export default Carts
