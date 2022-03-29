import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { Text, View, Animated, ImageBackground, TouchableOpacity } from 'react-native';
import XLNav from '../TabBar/XLNav';
import XLNav2 from '../TabBar/XLNav2';
import XLNav3 from '../TabBar/XLNav3';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/BaseUrl';
import { inject, observer } from 'mobx-react';


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
export default class Result extends React.Component {

    static contextType = NavigationContext;

    state = {
        result: this.props.route.params.result
    }

    componentDidMount() {
        this.uploadResult();
    }

    // 向后台提交问卷的调查结果
    uploadResult = async () => {
        const { result } = this.state;
        await axios.get(BASE_URL + "/evaluation/result?result=" + result + "&uid=" + this.props.RootStore.uid).then(res => {
            console.log(res);
        });
    }

    // 根据用户填写问卷的结果返回相应页面
    renderFirst = () => {
        return <>
            <XLNav title={'问卷结果'} />
            <ImageBackground
                source={require('../../assets/images/scrowImage.jpg')}
                style={{ height: '100%', padding: 20 }}
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
                            this.context.navigate("TabBar");
                        }}
                    >
                        <Text style={{ fontSize: 28 }}>回首页</Text>
                    </TouchableOpacity>
                </FadeInView2>

            </ImageBackground>
        </>
    }
    renderSecond = () => {
        return <>
            <XLNav2 title={'问卷结果'} />
            <ImageBackground
                source={require('../../assets/images/second.jpg')}
                style={{ height: '100%', padding: 20 }}
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
                            this.context.navigate("TabBar");
                        }}
                    >
                        <Text style={{ fontSize: 28 }}>回首页</Text>
                    </TouchableOpacity>
                </FadeInView2>

            </ImageBackground>
        </>
    }
    renderThird = () => {
        return <>
            <XLNav3 title={'问卷结果'} />
            <ImageBackground
                source={require('../../assets/images/third.jpg')}
                style={{ height: '100%', padding: 20 }}
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
                            this.context.navigate("TabBar");
                        }}
                    >
                        <Text style={{ fontSize: 28 }}>回首页</Text>
                    </TouchableOpacity>
                </FadeInView2>

            </ImageBackground>
        </>
    }


    render() {
        const { result } = this.state;
        console.log(result);
        return (
            <View>
                {result === 1 ? this.renderFirst() : <></>}
                {result === 2 ? this.renderSecond() : <></>}
                {result === 3 ? this.renderThird() : <></>}
            </View>
        );
    }
}