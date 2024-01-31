import BarChart  from 'components/chart'
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