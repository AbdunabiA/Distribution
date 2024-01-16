import styles from './cart.module.scss'

const Cart = ({ cart_text, total_amount, r_b_amount }) => {
	if (r_b_amount > 0) return 1
	function isBigNum() {
		if (r_b_amount < 0) return 2
	}
	// console.log(isBigNum())
	return (
		<div className={styles.cart_mini}>
			<h3 className={styles.cart_text}>{cart_text}</h3>
			<div className={styles.b_total}>
				<h1 className={styles.b_total_text}>
					<span>$</span>
					<p>{total_amount}</p>
				</h1>
				<p
					style={isBigNum() == 2 ? { color: 'red' } : { color: 'blue' }}
					className={styles.r_b_text}
				>
					{r_b_amount}%
				</p>
			</div>
		</div>
	)
}

export default Cart