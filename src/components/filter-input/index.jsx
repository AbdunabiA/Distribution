import { DatePicker, Select, Space, TimePicker } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'
import style from './filterInput.module.scss'
const { Option } = Select
const PickerWithType = ({ type, onChange, value }) => {
	if (type === 'time') return <TimePicker {...{ onChange, value }} />;
	if (type === 'date') return <DatePicker {...{onChange, value}}/>
	return <DatePicker picker={type} {...{ onChange, value }} />;
}


const FilterInput = ({ onChange, value }) => {

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
			<Space direction='horizontal' size={17}>
				<div className={style.date_inputs}>
					<Select value={type} onChange={setType}>
						<Option value='date'>Date</Option>
						<Option value='week'>Week</Option>
						<Option value='month'>Month</Option>
						<Option value='year'>Year</Option>
					</Select>
					<PickerWithType type={type} {...{ onChange, value }} />
				</div>
				<br className={style.liner} />
				<div className={style.pcversion}>
					<RangePicker presets={rangePresets} {...{ onChange, value }} />
				</div>
			</Space>
			<div className={style.mobileversion}>
				<RangePicker
					presets={rangePresets}
					{...{ onChange, value }}
				/>
			</div>
		</div>
	)
}

export default FilterInput
