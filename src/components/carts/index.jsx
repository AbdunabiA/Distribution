import { cart_data } from 'assets/db.js'
import Cart from 'components/carts/cart'
import styles from './cart.module.scss'
import { DatePicker, Space } from 'antd'
import { useState } from 'react'

const Carts = () => {
	const { RangePicker } = DatePicker
	const [dateValue, setDateValue] = useState("")
	const onChange = (value) => {
		setDateValue(value)
		console.log(dateValue);
	}

	const onOk = (value) => {
		console.log(value);
	}
	return (
		<>
			<Space direction='vertical' size={12} style={{marginLeft:"15px"}}>
				<DatePicker showTime onChange={onChange} onOk={onOk} />
				<RangePicker
					showTime={{
						format: 'HH:mm',
					}}
					format='YYYY-MM-DD HH:mm'
					onChange={onChange}
					onOk={onOk}
				/>
			</Space>
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
		</>
	)
}

export default Carts
