import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { appointment, customerService, edit, femaleIcon, findHelp, maleIcon, motto, position, rightArrow, works } from '../../../assets/svgs';
import { BASE_URL } from '../../../utils/BaseUrl';
import Geo from '../../../utils/Geo';



@inject("RootStore")
@observer
export default class My extends React.Component {

    state = {
        bgImg: '',//用户头像
        nickname: '',//用户昵称
        age: '',//用户年龄
        registerPosition: '',//用户注册时的位置
        gender: '',//用户性别
        currentPosition: '',
        motto: '',
        caredOfNum: 0
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUserPosition();
        this.getCaredOfNum();
    }

    // 向后台发送请求 获取用户基本信息
    getUserInfo = async () => {
        await axios.get(BASE_URL + "/user/getUserById/" + this.props.RootStore.uid).then(res => {
            this.setState({
                bgImg: res.data.data.headerImage,
                nickname: res.data.data.nickname,
                gender: res.data.data.gender,
                age: res.data.data.age,
                motto: res.data.data.motto
            });
        })
    }
    // 调用高德SDK获取用户当前位置
    getUserPosition = async () => {
        await Geo.getCurrentStreet().then(res => {
            this.setState({ currentPosition: res.regeocode.addressComponent.township });
        });
    }
    // 获取用户关注的用户数量
    getCaredOfNum = async () => {
        await axios.get(BASE_URL + "/community/getCaredOfNum/" + this.props.RootStore.uid).then(res => {
            this.setState({
                caredOfNum: res.data.data
            })
        })
    }

    render() {
        const { bgImg, caredOfNum } = this.state;
        return (
            <View>
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
                            {/* 编辑个人信息按钮  开始 */}
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}
                                onPress={() => { this.props.navigation.navigate("EditUserInfo") }}
                            >
                                <Text></Text>
                                <SvgXml xml={edit} width={20} height={20} />
                            </TouchableOpacity>
                            {/* 编辑个人信息按钮  结束 */}

                            {/* 基本个人信息  开始 */}
                            <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
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
                                        <Text>{this.state.currentPosition}</Text>
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
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>获赞</Text>
                            <Text style={{ fontWeight: '700' }}>20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                            this.props.navigation.navigate("CareList");
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>关注</Text>
                            <Text style={{ fontWeight: '700' }}>{caredOfNum}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                            this.props.navigation.navigate("CareList");
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>粉丝</Text>
                            <Text style={{ fontWeight: '700' }}>{caredOfNum}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 用户行为信息  结束 */}

                    {/* 扩展业务  开始 */}

                    {/* 我的作品  开始 */}
                    <View
                        style={{
                            width: '100%', height: 60, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 310,
                            flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                            this.props.navigation.navigate("Works", {
                                uid: this.props.RootStore.uid
                            });
                        }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <SvgXml xml={works} width={20} height={20} />
                                <Text style={{ fontWeight: '700', marginLeft: 20, fontSize: 16 }}>我的作品</Text>
                            </View>
                            <SvgXml xml={rightArrow} width={20} height={20} style={{ marginLeft: 215 }} />
                        </TouchableOpacity>
                    </View>
                    {/* 我的作品  结束 */}

                    {/* 寻找咨询室  开始 */}
                    <View
                        style={{
                            width: '100%', height: 60, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 375,
                            flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                            this.props.navigation.navigate("Navigation")
                        }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <SvgXml xml={findHelp} width={20} height={20} />
                                <Text style={{ fontWeight: '700', marginLeft: 20, fontSize: 16 }}>寻找咨询室</Text>
                            </View>
                            <SvgXml xml={rightArrow} width={20} height={20} style={{ marginLeft: 200 }} />
                        </TouchableOpacity>
                    </View>
                    {/* 寻找咨询室  结束 */}

                    {/* 预约咨询  开始 */}
                    <View
                        style={{
                            width: '100%', height: 60, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 440,
                            flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}
                            onPress={() => {
                                this.props.navigation.navigate("Consultation")
                            }}
                        >
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <SvgXml xml={appointment} width={20} height={20} />
                                <Text style={{ fontWeight: '700', marginLeft: 20, fontSize: 16 }}>咨询预约</Text>
                            </View>
                            <SvgXml xml={rightArrow} width={20} height={20} style={{ marginLeft: 215 }} />
                        </TouchableOpacity>
                    </View>
                    {/* 预约咨询  结束 */}

                    <View
                        style={{
                            width: '100%', height: 60, backgroundColor: '#fff',
                            position: 'absolute', alignSelf: 'center', top: 505,
                            flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <SvgXml xml={customerService} width={20} height={20} />
                                <Text style={{ fontWeight: '700', marginLeft: 20, fontSize: 16 }}>联系我们</Text>
                            </View>
                            <SvgXml xml={rightArrow} width={20} height={20} style={{ marginLeft: 215 }} />
                        </TouchableOpacity>
                    </View>
                    {/* 扩展业务  结束 */}
                </View>
            </View>
        );
    }
}