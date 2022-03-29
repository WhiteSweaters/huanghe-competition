import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';


export default class BookStore extends React.Component {

    static contextType = NavigationContext;

    state = {
        data: [],
        name: '好好生活家'
    }

    componentDidMount() {
        this.getBookList()
    }

    // 获取图书信息
    getBookList = async () => {
        const { name } = this.state;
        await axios.get(BASE_URL + "/user/getBookList/" + name).then(res => {
            this.setState({
                data: res.data.data
            })
        })
    }

    render() {
        const { data } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 30, paddingTop: 20 }}>

                    {data.map((value, index) => <TouchableOpacity key={index}
                        style={{
                            width: 100, height: 240,
                            marginRight: 15, marginTop: 10
                        }}
                        onPress={() => {
                            this.context.navigate("Detials", {
                                item: value
                            })
                        }}
                    >
                        <Image source={{ uri: value.image }} style={{ width: '100%', height: 150 }} />
                        <Text>{value.title}</Text>
                    </TouchableOpacity>)}
                </View>

            </View>
        );
    }

}