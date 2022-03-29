import axios from 'axios';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';
import Sound from 'react-native-sound';


export default class Works extends React.Component {

    state = {
        data: [

        ]
    }

    componentDidMount() {
        this.getRadioListById();
    }

    // 更具用户id 获取radio列表
    getRadioListById = async () => {
        console.log(this.props.route.params.uid);
        await axios.get(BASE_URL + "/radio/getRadioListByUid/" + this.props.route.params.uid).then(res => {
            this.setState({
                data: res.data.data
            });
        })
    }

    // 渲染获取作品列表方法
    renderRadioList = () => {
        const { data } = this.state;
        // console.log(data[0].radio);
        console.log(data);
        return data.map((value, index) =>
            <View key={index} style={{
                width: '90%', height: 120, backgroundColor: '#fff', alignSelf: 'center',
                marginTop: 10, padding: 10, borderRadius: 8
            }}>

                <Text>标题：{value.title}</Text>
                <Text>文案：{value.copy}</Text>
                <Text>点赞数：{value.hearts}</Text>
                <Text>作品时长：{value.currentTime}</Text>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>

                    <Button title='播放'
                        buttonStyle={{ width: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                        titleStyle={{ color: '#000' }}
                        onPress={() => {
                            let mp3 = { uri: value.radio };
                            var music = new Sound(mp3, null, (error) => {
                                if (error) {
                                    Alert.alert("播放失败。。。");
                                }
                            });
                            console.log(mp3);
                            music.play();
                        }}
                    />
                    <Button title='暂停' buttonStyle={{ width: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                        titleStyle={{ color: '#000' }}
                        onPress={() => {
                            let mp3 = { uri: value.radio };
                            var music = new Sound(mp3, null, (error) => {
                                if (error) {
                                    Alert.alert("播放失败。。。");
                                }
                            });
                            music.pause();
                        }}
                    />
                    <Button title='重新播放' buttonStyle={{ width: 80, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                        titleStyle={{ color: '#000' }}
                        onPress={() => {
                            let mp3 = { uri: value.radio };
                            var music = new Sound(mp3, null, (error) => {
                                if (error) {
                                    Alert.alert("播放失败。。。");
                                }
                            });
                            music.stop(() => { music.play() })
                        }}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ height: 4000 }}>
                <XLNav title={'作品列表'} />
                <View style={{ height: 2000 }}>
                    {this.renderRadioList()}
                </View>
                <View style={{ height: 2000 }}></View>
            </View>
        );
    }
}