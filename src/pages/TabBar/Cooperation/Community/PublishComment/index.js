import React from 'react';
import { Text, View, StyleSheet, Modal, ToastAndroid, ScrollView, Image } from 'react-native';
import XLNav from '../../../XLNav';
import Textarea from 'react-native-textarea';
import { SvgXml } from 'react-native-svg';
import { position } from '../../../../../assets/svgs';
import Geo from '../../../../../utils/Geo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { BASE_URL } from '../../../../../utils/BaseUrl';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { NavigationContext } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';

@inject("RootStore")
@observer
export default class PublishComment extends React.Component {

    static contextType = NavigationContext;

    state = {
        content: '',
        street: '',
        lon: '',//纬度
        lat: '',//经度
        modalVisible: false,
        tempImageList: [], //临时图片数组
        currentTime: new Date(),
        isVisible: false,
        tag: '',//动态主题
    }

    // 话题对应标签
    list = [
        {
            title: '#抑郁',
            onPress: () => {
                this.setState({ tag: '抑郁' });
                this.setState({ isVisible: false })
            },
        },
        {
            title: '#焦虑',
            onPress: () => {
                this.setState({ tag: '焦虑' });
                this.setState({ isVisible: false })
            },
        }, {
            title: '#失眠',
            onPress: () => {
                this.setState({ tag: '失眠' });
                this.setState({ isVisible: false })
            },
        }, {
            title: '#放空',
            onPress: () => {
                this.setState({ tag: '放空' });
                this.setState({ isVisible: false })
            },
        },
        {
            title: '取消',
            onPress: () => { this.setState({ isVisible: false }) },
        },
    ];

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    onChange = e => {
        this.setState({ content: e });
    }

    async componentDidMount() {
        // 获取当前地理位置坐标
        const res = await Geo.getCurrentPosition();
        this.setState({
            lon: res.longitude,
            lat: res.latitude
        });
        this.getCurrentPosition();
    }

    // 拍照选择图片
    selectImages = () => {
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
            if (tempImageList.length >= 9) {
                ToastAndroid.show("图片数量不能超过9张哦", 2000);
                return;
            }
            tempImageList.push(res);
            this.setState({ tempImageList });
        });
    }
    // 相册选择图片
    selectImages2 = () => {
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
            if (tempImageList.length >= 9) {
                ToastAndroid.show("图片数量不能超过9张哦", 2000);
                return;
            }
            tempImageList.push(res);
            this.setState({ tempImageList });
        })

    }

    // 点击获取当前位置
    getCurrentPosition = async () => {
        // 获取当前街道名称
        await Geo.getCurrentStreet().then(res => {
            this.setState({ street: res.regeocode.addressComponent.township });
        });
    }

    submitIdea = async () => {
        const { content, lon, lat, currentTime, tempImageList, tag, street } = this.state;

        await axios.post(BASE_URL + "/community/uploadIdea", {
            content, lon, lat, currentTime, tempImageList, tag, street, uid: this.props.route.params.myId + '',
        }).then(res => {
            console.log(res);
        })
    }


    render() {
        console.log(this.props.route.params.myId);
        const { modalVisible, isVisible } = this.state;
        return (
            <View>
                <XLNav title={"这一刻的想法..."} funcText={"发表"} submitIdea={() => {
                    this.submitIdea();
                    ToastAndroid.show("发布成功", 2000);
                    this.context.goBack();
                }} />
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={this.onChange}
                    defaultValue={this.state.content}
                    maxLength={120}
                    placeholder={'好玩有趣的，大家同乐，伤感忧闷的，大家同哭。。。'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />

                <View>
                    <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f1f1' }}>
                        <SvgXml xml={position} width={20} height={20} />
                        <Text onPress={() => {
                            this.getCurrentPosition()
                        }} style={{ fontSize: 16, fontWeight: '700' }}>当前位置：{this.state.street || "(点击获取)"}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f1f1' }}>
                        <Text onPress={() => {
                            this.setModalVisible(true)
                        }} style={{ fontSize: 16, fontWeight: '700' }}>选择图片</Text>
                    </View>

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

                    {/* 相册  开始 */}
                    <ScrollView horizontal>
                        {this.state.tempImageList.map((value, index) => <Image
                            key={index}
                            source={{ uri: value.assets[0].uri }}
                            style={{ width: 100, height: 100, marginLeft: 10 }}
                        />)}
                    </ScrollView>
                    {/* 相册  结束 */}

                    <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f1f1' }}>
                        <Text onPress={() => {
                            this.setState({ isVisible: true });
                        }} style={{ fontSize: 16, fontWeight: '700' }}>对应话题#{this.state.tag}</Text>
                    </View>

                    <BottomSheet modalProps={{}} isVisible={isVisible}>
                        {this.list.map((l, i) => (
                            <ListItem
                                key={i}
                                containerStyle={l.containerStyle}
                                onPress={l.onPress}
                            >
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </BottomSheet>
                </View>
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
        height: 180,
        padding: 5,
        backgroundColor: '#fff',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});