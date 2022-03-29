import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React, { useRef, useEffect } from 'react';
import { Text, View, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';


/**
 * 封装动画的函数组件
 * @param {props} props
 * @returns
 */
const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // 透明度初始值设为0

    React.useEffect(() => {
        Animated.timing(                  // 随时间变化而执行动画
            fadeAnim,                       // 动画中的变量值
            {
                toValue: 1,                   // 透明度最终变为1，即完全不透明
                duration: 5000,              // 让动画持续一段时间
            }
        ).start();                        // 开始执行动画
    }, [fadeAnim])

    return (
        <Animated.View                 // 使用专门的可动画化的View组件
            style={{

                ...props.style,
                opacity: fadeAnim,         // 将透明度绑定到动画变量值
            }}
        >
            {props.children}
        </Animated.View>
    );
}

/**
 * 第二个封装动画的函数组件
 * @param {props} props
 * @returns
 */
const FadeInView2 = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // 透明度初始值设为0

    React.useEffect(() => {
        Animated.timing(                  // 随时间变化而执行动画
            fadeAnim,                       // 动画中的变量值
            {
                toValue: 1,                   // 透明度最终变为1，即完全不透明
                duration: 10000,              // 让动画持续一段时间
            }
        ).start();                        // 开始执行动画
    }, [fadeAnim])

    return (
        <Animated.View                 // 使用专门的可动画化的View组件
            style={{
                ...props.style,
                opacity: fadeAnim,         // 将透明度绑定到动画变量值
            }}
        >
            {props.children}
        </Animated.View>
    );
}

@inject("RootStore")
@observer
export default class Evaluation extends React.Component {

    static contextType = NavigationContext;

    state = {
        userInfo: '',
        result: ''
    }

    componentDidMount() {
        this.getUserInfo();
        this.getResultToUser();
    }

    // 获取当前用户信息
    getUserInfo = () => {
        axios.get(BASE_URL + "/user/getUserById/" + this.props.RootStore.uid).then(res => {
            this.setState({
                userInfo: res.data.data
            })
        })
    }

    // 获取用户的心理测评的结果值
    getResultToUser = async () => {
        await axios.get(BASE_URL + "/evaluation/getResultByUid/" + this.props.RootStore.uid).then(res => {
            this.setState({ result: res.data.data });
        })
    }

    // 渲染新用户心理测评界面
    renderForNewUser = () => {
        return <ImageBackground
            source={require('../../assets/images/scrowImage.jpg')}
            style={{ height: '100%' }}
            imageStyle={{ height: '100%' }}
        >
            <FadeInView >
                <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>新用户，你好啊！欢迎进入我们的心理咨询室。准备好开始心理测评了吗？</Text>
            </FadeInView>

            <FadeInView2>
                <TouchableOpacity style={{
                    width: 100, height: 100, borderRadius: 50, backgroundColor: '#5bceae', alignSelf: 'center',
                    marginTop: 220, justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={() => {
                        // 跳转至心理测评页面
                        this.context.navigate("EvaluationForm");
                    }}
                >
                    <Text style={{ fontSize: 28 }}>是的</Text>
                </TouchableOpacity>
            </FadeInView2>

        </ImageBackground>
    }

    // 渲染老用户心理测评界面
    renderForOldUser = () => {
        const { result } = this.state;
        if (result === 1) {
            return <>
                <ImageBackground
                    source={require('../../assets/images/scrowImage.jpg')}
                    style={{ height: '100%' }}
                    imageStyle={{ height: '100%' }}
                >
                    <FadeInView >
                        <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>恭喜你，你的心理健康状态良好，继续保持吧</Text>
                    </FadeInView>

                    <FadeInView2>
                        <TouchableOpacity style={{
                            width: 100, height: 100, borderRadius: 50, backgroundColor: '#5bceae', alignSelf: 'center',
                            marginTop: 220, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                // 回到测评页
                                this.context.navigate("EvaluationForm");
                            }}
                        >
                            <Text style={{ fontSize: 28 }}>重置</Text>
                        </TouchableOpacity>
                    </FadeInView2>

                </ImageBackground>
            </>
        } else if (result === 2) {
            return <>
                <ImageBackground
                    source={require('../../assets/images/second.jpg')}
                    style={{ height: '100%' }}
                    imageStyle={{ height: '100%' }}
                >
                    <FadeInView >
                        <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>你的心理健康状态有点差，尝试去和其他人沟通来缓解压力吧~</Text>
                    </FadeInView>

                    <FadeInView2>
                        <TouchableOpacity style={{
                            width: 100, height: 100, borderRadius: 50, backgroundColor: '#CC9966', alignSelf: 'center',
                            marginTop: 220, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                // 回到测评页
                                this.context.navigate("EvaluationForm");
                            }}
                        >
                            <Text style={{ fontSize: 28 }}>重置</Text>
                        </TouchableOpacity>
                    </FadeInView2>

                </ImageBackground>
            </>
        } else if (result === 3) {
            return <>
                <ImageBackground
                    source={require('../../assets/images/third.jpg')}
                    style={{ height: '100%' }}
                    imageStyle={{ height: '100%' }}
                >
                    <FadeInView >
                        <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>你的心理健康状态很差，可能需要专业的心理咨询师的辅导</Text>
                    </FadeInView>

                    <FadeInView2>
                        <TouchableOpacity style={{
                            width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', alignSelf: 'center',
                            marginTop: 220, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                // 回到测评页
                                this.context.navigate("EvaluationForm");
                            }}
                        >
                            <Text style={{ fontSize: 28 }}>重置</Text>
                        </TouchableOpacity>
                    </FadeInView2>

                </ImageBackground>
            </>
        }
    }



    render() {
        const { userInfo, result } = this.state;
        console.log(result);
        console.log(userInfo.newForEvaluation);
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                {userInfo.newForEvaluation ? this.renderForNewUser() : this.renderForOldUser()}
            </View>
        );
    }
}
