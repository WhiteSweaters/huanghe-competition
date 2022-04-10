import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import XLNav from '../TabBar/XLNav';

export default class FourthQuestion extends React.Component {

    static contextType = NavigationContext;

    state = {
        colors: ['#fff', '#fff'],
        reasonList: this.props.route.params.reasonList,
        score: this.props.route.params.score
    }

    render() {
        const { colors, reasonList, score } = this.state;
        return (
            <View>
                <XLNav title={"第四题"} funcText={"下一题"} submitIdea={() => {
                    this.context.navigate("FifthQuestion", {
                        reasonList, score
                    });
                }} />
                {/* 问题主体  开始 */}
                <View>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>你曾确诊过心理/精神类疾病吗？</Text>
                    </View>

                    <View style={{ marginTop: 80, alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: colors[0], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['orange', '#fff'],

                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>没有</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[1], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', 'orange'],
                                    score: this.props.route.params.score + 0.5
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>有</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 问题主体  结束 */}
            </View>
        );
    }
}