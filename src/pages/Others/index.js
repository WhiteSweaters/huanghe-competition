import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import { femaleIcon, maleIcon, motto, position, rightArrow, works, zoon } from '../../assets/svgs';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';


@inject("RootStore")
@observer
export default class Others extends React.Component {

    state = {
        bgImg: '',//用户头像
        nickname: '',//用户昵称
        age: '',//用户年龄
        registerPosition: '',//用户注册时的位置
        gender: '',//用户性别
        currentPosition: '',
        motto: '',
        myHeadImg: ''   //我的头像
    }

    componentDidMount() {
        this.getUserInfo();
        this.getHeadImg();
    }

    // 向后台发送请求 获取用户基本信息
    getUserInfo = async () => {
        await axios.get(BASE_URL + "/user/getUserById/" + this.props.route.params.uid).then(res => {
            this.setState({
                bgImg: res.data.data.headerImage,
                nickname: res.data.data.nickname,
                gender: res.data.data.gender,
                age: res.data.data.age,
                motto: res.data.data.motto,
                registerPosition: res.data.data.street
            });
        })
    }

    // 获取我的头像
    getHeadImg = async () => {
        await axios.get(BASE_URL + "/user/getUserById/" + this.props.RootStore.uid).then(res => {
            this.setState({
                myHeadImg: res.data.data.headerImage
            });
        })
    }

    // 打个招呼吧
    sayHello = async () => {
        // 进入聊天页面
        this.props.navigation.navigate("Chat", {
            myHeadImg: this.state.myHeadImg,
            myId: this.props.RootStore.uid,
            param: this.state,
            uid: this.props.route.params.uid,
            telephone: this.props.RootStore.telephone
        })

    }



    render() {
        const { bgImg } = this.state;
        console.log(this.props.route.params.uid);
        return (
            <View>
                <XLNav title={this.state.nickname + "的个人资料"} />
                <View style={{ width: '100%', height: 900, position: 'relative' }}>
                    {/* 禁用刘海屏  开始 */}
                    <StatusBar backgroundColor={'transparent'} translucent={true} />
                    {/* 禁用刘海屏  结束 */}
                    {/* 背景图片  开始 */}
                    <ImageBackground source={{ uri: bgImg }}
                        style={{ width: '100%', height: '50%' }}
                        imageStyle={{ opacity: 0.5 }}
                    >
                        {/* 基本信息  开始 */}
                        <View style={{ marginTop: 20 }}>


                            {/* 基本个人信息  开始 */}
                            <View style={{ paddingHorizontal: 20, flexDirection: 'row', marginTop: 50 }}>
                                {/* 头像  开始 */}
                                <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{ uri: bgImg }} />
                                {/* 头像  结束 */}
                                <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                                    {/* 昵称、性别、年龄  开始 */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16 }}>{this.state.nickname}</Text>
                                        <View style={{ width: 50, height: 16, borderRadius: 8, backgroundColor: '#fff', marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                            <SvgXml xml={this.state.gender === 'female' ? femaleIcon : maleIcon} width={16} height={16} />
                                            <Text>{this.state.age}</Text>
                                        </View>
                                    </View>
                                    {/* 昵称、性别、年龄  结束 */}
                                    {/* 定位信息  开始 */}
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        <SvgXml xml={position} width={20} height={20} />
                                        <Text>{this.state.registerPosition}</Text>
                                    </View>
                                    {/* 定位信息  结束 */}

                                    {/* 个性签名  开始 */}
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        <SvgXml xml={motto} width={20} height={20} />
                                        <Text>{this.state.motto}</Text>
                                    </View>

                                    {/* 个性签名  结束 */}
                                </View>
                            </View>
                            {/* 基本个人信息  结束 */}
                        </View>
                        {/* 基本信息  结束 */}
                    </ImageBackground>
                    {/* 背景图片  结束 */}
                    {/* 用户行为信息  开始 */}
                    <View
                        style={{
                            width: '80%', height: 80, borderRadius: 10, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 210,
                            flexDirection: 'row', paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>点赞</Text>
                            <Text style={{ fontWeight: '700' }}>20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>关注</Text>
                            <Text style={{ fontWeight: '700' }}>20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>粉丝</Text>
                            <Text style={{ fontWeight: '700' }}>99+</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 用户行为信息  结束 */}

                    {/* 扩展业务  开始 */}

                    {/* 他的作品  开始 */}
                    <View
                        style={{
                            width: '100%', height: 60, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 310,
                            flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                            this.props.navigation.navigate("Works", {
                                uid: this.props.route.params.uid
                            });
                        }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <SvgXml xml={works} width={20} height={20} />
                                <Text style={{ fontWeight: '700', marginLeft: 20, fontSize: 16 }}>他的作品</Text>
                            </View>
                            <SvgXml xml={rightArrow} width={20} height={20} style={{ marginLeft: 215 }} />
                        </TouchableOpacity>
                    </View>
                    {/* 他的作品  结束 */}
                    <View
                        style={{
                            width: '100%', height: 60, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 370,
                            flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                            this.props.navigation.navigate("Life", {
                                uid: this.props.route.params.uid
                            });
                        }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <SvgXml xml={zoon} width={20} height={20} />
                                <Text style={{ fontWeight: '700', marginLeft: 20, fontSize: 16 }}>他的动态</Text>
                            </View>
                            <SvgXml xml={rightArrow} width={20} height={20} style={{ marginLeft: 215 }} />
                        </TouchableOpacity>
                    </View>

                    {/* 扩展业务  结束 */}

                    <Button onPress={this.sayHello} title={"打个招呼吧"} buttonStyle={{ width: '80%', height: 40, alignSelf: 'center', borderRadius: 20 }} />
                </View>

            </View>
        );
    }
}