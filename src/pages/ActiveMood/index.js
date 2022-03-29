import axios from 'axios';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav4 from '../TabBar/XLNav4';
import Swiper from 'react-native-swiper';
import CardList from 'react-native-deck-swiper';
import Sound from 'react-native-sound';
import { Button } from 'react-native-elements';




// 卡片样式
const styles = StyleSheet.create({
    container: {
        height: 600,
        backgroundColor: "#F5FCFF"
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
export default class ActiveMood extends React.Component {

    state = {
        data: [],
        changePage: 1,
        cards: [1, 2, 3.4, 5, 6]
    }

    componentDidMount() {
        this.activeMoodFirst();
        this.getMeditationList();
    }

    // 获取列表数据
    activeMoodFirst = async () => {
        await axios.get(BASE_URL + "/user/activeMoodFirst").then(res => {
            this.setState({
                data: res.data.data
            })
        })
    }

    // 获取音频列表
    getMeditationList = async () => {
        await axios.get(BASE_URL + "/user/getMeditationList").then(res => {
            this.setState({
                cards: res.data.data
            })
        })
    }

    // 渲染正念知识相关内容
    renderKnowledge = () => {
        const { data } = this.state;
        return <>
            <FlatList
                keyExtractor={Math.random}
                data={data}
                renderItem={({ item }) => <TouchableOpacity style={{
                    width: '100%', height: 150, flexDirection: 'row',
                    marginTop: 30, marginHorizontal: 10, borderBottomColor: '#eee', borderBottomWidth: 1
                }}
                    onPress={() => {
                        this.props.navigation.navigate("QuestionDetails", {
                            item
                        });
                    }}
                >
                    {/* 标题&引言  开始 */}
                    <View style={{ width: 200, height: 120 }}>
                        <Text style={{ fontSize: 18, color: '#000' }}>{item.id}.{item.title}</Text>
                        <Text style={{ marginTop: 10 }}>{item.content}</Text>
                    </View>
                    {/* 标题&引言  结束 */}

                    {/* 对应图片  开始 */}
                    <Image source={{ uri: item.image }} style={{ width: 150, height: 75, marginLeft: 10, marginTop: 10 }} />
                    {/* 对应图片  结束 */}

                </TouchableOpacity>}
            />
        </>
    }

    // 渲染坐姿展示
    renderSittingPosition = () => {
        return <View>
            <Swiper height={640}
                dot={
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,.1)',
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: '#339999',
                            width: 10,
                            height: 4,
                            borderRadius: 2,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
            >

                {/* 端身正坐  开始 */}
                <View>
                    <Image source={require('../../assets/images/duanshen.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />
                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>端身正坐</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>坐在凳子的1/3处，保持头、颈、背部挺直，双脚分开与骨盆同宽，髋关节和膝关节都保持90度弯曲，放松全身。</Text>
                    </View>
                </View>
                {/* 端身正坐  结束 */}

                {/* 散盘  开始 */}
                <View>
                    <Image source={require('../../assets/images/sanpan.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />
                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>散盘</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>双腿向前伸直，弯曲一条腿，将脚放在另一侧大腿下。弯曲另一条腿，将脚放在另一侧大腿下面。闭上双眼，放松全身。如果你感觉坐着不舒服，可以在屁股下面垫-个稍高的垫子，坐在垫子1/3处。</Text>
                    </View>
                </View>
                {/* 散盘  结束 */}

                {/* 单盘  开始 */}
                <View>
                    <Image source={require('../../assets/images/sanpan.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />
                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>单盘</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>弯曲一条腿，将脚放在另一侧大腿内侧。弯曲另一条腿，将脚放在另一侧大腿之上。不要勉强用力,试着让.上面的脚去靠近腹部，调整到感觉舒适的位置。如果你感觉坐着不舒服，可以在屁股下面垫一个稍高的垫子，坐在垫子1/3处。</Text>
                    </View>
                </View>
                {/* 单盘  结束 */}

                {/* 双盘  开始 */}
                <View>
                    <Image source={require('../../assets/images/shuangpan.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />
                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>双盘</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>缓慢弯曲一条腿，将脚放在另-侧大腿上。脚底朝上，脚后跟靠近耻骨。若无不适，弯曲另-条腿，将脚放在对侧大腿.上，双膝都接触地面。此坐法难度最大，但也是最稳固的坐姿。</Text>
                    </View>
                </View>
                {/* 双盘  结束 */}

                {/* 宇宙手印  开始 */}
                <View>
                    <Image source={require('../../assets/images/universe.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />

                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>宇宙手印</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>双手叠成碗状，一只手的手指放置于另一只手的手指之上，与此同时将两手拇指轻轻接触，感觉两手中间兜着一个鸡蛋。这是比较经典的手印，此手印代表把自身能量和大宇宙的能量融合在一起，可以让人很快进入平静的状态。</Text>
                    </View>
                </View>
                {/* 宇宙手印  结束 */}

                {/* 菩萨手印  开始 */}
                <View>
                    <Image source={require('../../assets/images/pusa.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />

                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>菩萨手印</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>将双手放在膝盖上，掌心向上。这种方式象征着接纳。是比较古典的手印，可以平和、稳定精神。</Text>
                    </View>
                </View>
                {/* 菩萨手印  结束 */}

                {/* 秦手印  开始 */}
                <View>
                    <Image source={require('../../assets/images/qin.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />

                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>秦手印</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>将双手放在膝盖.上，掌心向下。这种手势意味着不要再去追求他物，而是转向体悟当下。</Text>
                    </View>
                </View>
                {/* 秦手印  结束 */}

                {/* 背部  开始 */}
                <View>
                    <Image source={require('../../assets/images/beibu.png')}
                        style={{
                            marginTop: 20,
                            width: '80%',
                            height: 300,
                            borderRadius: 8,
                            alignSelf: 'center'
                        }}
                    />

                    <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                        <Text style={{ fontSize: 32, color: '#000' }}>背部</Text>
                        <Text style={{ marginTop: 20, fontWeight: '700', lineHeight: 30 }}>背一定要是直的，但不要挺胸，体会中正的状态。下巴轻微向后收，感觉到脊椎与颈椎成为一条直线。但如果刻意地挺直背部，背脊变得僵硬，也会导致在冥想时感觉到疼痛。初学者可以找一一个垫子垫在臀部的后半部分，可以起到辅助的作用，感觉到自己的头顶在被向.上拉，坐骨向下沉，达到脊椎轻松的完全拉伸的状态。</Text>
                    </View>
                </View>
                {/* 背部  结束 */}

            </Swiper>
        </View>
    }

    // 开始冥想
    renderMeditation = () => {
        const { cards } = this.state;

        return <View style={styles.container}>
            {cards ? <CardList
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
                onSwipedAll={() => { console.log('onSwipedAll') }}
                cardIndex={0}
                backgroundColor={'transparent'}
                stackSize={6}
                cardVerticalMargin={0}
                marginTop={0}
            >
            </CardList> : <></>}
        </View>
    }

    render() {
        const { changePage } = this.state;
        return (
            <View>
                <XLNav4 />

                {/* 主体  开始 */}
                <ScrollView>
                    {/* 顶部导航栏  开始 */}
                    <View style={{
                        width: '100%', height: 50, alignItems: 'center',
                        flexDirection: 'row', borderBottomColor: '#ddd'
                    }}>
                        {/* 正念知识  开始 */}
                        <TouchableOpacity style={{
                            width: 50, height: 30, borderWidth: 1, borderColor: '#339999',
                            justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginLeft: 10,
                            backgroundColor: changePage === 1 ? '#339999' : 'transparent'
                        }}
                            onPress={() => {
                                this.setState({
                                    changePage: 1
                                })
                            }}
                        >
                            <Text style={{ color: changePage === 1 ? '#fff' : '#339999', fontSize: 12 }}>正念知识</Text>
                        </TouchableOpacity>
                        {/* 正念知识  结束 */}

                        {/* 坐姿  开始 */}
                        <TouchableOpacity style={{
                            width: 50, height: 30, borderWidth: 1, borderColor: '#339999',
                            justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginLeft: 10,
                            backgroundColor: changePage === 2 ? '#339999' : 'transparent'

                        }}
                            onPress={() => {
                                this.setState({
                                    changePage: 2
                                })
                            }}
                        >
                            <Text style={{ color: changePage === 2 ? '#fff' : '#339999', fontSize: 12 }}>坐姿</Text>
                        </TouchableOpacity>
                        {/* 坐姿  结束 */}

                        {/* 开始冥想  开始 */}
                        <TouchableOpacity style={{
                            width: 50, height: 30, borderWidth: 1, borderColor: '#339999',
                            justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginLeft: 10,
                            backgroundColor: changePage === 3 ? '#339999' : 'transparent'
                        }}
                            onPress={() => {
                                this.setState({
                                    changePage: 3
                                })
                            }}
                        >
                            <Text style={{ color: changePage === 3 ? '#fff' : '#339999', fontSize: 12 }}>开始冥想</Text>
                        </TouchableOpacity>
                        {/* 开始冥想  结束 */}
                    </View>
                    {/* 顶部导航栏  结束 */}

                    {/* 正念知识 || 坐姿 || 开始冥想 */}
                    {changePage === 1 ? this.renderKnowledge() : changePage === 2 ? this.renderSittingPosition() : this.renderMeditation()}

                </ScrollView>
                {/* 主体  结束 */}
            </View>
        );
    }
}