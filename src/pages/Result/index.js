import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { Text, View, Animated, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import XLNav from '../TabBar/XLNav';
import XLNav2 from '../TabBar/XLNav2';
import XLNav3 from '../TabBar/XLNav3';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/BaseUrl';
import { inject, observer } from 'mobx-react';
import { SvgXml } from 'react-native-svg';
import { evaluationResult, analyse } from '../../assets/svgs';
import { VictoryChart, VictoryBar } from "victory-native";


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

@inject("RootStore")
@observer
export default class Result extends React.Component {

    static contextType = NavigationContext;

    state = {
        reasonList: this.props.route.params.reasonList,
        chartList: []
    }

    componentDidMount() {
        this.getChartList();
        this.submitResult();
    }

    // 获取图标信息
    getChartList = () => {
        const { score } = this.props.route.params;
        this.setState({
            chartList: [
                {
                    x: "测评结果",
                    y: score
                },
                {
                    x: "正常水平",
                    y: 2
                }
            ]
        })
    }

    // 向后台提交问卷的调查结果
    uploadResult = async () => {
        const { result } = this.state;
        await axios.get(BASE_URL + "/evaluation/result?result=" + result + "&uid=" + this.props.RootStore.uid).then(res => {
            console.log(res);
        });
    }

    // 将测评结果存入数据库
    submitResult = async () => {
        const { reasonList } = this.state;
        let reasonid = [];
        for (let i = 0; i < reasonList.length; i++) {
            reasonid.push(reasonList[i].id)
        }
        const { score } = this.props.route.params;
        await axios.get(BASE_URL + "/evaluation/submitResult?uid=" + this.props.RootStore.uid + "&score=" + score + "&reasonid=" + reasonid).then(res => {
            console.log(res);
        })
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
        const { reasonList, chartList } = this.state;
        return (
            <ScrollView>
                {/* 心理评估  开始 */}
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgXml xml={evaluationResult} width={50} height={50} style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 20 }}>测评结果</Text>
                    </View>
                    <View style={{
                        width: '95%', height: 240, backgroundColor: 'rgba(204, 207, 255, 0.5)',
                        alignSelf: 'center', borderRadius: 8, padding: 20
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>健康指数</Text>
                                <Text>88分</Text>
                            </View>
                            <View>
                                <Text style={{ marginLeft: 50, fontSize: 13, marginTop: 10 }}>测评结果：心理健康状况良好</Text>
                                <Text style={{ marginTop: 10, lineHeight: 30, fontSize: 12 }}>根据心理评估显示：你的心理健康状况良好，请继续保持。另外，您还可以尝试本APP推出的
                                    冥想练习模块，它不仅对正处在负面情绪的人群有一定的治愈作用，对心理健康状况良好的人群同样也能起到很好的维持好心态的作用哦。
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* 心理评估  结束 */}

                {/* 测评分析  开始 */}
                <View style={{ width: '100%', borderTopWidth: 5, borderTopColor: '#cde2fc', padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgXml xml={analyse} width={50} height={50} style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 20 }}>测评分析</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, marginLeft: 10 }}>按照因素分析方法，心理状态由心理因素和影响程度组成</Text>
                    </View>

                    <View style={{
                        width: '95%', backgroundColor: 'rgb(253, 249, 246)',
                        alignSelf: 'center', borderRadius: 8, padding: 20, marginTop: 10
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>1.心理因素</Text>
                        <Text style={{ marginTop: 10, lineHeight: 30 }}>
                            心理因素包括心理过程与个性两个方面。心理过程是由认识过程、情绪过程和意志过程所构成。个性包括个性倾向性与个性心理特征。
                            本次测评通过分析用户受到的困扰因素着重分析用户的个性倾向性，对用户的心理因素进行深入分析。
                        </Text>
                        {reasonList.map((value, index) => <View key={index}>
                            <View style={{ padding: 10 }}>
                                <Text style={{ fontWeight: '700' }}>{index + 1}）.{value.tag}</Text>
                                <Text style={{ marginTop: 5 }}>医学释义：{value.define}</Text>
                                <Text style={{ marginTop: 10 }}>解决办法：</Text>
                                <Text>{value.solution.replace(/\\n/g, '\n')}</Text>
                            </View>
                        </View>)}
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>2.影响程度</Text>
                        <ScrollView horizontal>
                            <VictoryChart height={400} width={400} domainPadding={{ x: 80, y: [0, 20] }}>
                                <VictoryBar
                                    data={chartList}
                                    style={
                                        { data: { fill: "tomato" } }
                                    }
                                />
                            </VictoryChart>
                        </ScrollView>
                    </View>
                </View>
                {/* 测评分析  结束 */}

            </ScrollView>
        );
    }
}