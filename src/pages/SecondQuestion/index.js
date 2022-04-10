import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import XLNav from '../TabBar/XLNav';

export default class SecondQuestion extends React.Component {

    static contextType = NavigationContext;

    state = {
        colors: ['#fff', '#fff', '#fff', '#fff'],
        reasonList: this.props.route.params.reasonList,
        score: 0
    }

    render() {
        const { colors, reasonList, score } = this.state;
        return (
            <View>
                <XLNav title={"第二题"} funcText={"下一题"} submitIdea={() => {
                    this.context.navigate("ThirdQuestion", {
                        reasonList, score
                    });
                }} />

                {/* 问题主体  开始 */}
                <View>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>你面临的问题/困扰对你造成的负面影响范围有多大？</Text>
                    </View>

                    <View style={{ marginTop: 80, alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: colors[0], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['orange', '#fff', '#fff', '#fff'],
                                    score: 0.5
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>有一些，但在可控范围内</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[1], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', 'orange', '#fff', '#fff'],
                                    score: 1
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>比较大，我偶尔无法控制</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[2], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', '#fff', 'orange', '#fff'],
                                    score: 1.5
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>很大，我无法控制</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[3], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', '#fff', '#fff', 'orange'],
                                    score: 0
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>不确定，我无法判断</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 问题主体  结束 */}
            </View>
        );
    }
}