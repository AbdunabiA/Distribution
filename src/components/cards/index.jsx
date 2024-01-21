import { cart_data } from 'assets/db.js'
import MainCard from 'components/cards/card'
import styles from './card.module.scss'

const Cards = () => {
	return (
		<div className={styles.carts_container}>
			{cart_data.map((item, i) => (
				<MainCard
					key={i}
					total_amount={item.total_amount}
					r_b_amount={item.r_b_amount}
					cart_text={item.cart_text}
					icon={item.icon}
				/>
			))}
		</div>
	)
}

export default Cards
