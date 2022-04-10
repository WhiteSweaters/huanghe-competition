import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, ScrollView,  } from 'react-native';
import { Button } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import { analyse, evaluationResult } from '../../assets/svgs';
import { BASE_URL } from '../../utils/BaseUrl';
import { VictoryChart, VictoryBar } from "victory-native";

@inject("RootStore")
@observer
export default class Evaluation extends React.Component {

    static contextType = NavigationContext;

    state = {
        userInfo: '',
        result: '',
        reasonList: [],
        chartList: [],
        score: 0
    }

    componentDidMount() {
        this.getUserInfo();
        this.getResultToUser();
    }
    // 获取图表信息
    getChartList = () => {
        const { score } = this.state;
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
            this.setState({
                reasonList: res.data.data.reasonList,
                score: res.data.data.score,
                chartList: [
                    {
                        x: "测评结果",
                        y: res.data.data.score
                    },
                    {
                        x: "正常水平",
                        y: 2
                    }
                ]
            });
        })
    }

    // 渲染新用户心理测评界面
    renderForNewUser = () => {
        return <ImageBackground
            source={require('../../assets/images/scrowImage.jpg')}
            style={{ height: '100%' }}
            imageStyle={{ height: '100%' }}
        >
            <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>新用户，你好啊！欢迎进入我们的心理咨询室。准备好开始心理测评了吗？</Text>

            <TouchableOpacity style={{
                width: 100, height: 100, borderRadius: 50, alignSelf: 'center',
                marginTop: 280, justifyContent: 'center', alignItems: 'center'
            }}
                onPress={() => {
                    // 跳转至心理测评页面
                    this.context.navigate("EvaluationForm");
                }}
            >
                <Text style={{ fontSize: 28 }}>是的</Text>
            </TouchableOpacity>

        </ImageBackground>
    }

    // 渲染老用户心理测评界面 v2.0:测评报告
    renderForOldUser = () => {

        const { result } = this.state;
        <View>
            <Text>111</Text>
        </View>
    }

    render() {
        const { userInfo, chartList, reasonList } = this.state;
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                {userInfo.newForEvaluation ? this.renderForNewUser() : <ScrollView>
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
                            <Text>1.心理因素</Text>
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
                    <Button title={"重新测评"}
                        buttonStyle={{ width: 150, alignSelf: 'center', height: 40, borderRadius: 20 }}
                        onPress={() => {
                            this.context.navigate("EvaluationForm")
                        }}
                    />

                </ScrollView>}
            </View>
        );
    }
}
