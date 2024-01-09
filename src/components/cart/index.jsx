import { carts } from 'assets/db'
import Cart from 'components/cart'
import styles from "./cart.module.scss"

const Carts = () => {
	return (
		<div className={styles.carts_container}>
			{carts.map((item, i) => (
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
