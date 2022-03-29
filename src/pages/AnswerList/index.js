import React from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';



export default class AnswerList extends React.Component {

    state = {
        answerList: ["会的", "着眼未来", "保持你的好奇心，去挖掘真相", "意义非凡", "机会稍纵即逝", "很麻烦", "问天问大地，不如问自己", "谁说得准呢，先观望着", "GO", "转移注意力", "事情开始变得有趣了", "这事儿不靠谱", "保存你的实力", "不要忘记", "抓住机会", "别不自量力", "很麻烦", "能让你快乐的那个决定", "一年后就不那么重要了", "但行好事，莫问前程", "试试卖萌", "告诉别人，这对你意味着什么", "决定了就去做", "不要犹豫", "上帝为你关一扇门，必定会为你打开一扇窗", "需要花费点时间", "采取行动", "醒醒吧，别做梦了", "不作就不会死", "玩得开心就好", "保持乐观", "去行动", "不要被情绪左右", "不值得冒险", "是的", "勿忘初心，方得始终", "你需要知道真相", "需要更多的选择", "你需要考虑其它方面", "绝对不", "重要", "最佳方案不一定可行", "尽早完成", "列个清单", "形势不明", "毫无疑问", "情况很快就会发生改变", "没有", "不需要", "重新考虑", "不要迫于压力而改变初衷", "天上要掉馅饼了", "寻找跟多的选择", "一笑而过", "不赌", "从来没有", "当然", "借助他人的经验", "照你想的那样去做", "保持头脑清醒", "不要等了"],
        currentAnswer: "默数十秒再问我"
    }

    // 点击重新获取  得到不同答案
    changeAnswer = () => {
        const { answerList } = this.state;
        // 获取0-9之间的随机数
        let num = this.sum(0, answerList.length);
        // 将answerList中的答案随机赋予到currentAnswer中
        this.setState({
            currentAnswer: answerList[num]
        });
    }

    // 获取指定范围的随机数
    sum = (m, n) => {
        var num = Math.floor(Math.random() * (m - n) + n);
        return num;
    }

    render() {
        const { currentAnswer } = this.state;
        return (
            <View>
                <StatusBar backgroundColor={'transparent'} translucent={true} />
                <ImageBackground source={require('../../assets/images/black.png')} style={{
                    width: '100%', height: 1500, position: 'relative'
                }}>
                    <View style={{ position: 'absolute', alignSelf: 'center', top: 300 }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>{currentAnswer}</Text>
                    </View>

                    <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', top: 600 }}
                        onPress={this.changeAnswer}
                    >
                        <Text style={{ color: '#fff' }}>再问一次</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}