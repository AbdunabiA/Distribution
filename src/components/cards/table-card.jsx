import styles from './card.module.scss'
import { Card, Col, Row } from 'antd'
import MoneyIcon from "assets/icons/money-icon.png"

const TableCard = ({ cart_text, total_amount, r_b_amount }) => {
	function isBigNum() {
		if (r_b_amount < 0) return 2
	}
	return (
		<div className={styles.cart_mini}>
			<Row gutter={1}>
				<Col span={24} >
					<Card bordered={false}>
						<div className={styles.top_title}>
							<img src={MoneyIcon} />
							<h3 className={styles.cart_text}>{cart_text}</h3>
						</div>
						<div className={styles.b_total}>
							<h1 className={styles.b_total_text}>
								<span>$</span>
								<p>{total_amount}</p>
							</h1>
							<p
								style={isBigNum() == 2 ? { color: 'red' } : { color: 'green' }}
								className={styles.r_b_text}
							>
								{r_b_amount}%
							</p>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default TableCard