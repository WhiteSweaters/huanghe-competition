import React from 'react';
import { ImageBackground, Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import XLNav from '../XLNav';
import Swiper from "react-native-deck-swiper";
import axios from 'axios';
import { BASE_URL } from '../../../utils/BaseUrl';
import Sound from 'react-native-sound';
import { SvgXml } from 'react-native-svg';
import { heart, heartBroken } from '../../../assets/svgs';

// 卡片样式
const styles = StyleSheet.create({
    card: {
        flex: 0.8,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});

export default class Radio extends React.Component {

    params = {
        currentPage: 1,
        pageSize: 10
    }

    state = {
        volume: 0.5,  //默认音量
        seconds: 0, //秒数
        totalMin: '', //总分钟
        totalSec: '', //总分钟秒数
        nowMin: 0, //当前分钟
        nowSec: 0, //当前秒钟
        maximumValue: 0, //滑块最大值
        cards: [
        ],
        hearts: 0
    }

    componentDidMount() {
        this.getCards();
    }



    // 发送请求到后台，获取卡片数据
    getCards = async () => {
        const res = await axios.get(BASE_URL + "/radio/showCardList?currentPage=" + this.params.currentPage + "&pageSize=" + this.params.pageSize);
        this.setState({ cards: res.data.data });
    }

    // 点赞功能
    pointToShowLove = async (id) => {
        // 点赞数 + 1
        await axios.get(BASE_URL + '/radio/pointToShowLove/' + id);
    }

    render() {
        const { cards, hearts } = this.state;
        let haha = hearts;
        return (
            <View style={{ flex: 1 }}>
                <XLNav title={"心灵驿站"} />
                <ImageBackground
                    source={require('../../../assets/images/scrowImage.jpg')}
                    style={{ height: '60%' }}
                    imageStyle={{ height: '100%' }}
                >
                    {cards ? <Swiper
                        cards={cards}
                        renderCard={(card) => {
                            // 记录点赞数据

                            // 关闭上一首歌曲
                            let mp3 = { uri: card ? card.radio : '' };
                            var music = new Sound(mp3, null, (error) => {
                                if (error) {
                                    Alert.alert("播放失败。。。");
                                }
                            });
                            return (
                                <View style={styles.card}>
                                    <TouchableOpacity style={{ width: '100%', height: '50%' }} onPress={() => {
                                        this.props.navigation.navigate('Others', {
                                            uid: card ? card.uid : '',
                                        });
                                    }}>
                                        {/* 封面   开始*/}
                                        <Image source={{ uri: card ? card.cover : '' }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        {/* 封面   结束*/}
                                    </TouchableOpacity>

                                    {/* 音频介绍  开始 */}
                                    <View style={{ padding: 20 }}>
                                        {/* 标题 开始 */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 20, fontWeight: '700' }}>{card ? card.title : ''}</Text>
                                            <Text>时长:{card ? card.currentTime + 's' : ''}</Text>
                                        </View>
                                        {/* 标题 结束 */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* 作者 开始 */}
                                            <Text>作者：{card ? card.nickname : ''}</Text>
                                            {/* 作者 结束 */}
                                            {/* 文案  开始 */}
                                            <Text>{card ? card.copy : ''}</Text>
                                            {/* 文案  结束 */}
                                        </View>
                                    </View>
                                    {/* 音频介绍  结束 */}

                                    {/* 音频控件  开始 */}
                                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                        <Button title='播放'
                                            buttonStyle={{ width: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                                            titleStyle={{ color: '#000' }}
                                            onPress={() => {
                                                music.play();
                                            }}
                                        />
                                        <Button title='暂停' buttonStyle={{ width: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                                            titleStyle={{ color: '#000' }}
                                            onPress={() => {
                                                music.pause();
                                            }}
                                        />
                                        <Button title='重新播放' buttonStyle={{ width: 80, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                                            titleStyle={{ color: '#000' }}
                                            onPress={() => {
                                                music.stop(() => { music.play() })
                                            }}
                                        />
                                    </View>
                                    {/* 音频控件  结束 */}

                                    {/* 点赞功能  开始 */}
                                    <View style={{ marginTop: 20, paddingHorizontal: 60, justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // 开始点赞功能
                                                this.pointToShowLove(card.id);
                                                ToastAndroid.show("点赞成功", 2000);
                                                haha++;
                                                console.log(haha);
                                            }}
                                            style={{
                                                width: 60, height: 60, borderRadius: 30,
                                                backgroundColor: '#eee',
                                                alignItems: 'center', justifyContent: 'center'
                                            }}
                                        >
                                            <SvgXml xml={heart} width={'80%'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                ToastAndroid.show('我们会减少向您推送此类内容', 2000);
                                            }}
                                            style={{
                                                width: 60, height: 60, borderRadius: 30,
                                                backgroundColor: '#eee',
                                                alignItems: 'center', justifyContent: 'center'
                                            }}
                                        >
                                            <SvgXml xml={heartBroken} width={'80%'} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* 点赞功能  结束 */}

                                    {/* 点赞数量  开始 //TODO*/}
                                    <View style={{ marginTop: 20, alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: '700', fontSize: 20 }}>点赞数：{card ? card.hearts + haha : 0}</Text>
                                    </View>
                                    {/* 点赞数量  结束 */}
                                </View>
                            )
                        }}
                        onSwiped={(cardIndex) => { console.log(cardIndex) }}
                        onSwipedAll={() => { console.log('onSwipedAll') }}
                        cardIndex={0}
                        backgroundColor={'transparent'}
                        marginTop={0}
                        stackSize={6}
                        cardVerticalMargin={0}
                    >

                    </Swiper>
                        : <></>}

                </ImageBackground>
                <View style={{ marginTop: 180, alignItems: 'center' }}>
                    <Button onPress={() => { this.props.navigation.navigate("Recording") }} title={"分享你的故事"} buttonStyle={{ width: 120, height: 40, borderRadius: 20, backgroundColor: '#5bceae' }} />
                </View>
            </View>
        )
    }
}
