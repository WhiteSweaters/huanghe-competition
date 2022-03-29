import React, { useState } from 'react'
import { Button, TouchableOpacity, Text, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
import dateToString from '../../utils/dateToString'




export default (props) => {
    const [date, setDate] = useState(props.birthday)
    const [open, setOpen] = useState(false)

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)}>

                <TextInput
                    editable={false}
                    placeholder={date.getFullYear() >= 2021 ? "设置生日" : dateToString.dateToString(date)}
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: '#ccc',
                        fontSize:20
                    }}
                />

            </TouchableOpacity>
            <DatePicker
                modal
                mode='date'
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