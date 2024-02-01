import BarChart  from 'components/charts/barChart'
import React from 'react'
import { data } from 'assets/db'
const Clients = () => {
	return (
		<div className={"container"}>
			<BarChart data={data} />
		</div>
	)
}

export default Clients