import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, TextInput, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import { gender, idCard, name, orderDate, question, record, rightArrow, telephone, vcode, verticalBar } from '../../assets/svgs';
import { BASE_URL } from '../../utils/BaseUrl';
import dateToString from '../../utils/dateToString';
import validate from '../../utils/validate';
import DatePick2 from '../DatePick2';

@inject("RootStore")
@observer
export default class Consultation extends React.Component {

    static contextType = NavigationContext;

    state = {
        name: '',//预约人的姓名
        telephone: '',//预约人的手机号
        vcode: '',//预约人的验证码
        idCard: '',//预约人的身份证号
        birthday: new Date(),//预约人的预约时间
        isCountDowning: false,
        btnTxt: "发送验证码",
        toSuccess: false,
        evaluation: {}
    }

    componentDidMount() {
    }

    // 预约人姓名与react组件双向绑定
    handleNameChange = (e) => {
        this.setState({ name: e });
    }

    // 预约人电话与react组件双向绑定
    handleTelephoneChange = (e) => {
        this.setState({ telephone: e });
    }

    // 预约人验证码与react组件双向绑定
    handleVcodeChange = (e) => {
        this.setState({ vcode: e });
    }

    // 预约人身份证号与react组件双向绑定
    handleIdCardChange = (e) => {
        this.setState({ idCard: e });
    }

    // 父组件向子组件 DatePick提供的回调函数 用于子组件向父组件提供数据birthday
    receiveBirtday = (birthday) => {
        this.setState({ birthday });
    }

    // 发送验证码
    getVcode = async () => {
        const { telephone } = this.state;
        let flag = validate.validatePhone(telephone);
        if (!flag) {
            // 若手机号格式不正确，则给出用户相应提示，并直接返回
            ToastAndroid.show("手机号格式不正确", 2000);
            return;
        }
        // 若手机号正确 则向后台发送Ajax请求 后台生成验证码并发送到用户手机
        await axios.get(BASE_URL + "/evaluation/sendVcode/" + telephone).then(res => {
            // 如果预约失败的话，返回对应错误信息
            ToastAndroid.show(res.data.errMsg, 2000);
            this.countDowning();
        })
    }

    // 开启定时器
    countDowning = () => {
        if (this.state.isCountDowning) {
            return;
        }
        this.setState({ isCountDowning: true });
        let senconds = 60;
        const timeId = setInterval(() => {
            senconds--;
            this.setState({ btnTxt: "发送验证码(" + senconds + "s)" });
            if (senconds === 0) {
                this.setState({ isCountDowning: false, btnTxt: '发送验证码' });
                clearInterval(timeId);
            }
        }, 1000)
    }

    // 提交预约
    submitBooking = async () => {
        const { name, telephone, vcode, idCard, birthday } = this.state;
        // 表单非空校验
        if (name === '') {
            ToastAndroid.show("请输入您的姓名", 2000);
            return;
        }
        if (telephone === '') {
            ToastAndroid.show("请输入您的手机号", 2000);
            return;
        }
        if (vcode === '') {
            ToastAndroid.show("请输入验证码", 2000);
            return;
        }
        if (idCard === '') {
            ToastAndroid.show("请输入身份证号", 2000);
            return;
        }
        const params = {
            name: name,
            telephone: telephone + '',
            vcode: vcode + '',
            idCard: idCard + '',
            orderDate1: dateToString.ChangeTimeToString(birthday),
            orderDate2: dateToString.dateToString(birthday),

        }
        // 校验通过  开始发送Ajax请求
        await axios.post(BASE_URL + "/evaluation/makeAnAppointment", params, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
            if (!res.data.status) {
                ToastAndroid.show(res.data.errMsg, 2000);
                return;
            }
            ToastAndroid.show(res.data.errMsg, 2000);
            this.context.navigate("Record", params);
        });

    }

    renderAppointment = () => {
        const { isCountDowning, btnTxt, birthday } = this.state;
        return <ScrollView>

            {/* 顶部图片  开始 */}
            <View>
                <Image source={require('../../assets/images/haha.jpg')} style={{ width: '100%', height: 200 }} />
            </View>
            {/* 顶部图片  结束 */}

            {/* 文字介绍  开始 */}
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>华中师范大学心理健康教育中心心理咨询预约</Text>
                <Text style={{ lineHeight: 30, marginTop: 10 }}>心理咨询是通过一种专门、专业的帮助关系来使当事人发生心理和行为上的改变。</Text>
                <Text style={{ lineHeight: 30 }}>心理咨询看起来像“聊天”，但不是“聊天”、不是“开导”、不是“安慰和劝说”、不是“纠正”“错误”想法……
                    而是倾听、陪伴、理解、交往，是矫正性的体验，是成长，是探索，是帮助一个人发现未知的自己。</Text>
            </View>
            {/* 文字介绍  结束 */}

            {/* 预约路线  开始 */}
            <TouchableOpacity
                style={{
                    alignItems: 'center', padding: 10, flexDirection: 'row',
                    width: '100%', height: 50, borderTopColor: '#eff1f6', borderTopWidth: 3, borderBottomColor: '#eff1f6'
                }}
                onPress={() => {
                    this.context.navigate("Navigation")
                }}>
                <SvgXml xml={question} width={20} height={20} />
                <Text>预约路线</Text>
                <SvgXml xml={rightArrow} width={16} height={16} style={{ marginLeft: 240 }} />
            </TouchableOpacity>
            {/* 预约路线  结束 */}

            {/* 预约记录  开始 */}
            <TouchableOpacity style={{
                alignItems: 'center', padding: 10, flexDirection: 'row',
                width: '100%', height: 50, borderTopColor: '#eff1f6', borderTopWidth: 3,
                borderBottomColor: '#eff1f6', borderBottomWidth: 3
            }}
                onPress={() => {
                    this.context.navigate("RecordList");
                }}
            >
                <SvgXml xml={record} width={20} height={20} />
                <Text>预约记录</Text>
                <SvgXml xml={rightArrow} width={16} height={16} style={{ marginLeft: 240 }} />
            </TouchableOpacity>
            {/* 预约记录  结束 */}

            {/* 填写预约咨询表单  开始 */}
            <View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <SvgXml xml={verticalBar} width={20} height={20} />
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>咨询人信息</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    {/* 咨询人姓名  开始 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, width: '100%', height: 50, borderBottomColor: '#eff1f6', borderBottomWidth: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <SvgXml xml={name} width={20} height={20} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 5 }}>姓名</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={this.handleNameChange} placeholder='输入您的姓名' style={{ height: 40, marginLeft: 5 }} />
                        </View>
                    </View>
                    {/* 咨询人姓名  结束 */}

                    {/* 咨询人手机号  开始 */}
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, width: '100%', height: 50, borderBottomColor: '#eff1f6', borderBottomWidth: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <SvgXml xml={telephone} width={20} height={20} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 5 }}>手机号</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={this.handleTelephoneChange} keyboardType='number-pad' maxLength={11} placeholder='输入您的手机号' style={{ height: 40, marginLeft: 5 }} />
                        </View>
                        <View style={{ marginLeft: 100 }}>
                            <Button disabled={isCountDowning} title={btnTxt} buttonStyle={{}} titleStyle={{ fontSize: 12, alignSelf: 'center' }} onPress={this.getVcode} />
                        </View>
                    </View>
                    {/* 咨询人手机号  结束 */}

                    {/* 验证码  开始 */}
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, width: '100%', height: 50, borderBottomColor: '#eff1f6', borderBottomWidth: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <SvgXml xml={vcode} width={20} height={20} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 5 }}>验证码</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={this.handleVcodeChange} placeholder='输入4位数验证码' maxLength={4} keyboardType='number-pad' style={{ height: 40, marginLeft: 5 }} />
                        </View>
                    </View>
                    {/* 验证码  结束 */}

                    {/* 身份证号  开始 */}
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, width: '100%', height: 50, borderBottomColor: '#eff1f6', borderBottomWidth: 6 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <SvgXml xml={idCard} width={20} height={20} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 5 }}>身份证号</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={this.handleIdCardChange} placeholder='输入您的身份证号码' maxLength={18} keyboardType='number-pad' style={{ height: 40, marginLeft: 5 }} />
                        </View>
                    </View>
                    {/* 身份证号  结束 */}

                    {/* 预约日期  开始 */}
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, width: '100%', height: 50, borderBottomColor: '#eff1f6' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <SvgXml xml={orderDate} width={20} height={20} />
                            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 5 }}>预约日期</Text>
                        </View>
                        <View style={{ marginLeft: 200 }}>
                            <DatePick2 birthday={this.state.birthday} receiveBirtday={birthday => this.receiveBirtday(birthday)} />
                        </View>
                    </View>
                    {/* 显示体检日期  开始 */}
                    <View>
                        <Text style={{ alignSelf: 'center' }}>预约日期：{dateToString.dateToString(birthday)}</Text>
                    </View>
                    {/* 显示体检日期  结束 */}

                    {/* 预约日期  结束 */}
                </View>
            </View>
            {/* 填写预约咨询表单  结束 */}

            {/* 提交表单  开始 */}
            <View style={{ backgroundColor: '#eff1f6' }}>
                <Button
                    // disabled={isCountDowning}
                    title="提交预约"
                    buttonStyle={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: 200,
                        height: 40,
                        borderRadius: 20
                    }}
                    onPress={() => {
                        this.submitBooking();
                    }}
                />
            </View>
            {/* 提交表单  结束 */}
        </ScrollView>
    }

    render() {
        const { toSuccess, evaluation } = this.state;
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                {this.renderAppointment()}


            </View>
        );
    }
}