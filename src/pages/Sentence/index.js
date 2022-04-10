import axios from 'axios';
import React from 'react';
import { StatusBar, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { BASE_URL } from '../../utils/BaseUrl'


export default class Sentence extends React.Component {

    state = {
        data: [
            {
                id: 1,
                content: "haha\\nhaha",
                image: "http://whitesweater.info/FtJq4sWx3FPrh_UUdeuO6u8ULW94",
                author: '佚名'
            }
        ]
    }

    componentDidMount() {
        this.getSentence();
    }


    // 从数据库中获取十个句子
    getSentence = async () => {
        await axios.get(BASE_URL + "/user/getSentence").then(res => {
            this.setState({
                data: res.data.data
            })
        })
    }

    render() {
        const { data } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <StatusBar backgroundColor={'transparent'} translucent={true} />
                <Swiper
                    horizontal={false}
                    activeDot={<View style={{ display: 'none' }}></View>}
                    dot={
                        <View style={{ backgroundColor: 'transparent' }}>
                        </View>}>
                    {data.map((value, index) => <View key={index} style={{ backgroundColor: '#333', height: '100%' }}>
                        <Image source={{ uri: value.image }} style={{ width: '100%', height: 300 }}></Image>
                        <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', lineHeight: 50, color: '#fff' }}>{value.content.replace(/\\n/g, '\n')}</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 16, textAlign: 'center', color: '#fff' }}>{value.author}</Text>
                    </View>)}
                </Swiper>
            </View>
        );
    }
}