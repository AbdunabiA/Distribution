import MainCard from 'components/cards/card'
import styles from './card.module.scss'

const Cards = ({data}) => {
	return (
		<div className={styles.carts_container}>
			{data.map((item, i) => (
				<MainCard
					key={i}
					total_amount={item.total_amount}
					cart_text={item.cart_text}
					Icon={item.icon}
					currency={item.currency}
					onClick={item.onClick}
				/>
			))}
		</div>
	)
}

export default Cards
