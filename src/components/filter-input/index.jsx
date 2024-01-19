import { DatePicker, Select, Space, TimePicker } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'
import style from './filterInput.module.scss'
const { Option } = Select
const PickerWithType = ({ type, onChange }) => {
	if (type === 'time') return <TimePicker onChange={onChange} />
	if (type === 'date') return <DatePicker onChange={onChange} />
	return <DatePicker picker={type} onChange={onChange} />
}


const FilterInput = ({ onChange }) => {

	const { RangePicker } = DatePicker
	const [type, setType] = useState('Date')
	const rangePresets = [
		{
			label: 'Last 7 Days',
			value: [dayjs().add(-7, 'd'), dayjs()],
		},
		{
			label: 'Last 14 Days',
			value: [dayjs().add(-14, 'd'), dayjs()],
		},
		{
			label: 'Last 30 Days',
			value: [dayjs().add(-30, 'd'), dayjs()],
		},
		{
			label: 'Last 90 Days',
			value: [dayjs().add(-90, 'd'), dayjs()],
		},
	]

	const onOk = value => {
		console.log(value)
	}
	return (
		<div className={style.container}>
			<Space direction='horizontal' size={17} style={{ marginLeft: '15px' }}>
				<div className={style.date_inputs}>
					<Select value={type} onChange={setType}>
						<Option value='date'>Date</Option>
						<Option value='week'>Week</Option>
						<Option value='month'>Month</Option>
						<Option value='year'>Year</Option>
					</Select>
					<PickerWithType type={type} onChange={onChange} />
				</div>
				<RangePicker presets={rangePresets} onChange={onChange} />

				{/* <RangePicker
					style={{ width: '100%' }}
					format='YYYY-MM-DD'
					onChange={onChange}
					onOk={onOk}
				/> */}
			</Space>
		</div>
	)
}

export default FilterInput
