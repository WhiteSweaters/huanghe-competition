import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Image, ToastAndroid, ImageBackground, StatusBar, StyleSheet } from 'react-native';
import dateToString from '../../utils/dateToString';
import Geo from '../../utils/Geo';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import { bengbuzhu, buan, chongshi, deyi, fennu, ganga, gudu, jinxi, kaixin, liulei, nuanxin, shangxin, tianmi, wuliao, zhenghan } from '../../assets/svgs';
import { Button } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Textarea from 'react-native-textarea/src/Textarea';
import { BASE_URL } from '../../utils/BaseUrl';
import { inject, observer } from 'mobx-react';


// 定义心情数据
const moodData = [
    {
        id: 1,
        mood: '不安',
        svg: buan,
        tag: '消极',
    },
    {
        id: 2,
        mood: '充实',
        svg: chongshi,
        tag: '积极',
    },
    {
        id: 3,
        mood: '得意',
        svg: deyi,
        tag: '积极'
    },
    {
        id: 4,
        mood: '愤怒',
        svg: fennu,
        tag: '消极'
    },
    {
        id: 5,
        mood: '尴尬',
        svg: ganga,
        tag: '消极'
    },
    {
        id: 6,
        mood: '孤独',
        svg: gudu,
        tag: '消极'
    },
    {
        id: 7,
        mood: '惊喜',
        svg: jinxi,
        tag: '积极'
    },
    {
        id: 8,
        mood: '开心',
        svg: kaixin,
        tag: '积极'
    },
    {
        id: 9,
        mood: '绷不住',
        svg: bengbuzhu,
        tag: '消极'
    },
    {
        id: 10,
        mood: '流泪',
        svg: liulei,
        tag: '消极'
    },
    {
        id: 11,
        mood: '暖心',
        svg: nuanxin,
        tag: '积极'
    },
    {
        id: 12,
        mood: '伤心',
        svg: shangxin,
        tag: '消极'
    },
    {
        id: 13,
        mood: '甜蜜',
        svg: tianmi,
        tag: '积极'
    },
    {
        id: 14,
        mood: '无聊',
        svg: wuliao,
        tag: '消极'
    },
    {
        id: 15,
        mood: '震撼',
        svg: zhenghan,
        tag: '积极'
    }
];
@inject("RootStore")
@observer
export default class Diary extends React.Component {

    state = {
        currentDate: dateToString.dateToString(new Date()),
        weather: '',
        mood: '',
        renderId: 1,
        modalVisible: false,
        tempImageList: [],
        title: '',
        content: '',
        tag: ''
    }

    componentDidMount() {
        this.getCurrentCity();
    }

    // 获取当前城市
    getCurrentCity = async () => {
        const res = await Geo.getCurrentStreet();
        let city = res.regeocode.addressComponent.city.replace("市", "");
        this.getCurrentWeather(city);
    }

    // 获取当前天气
    getCurrentWeather = async (city) => {
        await axios.get("http://apis.juhe.cn/simpleWeather/query?key=8dab9c8e3fca2481efe36cbbe4446224&city=" + city).then(res => {
            let weather = res.data.result.realtime.info + "/" + res.data.result.realtime.temperature + "℃";
            this.setState({
                weather
            })
        })
    }

    // 拍照选择图片
    selectImages = () => {
        this.setState({
            modalVisible: false
        })
        const options = {
            title: 'Select Avatar',
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        launchCamera(options, res => {
            const { tempImageList } = this.state;
            if (tempImageList.length >= 1) {
                ToastAndroid.show("图片数量不能超过1张哦", 2000);
                return;
            }
            tempImageList.push(res);
            this.setState({ tempImageList });
        });
    }

    // 相册选择图片
    selectImages2 = () => {
        this.setState({
            modalVisible: false
        })
        const options = {
            title: 'Select Avatar',
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        launchImageLibrary(options, res => {
            const { tempImageList } = this.state;
            if (tempImageList.length >= 1) {
                ToastAndroid.show("图片数量不能超过1张哦", 2000);
                return;
            }
            tempImageList.push(res);
            this.setState({ tempImageList });
        })

    }

    // 显示/隐藏Modal
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    // 标题与React组件双向绑定
    onChangeTitle = (e) => {
        this.setState({
            title: e
        })
    }

    // 内容与React组件双向绑定
    onChangeContent = (e) => {
        this.setState({
            content: e
        })
    }

    // 提交用户日记
    onSubmit = async () => {
        const { currentDate, weather, title, content, tag, tempImageList, mood } = this.state;
        // 校验用户是否填写信息完毕
        if (mood === '') {
            ToastAndroid.show("您还未选择心情状态", 2000);
            return;
        }

        if (title === '') {
            ToastAndroid.show("您还没有为您的日记命名呢", 2000);
            return;
        }

        if (tempImageList.length === 0) {
            ToastAndroid.show("请上传日记图片", 2000);
            return;
        }

        if (content === '') {
            ToastAndroid.show("请完善日记内容", 2000);
            return;
        }

        let params = {
            date: currentDate,
            weather: weather,
            title: title,
            content: content,
            tag: tag,
            tempImageList: tempImageList,
            mood: mood,
            uid: this.props.RootStore.uid + ''
        }


        await axios.post(BASE_URL + "/user/commitDiary", params, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
            if (!res.status) {
                ToastAndroid.show(res.data.errMsg, 2000);
                return;
            }
            ToastAndroid.show(res.data.errMsg, 2000);
            this.props.navigation.goBack();
            this.props.route.params.refresh();
        });

    }

    // 渲染记录心情页面
    renderRecordMood = () => {
        const { currentDate, weather, mood } = this.state;
        return <View style={{ marginTop: 40 }}>
            {/* 问候语  开始 */}
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <View>
                    <Text style={{ fontSize: 20 }}>hey，今天过得怎么样?</Text>
                    <Text style={{ fontSize: 12, marginTop: 5 }}>{currentDate}</Text>
                </View>
                {/* 当天天气  开始 */}
                <View style={{ marginLeft: 60, marginTop: 39 }}>
                    <Text>{weather}</Text>
                </View>
                {/* 当天天气  结束 */}

            </View>
            {/* 问候语  结束 */}

            {/* 记录心情  开始 */}
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                {moodData.map((value, index) => <TouchableOpacity key={index} style={{
                    width: 100, height: 100, borderRadius: 8,
                    backgroundColor: mood === value.mood ? '#fdb553' : '#faf2e7', margin: 10, marginTop: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={() => {
                        this.setState({
                            mood: value.mood,
                            tag: value.tag
                        })
                    }}
                >
                    <SvgXml xml={value.svg} width={80} height={80} />
                </TouchableOpacity>)}
            </View>
            {/* 记录心情  结束 */}

            {/* 切换到写日记页面  开始 */}
            <View>
                <Button
                    title={"记录心情"}
                    buttonStyle={{
                        width: 200, height: 40, alignSelf: 'center',
                        marginTop: 10, backgroundColor: '#fdb553',
                        borderRadius: 20
                    }}
                    onPress={() => {
                        this.setState({
                            renderId: 2
                        })
                    }}
                />
            </View>
            {/* 切换到写日记页面  结束 */}
        </View>
    }

    // 渲染起标题及插图页面
    renderTitleAndImage = () => {
        const { modalVisible, tempImageList, title } = this.state;

        return <View style={{ padding: 20, marginTop: 40 }}>

            {/* 日记标题  开始 */}
            <View>
                <Text style={{ color: '#917a67' }}>为今天的体验起个名字吧~</Text>
            </View>

            <View style={{
                width: 350, height: 100, backgroundColor: '#faf2e7',
                borderRadius: 8, marginTop: 50, justifyContent: 'center'
            }}>
                <TextInput
                    placeholder='为今天的体验起个名字吧~'
                    value={title}
                    onChangeText={this.onChangeTitle}
                />
            </View>
            {/* 日记标题  结束 */}

            {/* 日记图片  开始 */}
            <View style={{ marginTop: 50 }}>
                {/* 记录美好时刻  开始 */}
                <Text style={{ color: '#917a67' }}>记录美好时刻</Text>
                {/* 记录美好时刻  结束 */}

                {/* 相册  开始 */}
                <ScrollView horizontal>
                    {tempImageList.map((value, index) => <Image
                        key={index}
                        source={{ uri: value.assets[0].uri }}
                        style={{ width: 100, height: 100, marginRight: 10, marginTop: 20 }}
                    />)}
                    <TouchableOpacity style={{
                        width: 100, height: 100, backgroundColor: '#eee',
                        justifyContent: 'center', alignItems: 'center', marginTop: 20
                    }}
                        onPress={() => {
                            this.setModalVisible(true)
                        }}
                    >
                        <Text style={{ fontSize: 32 }}>+</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* 相册  结束 */}

            </View>
            {/* 日记图片  结束 */}

            {/* 开始正文  开始 */}
            <View style={{ alignItems: 'center' }}>
                <Button
                    title={"开始"}
                    buttonStyle={{
                        marginTop: 300,
                        width: 200,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#fdb553'
                    }}
                    onPress={() => {
                        this.setState({
                            renderId: 3
                        })
                    }}
                />
            </View>
            {/* 开始正文  结束 */}

            {/* 选择投放照片的形式  开始 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                }}
            >
                <View style={{ width: 300, height: 200, backgroundColor: '#fff', alignSelf: 'center', marginTop: '50%' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 32, fontWeight: '700' }}>选择图片</Text>
                    <Text onPress={() => {
                        this.selectImages();
                    }} style={{ alignSelf: 'center', fontSize: 20, fontWeight: '700', marginTop: 20 }}>拍照</Text>
                    <Text onPress={this.selectImages2} style={{ alignSelf: 'center', fontSize: 20, fontWeight: '700', marginTop: 20 }}>从相册中选择</Text>
                    <Text onPress={() => {
                        this.setModalVisible(!modalVisible);
                    }} style={{ alignSelf: 'center', fontSize: 20, fontWeight: '700', marginTop: 20 }}>取消</Text>
                </View>
            </Modal>
            {/* 选择投放照片的形式  结束 */}
        </View>
    }

    // 渲染正文内容
    renderContent = () => {
        const { currentDate, weather, content, title } = this.state;
        return <ImageBackground
            source={require('../../assets/images/diary.jpg')}
            style={{
                width: '100%', height: '100%', justifyContent: 'center',
                alignItems: 'center', position: 'relative'
            }}
        >
            <TouchableOpacity style={{ position: 'absolute', top: 40, right: 20, }}
                onPress={() => {
                    this.onSubmit();
                }}
            >
                {/* 完成  开始 */}
                <Text style={{ fontSize: 18, color: '#ff8988' }}>完成</Text>
                {/* 完成  结束 */}
            </TouchableOpacity>

            <View style={{ width: '90%', height: 700, backgroundColor: '#fff', borderRadius: 8 }}>

                {/* 时间  开始 */}
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#af978d' }}>{currentDate} | {weather}</Text>
                    <Text style={{ color: '#af978d' }}>{dateToString.weekDay(currentDate)}</Text>
                </View>
                {/* 时间  结束 */}

                {/* 日记标题  开始 */}
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ color: '#af978d' }}>标题：{title}</Text>
                </View>
                {/* 日记标题  结束 */}

                {/* 用户输入日记内容  开始 */}
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={this.onChangeContent}
                    defaultValue={content}
                    maxLength={1000}
                    placeholder={'开始输入...'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
                {/* 用户输入日记内容  结束 */}
            </View>
        </ImageBackground>
    }


    render() {

        const { renderId } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor={'transparent'} translucent={true} />
                {renderId === 1 ? this.renderRecordMood() : renderId === 2 ? this.renderTitleAndImage() : this.renderContent()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 580,
        padding: 20,
        backgroundColor: '#fff',

    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#af978d',
    },
});