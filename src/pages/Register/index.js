import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { SvgXml } from 'react-native-svg';
import DatePick from '../DatePick';
import Geo from '../../utils/Geo';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import JMessage from '../../utils/JMessage';
import dateToString from '../../utils/dateToString';
import { male, female } from '../../assets/svgs'
import { BASE_URL } from '../../utils/BaseUrl';
import ImagePicker from 'react-native-image-crop-picker';
import { readFile } from 'react-native-fs';



const baseUrl = BASE_URL; //接口地址

@inject("RootStore")
@observer
export default class Register extends React.Component {

    // 构造器
    constructor(props) {
        super(props);
    }
    // 组件状态
    state = {
        gender: 'male',
        openDatePicker: false,
        birthday: new Date(),
        nickname: '',
        street: '',
        motto: '',
        headerImage: ''
    }

    // 父组件向子组件 DatePick提供的回调函数 用于子组件向父组件提供数据birthday
    receiveBirtday = (birthday) => {
        this.setState({ birthday });
    }

    // 昵称输入框内容与react组件进行双向绑定
    handleChangeNickName = (e) => {
        this.setState({ nickname: e });
    }

    // 座右铭输入框内容与react组件进行双向绑定
    handleChangeMotto = (e) => {
        this.setState({ motto: e });
    }


    // 页面初始化完成  自动获取当前位置信息
    async componentDidMount() {
        await Geo.getCurrentStreet().then(res => {
            this.setState({ street: res.regeocode.addressComponent.township });
        })
        console.log(this.props);
    }

    // 上传头像
    uploadHeaderImg = async () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true
        }).then(image => {
            // console.log(image);
            ToastAndroid.show("头像上传成功！",2000)
            readFile(image.path, 'base64').then(res => {
                this.setState({ headerImage: res });
            })
        });
    }

    // 完成注册，将用户信息存入数据库
    registerDone = async () => {
        const { gender, birthday, nickname, street, motto,headerImage } = this.state;
        console.log(birthday);
        // 简单判断用户是否将数据填写完毕
        if (gender === '' || nickname === '' || motto === '') {
            // 提示用户完善个人信息
            ToastAndroid.show('亲，请完善用户信息哦', 2000);
            return;
        }
        await axios.post(baseUrl + '/user/register', {
            telephone: "" + this.props.RootStore.telephone,
            gender: gender,
            birthday: dateToString.dateToString(birthday),
            nickname: nickname,
            street: street,
            motto: motto,
            headerImage:headerImage
        }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
            // 判断是否注册成功
            // 1.若注册失败
            if (!res.data.status) {
                ToastAndroid.show('用户名已存在，请更换', 2000);
                return;
            }
            // 2.注册成功
            // 2.1提示用户登陆成功
            ToastAndroid.show('注册成功！', 2000);
            // 完成极光的注册
            const res2 = this.registerToJG("JGuser" + this.props.RootStore.uid, this.props.RootStore.telephone);
            // 2.2跳转至首页
            this.props.navigation.navigate("TabBar");

        })
    }

    // 进行极光的注册的函数
    registerToJG = async (username, password) => {
        return JMessage.register(username, password);
    }


    render() {
        return (
            <View style={{
                padding: 20
            }}>


                {/* 声明业务  开始 */}
                <View style={{
                    marginTop: 20,
                    fontWeight: '700'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '700'
                    }}>完善个人信息，开始心的旅程</Text>
                </View>
                {/* 声明业务  结束 */}

                {/* 选择性别  开始 */}
                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}>
                    {/* 文字描述  开始 */}
                    <View style={{
                        alignSelf: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20
                        }}>选择您的性别</Text>
                    </View>
                    {/* 文字描述  结束 */}

                    {/* 字体图标  开始 */}
                    <View style={{
                        marginTop: 20,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        {/* 男生  开始 */}
                        <TouchableOpacity
                            onPress={() => { this.setState({ gender: 'male' }) }}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: this.state.gender === 'male' ? 'red' : '#ccc',
                                marginRight: 20,
                            }}>
                            <SvgXml xml={male} width={'80%'} height={'80%'} style={{
                                alignSelf: 'center',
                                marginTop: 5
                            }} />
                        </TouchableOpacity>
                        {/* 男生  结束 */}

                        {/* 女生  开始 */}
                        <TouchableOpacity
                            onPress={() => { this.setState({ gender: 'female' }) }}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: this.state.gender === 'female' ? 'red' : '#ccc'
                            }}>
                            <SvgXml xml={female} width={'80%'} height={'80%'} style={{
                                alignSelf: 'center',
                                marginTop: 5
                            }} />
                        </TouchableOpacity>
                        {/* 女生  结束 */}
                    </View>
                    {/* 字体图标  结束 */}
                </View>
                {/* 选择性别  结束 */}

                {/* 输入昵称  开始 */}
                <View style={{
                    marginBottom: 20
                }}>
                    <TextInput
                        placeholder='输入昵称'
                        onChangeText={e => { this.handleChangeNickName(e) }}
                        value={this.state.nickname}
                        style={{
                            borderBottomWidth: 2,
                            fontSize: 20,
                            borderBottomColor: '#ccc'
                        }}
                    />
                </View>
                {/* 输入昵称  结束 */}

                {/* 出生日期  开始 */}
                <View>
                    <View>
                        <DatePick birthday={this.state.birthday} receiveBirtday={birthday => this.receiveBirtday(birthday)} />
                    </View>
                    <View style={{
                        marginTop: 20
                    }}>


                    </View>
                </View>
                {/* 出生日期  结束 */}

                {/* 调用高德SDK 实现自动获取位置信息的功能  开始 */}
                <View>
                    <TextInput
                        editable={false}
                        placeholder={'自动定位：' + this.state.street}

                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: '#ccc',
                            fontSize: 20
                        }}
                    />
                </View>
                {/* 调用高德SDK 实现自动获取位置信息的功能  结束 */}

                {/* 设置座右铭  开始 */}
                <View style={{
                    marginTop: 20
                }}>
                    <TextInput
                        placeholder='输入您的座右铭'
                        onChangeText={e => { this.handleChangeMotto(e) }}
                        value={this.state.motto}
                        style={{
                            borderBottomWidth: 2,
                            fontSize: 20,
                            borderBottomColor: '#ccc'
                        }}
                    />
                </View>
                {/* 设置座右铭  结束 */}

                {/* 上传头像   开始 */}
                <View style={{
                    marginTop: 20
                }}>
                    <Button
                        title="上传头像"
                        buttonStyle={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: 200,
                            height: 40,
                            borderRadius: 20
                        }}
                        onPress={this.uploadHeaderImg}
                    />
                </View>
                {/* 上传头像   结束 */}
                {/* 完成注册按钮  开始 */}
                <View style={{
                    marginTop: 20
                }}>
                    <Button
                        title="完成注册"
                        buttonStyle={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: 200,
                            height: 40,
                            borderRadius: 20
                        }}
                        onPress={this.registerDone}
                    />
                </View>
                {/* 完成注册按钮  结束 */}
            </View>
        );
    }
}

