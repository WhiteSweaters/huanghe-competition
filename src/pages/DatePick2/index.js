import React, { useState } from 'react'
import { Button, TouchableOpacity, Text, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { SvgXml } from 'react-native-svg'
import dateToString from '../../utils/dateToString';
import { date2 } from '../../assets/svgs';




export default (props) => {
    const [date, setDate] = useState(props.birthday)
    const [open, setOpen] = useState(false)

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)}>

                {/* <TextInput
                    editable={false}
                    placeholder={date.getFullYear() >= 2021 ? "设置预约日期" : dateToString.dateToString(date)}
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: '#ccc',
                        fontSize:20
                    }}
                /> */}
                <SvgXml xml={date2} width={20} height={20}/>

            </TouchableOpacity>
            <DatePicker
                modal
                // mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    props.receiveBirtday(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}