import axios from 'axios';
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Button } from 'react-native-elements';
import Sound from 'react-native-sound';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';



// 卡片样式
const styles = StyleSheet.create({
    container: {
        height: 600,
        backgroundColor: "#F5FCFF",
        marginTop: 20
    },
    card: {
        flex: 0.9,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        // justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});
export default class Meditation extends React.Component {

    state = {
        cards: [],
        totalPage: 2
    }

    isLoading = false;

    params = {
        currentPage: 1,
        pageSize: 18
    }

    componentDidMount() {
        this.getMeditationList();
    }

    getMeditationList = async () => {
        const { currentPage, pageSize } = this.params;
        const { cards } = this.state;
        this.isLoading = true;
        await axios.get(BASE_URL + "/user/getMeditationList?currentPage=" + currentPage + "&pageSize=" + pageSize).then(res => {
            console.log(res);
            this.setState({
                cards: [...cards, ...res.data.data.pageList],
                totalPage: res.data.data.totalPage
            })
        })
        this.isLoading = false;
    }

    // 卡片滑动完毕事件
    onSwiperedAll = () => {
        const { totalPage } = this.state;
        const { currentPage } = this.params;
        this.params.currentPage++;
        if (currentPage > totalPage || this.isLoading) {
            return;
        }
        this.getMeditationList();
    }

    changeParams = () => {
        this.params.currentPage++;
    }

    render() {
        const { cards } = this.state;
        return (
            <View>
                <XLNav title={"冥想练习"} />
                <View style={styles.container}>
                    {cards.length > 0 ? <Swiper
                        cards={cards}
                        renderCard={(card) => {
                            let mp3 = { uri: card.video + '' };
                            var music = new Sound(mp3, null, (error) => {
                                if (error) {
                                    Alert.alert("播放失败。。。");
                                }
                            });
                            return (
                                <View style={styles.card}>
                                    <View style={{ width: '100%', height: '50%' }} >
                                        {/* 封面   开始*/}
                                        <Image source={{ uri: card.image }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        {/* 封面   结束*/}

                                        {/* 音频介绍  开始 */}
                                        {/* 音频介绍  开始 */}
                                        <View style={{ padding: 20 }}>
                                            {/* 标题 开始 */}
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 20, fontWeight: '700' }}>{card.title}</Text>
                                                {/* <Text>时长:{card}</Text> */}
                                            </View>
                                            {/* 标题 结束 */}
                                            {/* 介绍  开始 */}
                                            <Text>介绍：{card.tag}</Text>
                                            {/* 介绍  结束 */}

                                        </View>
                                        {/* 音频介绍  结束 */}


                                        {/* 音频控件  开始 */}
                                        <View style={{ marginTop: 20, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
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
                                            <Button title='重播' buttonStyle={{ width: 80, backgroundColor: '#fff', borderWidth: 1, borderColor: '#000' }}
                                                titleStyle={{ color: '#000' }}
                                                onPress={() => {
                                                    music.stop(() => { music.play() })
                                                }}
                                            />
                                        </View>
                                        {/* 音频控件  结束 */}
                                    </View>
                                </View>
                            )
                        }}
                        onSwiped={(cardIndex) => { console.log(cardIndex) }}
                        onSwipedAll={() => {
                            this.onSwiperedAll();
                        }}
                        cardIndex={0}
                        backgroundColor={'transparent'}
                        stackSize={6}
                        cardVerticalMargin={0}
                        marginTop={0}
                    >
                    </Swiper> : <></>}
                </View>
            </View>
        );
    }
}