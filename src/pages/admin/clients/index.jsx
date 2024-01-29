import BarChart  from 'components/chart'
import React from 'react'
import s from './clients.module.scss'
const Clients = () => {
	return (
		<div className={s.clientContainer}>
			<BarChart />
		</div>
	)
}

export default Clients