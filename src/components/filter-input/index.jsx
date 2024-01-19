import { DatePicker, Space } from 'antd'
import React, { useState } from 'react'
import style from "./filterInput.module.scss"

const FilterInput = () => {
		const { RangePicker } = DatePicker
		const [dateValue, setDateValue] = useState('')
		const onChange = value => {
			setDateValue(value)
			console.log(dateValue)
		}

		const onOk = value => {
			console.log(value)
		}
	return (
		<div className={style.container}>
			<Space direction='horizontal' size={17} style={{ marginLeft: '15px' }}>
				<div className={style.date_inputs}>
					<DatePicker style={{ width: '100%' }} onChange={onChange} />
					<DatePicker
						style={{ width: '100%' }}
						onChange={onChange}
						picker='week'
					/>
					<DatePicker
						style={{ width: '100%' }}
						onChange={onChange}
						picker='month'
					/>
					<DatePicker
						style={{ width: '100%' }}
						onChange={onChange}
						picker='year'
					/>
				</div>
				<RangePicker
					style={{ width: '100%' }}
					format='YYYY-MM-DD'
					onChange={onChange}
					onOk={onOk}
				/>
			</Space>
		</div>
	)
}

export default FilterInput