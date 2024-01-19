import { cart_data } from 'assets/db.js'
import TableCard from 'components/cards/table-card'
import styles from './card.module.scss'

const Cards = () => {
	return (
		<div className={styles.carts_container}>
			{cart_data.map((item, i) => (
				<TableCard
					key={i}
					total_amount={item.total_amount}
					r_b_amount={item.r_b_amount}
					cart_text={item.cart_text}
				/>
			))}
		</div>
	)
}

export default Cards
