import React from 'react'
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// import { Tooltip, Legend, 	LinearScale, CategoryScale, BarElement, Chart as ChartJS } from 'chart.js'
import {Bar} from 'react-chartjs-2'

// ChartJS.register(
// 	Tooltip, Legend,LinearScale, CategoryScale, BarElement
// )

const data = [
	{name:"2017", react:32, angular:37, vue:20},
	{name:"2018", react:42, angular:78, vue:80},
	{name:"2019", react:51, angular:37, vue:60},
	{name:"2020", react:32, angular:90, vue:60},
	{name:"2021", react:67, angular:30, vue:30},
	{name:"2022", react:132, angular:37, vue:90},
]
const Products = () => {

	// const data = {
	// 	labels:['Mon', 'Tue', 'Wed'],
	// 	databases:[
	// 		{
	// 			labels:'369',
	// 			data:[3, 6, 9],
	// 			backgroundColor:'aqua',
	// 			borderColor:"black",
	// 			borderWidth:1
	// 		}
	// 	]
	// }

	return (
		<>
		 <div style={{marginTop:"100px", marginLeft:'100px'}}>
			{/* <LineChart width={900} height={500} data={data}>
			<Line type='monotone' dataKey='react' stroke='#2196F3' strokeWidth={3}/>
			<Line type='monotone' dataKey='angular' stroke='#F44236' strokeWidth={3}/>
			<Line type='monotone' dataKey='vue' stroke='#FFCA29' strokeWidth={3}/>
			<CartesianGrid stroke='#ccc'/>
			<XAxis dataKey='name'/>
			<YAxis/>
			<Tooltip/>
			<Legend/>
		</LineChart> */}
		</div>
		</>
	)
	
}

export default Products
