import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';


export default class EvaluationForm extends React.Component {

    static contextType = NavigationContext;

    state = {
        btnData: [], //按钮包含的信息
        btnStatus: [100, 101, 102], //用于更改按钮的背景颜色，初始值防止空指针异常
        reasonList: []//选项的内容数组，测评页面通过选项返回对应内容
    }

    componentDidMount() {
        this.getBtnData();
    }

    // 获取按钮信息
    getBtnData = () => {
        axios.get(BASE_URL + "/evaluation/getBtnData").then(res => {
            this.setState({
                btnData: res.data.data,
            })
        })
    }

    // 判断按钮是否被选中
    isExit = (i) => {
        const { btnStatus } = this.state;
        for (var j = 0; j < btnStatus.length; j++) {
            if (i === btnStatus[j]) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { btnData, btnStatus, reasonList } = this.state;
        return (
            <View>
                <XLNav title={"第一题"} funcText={"下一题"} submitIdea={() => {
                    this.context.navigate("SecondQuestion", {
                        reasonList
                    });
                }} />
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>你寻求心理咨询帮助的原因是什么？（多选）</Text>
                </View>

                {/* 各种选项  开始 */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', width: '90%' }}>
                    {btnData.map((v, i) =>
                        <TouchableOpacity key={i} style={{
                            width: 100, height: 25, borderRadius: 3, backgroundColor: this.isExit(i) ? 'orange' : '#fff',
                            alignItems: 'center', marginTop: 20, marginLeft: 10, justifyContent: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    btnStatus: [...btnStatus, i],
                                    reasonList: [...reasonList, v]
                                })
                            }}>
                            <Text>{v.tag}</Text>
                        </TouchableOpacity>)}
                </View>
                {/* 各种选项  结束 */}

            </View>
        );
    }
}