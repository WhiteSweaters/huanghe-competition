import axios from "axios";
import React from "react";
import { View, Dimensions, Text, StatusBar, Image, TextInput, ToastAndroid, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import validate from "../../utils/validate";
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import { inject, observer } from 'mobx-react'
import { BASE_URL } from "../../utils/BaseUrl";


const screenWidth = Dimensions.get('window').width;  //屏幕宽度
const screenHeight = Dimensions.get('window').height; //屏幕高度
const baseUrl = BASE_URL; //接口地址
// 验证码输入框样式
const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});

@inject("RootStore")
@observer
export default class Login extends React.Component {

    componentDidMount(){
        console.log(baseUrl);
    }

    state = {
        telephone: '',
        toValid: false,
        vcode: '',
        btnTxt: '重新获取',
        isCountDowning: false
    }

    // 手机号表单数据与React组件双向绑定
    handleChange = (e) => {
        this.setState({ telephone: e });
    }

    // 验证码表单数据与React组件双向绑定
    handleCodeChange = (e) => {
        this.setState({ vcode: e });
    }

    // 验证手机号合法性以及验证通过发送短信
    sendMessage = async () => {
        const flag = validate.validatePhone(this.state.telephone);
        // 手机号不合法 直接return掉 并显示提示信息
        if (!flag) {
            ToastAndroid.show("手机号不合法", 2000);
            return;
        }
        // 手机号合法 发送短信到对应手机号
        await axios.post(baseUrl + "/user/sms", {
            telephone: this.state.telephone
        }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
            // 判断短信发送是否成功
            ToastAndroid.show(res.data.errMsg, 2000);
            if (!res.data.status) {
                // 短信发送失败 直接返回
                return;
            }
            // 短信发送成功 切换至填写验证码页面 并且开启定时器
            this.setState({ toValid: true });
            this.countDowning();
        });
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
            this.setState({ btnTxt: "重新获取(" + senconds + "s)" });
            if (senconds === 0) {
                this.setState({ isCountDowning: false, btnTxt: '重新获取' });
                clearInterval(timeId);
            }
        }, 1000)
    }

    // 验证验证码合法性以及发送登录信息
    login = async () => {
        // 验证码合法性校验
        if (this.state.vcode.length !== 4) {
            ToastAndroid.show("验证码不合法", 2000);
            return;
        }
        // 发送登录请求
        await axios.post(baseUrl + '/user/checkVcode', {
            telephone: this.state.telephone,
            vcode: this.state.vcode
        }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => {
            console.log(res);
            if (!res.data.status) {
                ToastAndroid.show(res.data.data.errMsg, 2000);
                return;
            }
            // 存储用户数据到mbox
            this.props.RootStore.setUserInfo(this.state.telephone, res.data.data.id);
            // 根据返回的数据判断用户是新用户还是老用户
            if (res.data.data.isNew) {
                // 1.如果是新用户 则跳转至注册页面 用户填写注册信息
                this.props.navigation.navigate("Register");
            } else {
                // 2.如果用户是老用户 则直接跳转至首页
                ToastAndroid.show("欢迎回来！",2000)
                this.props.navigation.navigate("TabBar");
            }


        });

    }

    // 渲染输入手机号页面
    renderSendMessage = () => {
        {/**发送短信以及填写验证码页面切换 开始 */ }
        return <View style={{
            padding: 20
        }}>
            {/**输入手机号登陆/注册 开始 */}
            <View>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'YaHei',
                }}>
                    输入手机号登陆/注册
                </Text>
            </View>
            {/**输入手机号登陆/注册 结束 */}

            {/* 输入手机号 输入框开始 */}
            <View>
                <TextInput
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: '#ccc',
                        fontSize: 20
                    }}
                    keyboardType="number-pad"
                    value={'' + this.state.telephone}
                    onChangeText={e => this.handleChange(e)}
                    maxLength={11}
                    onSubmitEditing={this.sendMessage}
                />
            </View>
            {/* 输入手机号 输入框结束 */}

            {/* 发送短信按钮  开始*/}
            <View style={{
                marginTop: 40
            }}>
                <Button
                    title="发送短信"
                    buttonStyle={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: 200,
                        height: 40,
                        borderRadius: 20
                    }}
                    onPress={this.sendMessage}
                />
            </View>
            {/* 发送短信按钮  结束*/}

        </View>
        {/**发送短信以及填写验证码页面切换 结束 */ }
    }

    // 渲染填写验证码登录页面
    renderLogin = () => {
        return <View style={{
            padding: 20
        }}>

            {/* 向哪一个手机号发送  开始 */}
            <View>
                <Text>已向+86 {this.state.telephone}手机发送验证码</Text>
            </View>
            {/* 向哪一个手机号发送  结束 */}

            {/* 填写验证码  开始 */}
            <View style={styles.root}>
                <Text style={styles.title}>输入四位验证码</Text>
                <CodeField
                    value={this.state.vcode}
                    onChangeText={this.handleCodeChange}
                    cellCount={4}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    onSubmitEditing={this.login}
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                        >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />

            </View>
            {/* 填写验证码  结束 */}

            {/* 重新获取  开始 */}
            <View style={{
                marginTop: 60
            }}>
                <Button
                    title={this.state.btnTxt}
                    disabled={this.state.isCountDowning}
                    buttonStyle={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: 200,
                        height: 40,
                        borderRadius: 20
                    }}
                    onPress={this.sendMessage} />
            </View>
            {/* 重新获取  结束 */}

        </View>
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {/**状态栏 开始 */}
                <StatusBar backgroundColor={"transparent"} translucent={true}></StatusBar>
                {/**状态栏 结束 */}

                {/**登录背景图片 开始 */}
                <View>
                    <Image style={{
                        width: '100%',
                        height: 240
                    }} source={require('../../assets/images/login.jpg')}></Image>
                </View>
                {/**登录背景图片 结束 */}

                {this.state.toValid ? this.renderLogin() : this.renderSendMessage()}

            </View>
        )
    }

}