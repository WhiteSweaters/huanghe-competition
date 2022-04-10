import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import XLNav from '../TabBar/XLNav';
import { BASE_URL } from '../../utils/BaseUrl'

export default class FifthQuestion extends React.Component {

    static contextType = NavigationContext;

    state = {
        colors: ['#fff', '#fff', '#fff'],
        result: '',
        reasonList: this.props.route.params.reasonList,
        score: this.props.route.params.score
    }



    render() {
        const { colors, reasonList, score } = this.state;
        return (
            <View>
                <XLNav title={"第五题"} funcText={"提交"} submitIdea={() => {
                    this.context.navigate("Result", {
                        reasonList, score
                    });
                }} />
                {/* 问题主体  开始 */}
                <View>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>确诊病例的严重程度是？（若没有，请忽略此题）</Text>
                    </View>

                    <View style={{ marginTop: 80, alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: colors[0], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['orange', '#fff', '#fff'],
                                    score: this.props.route.params.score + 0.5
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>轻度</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[1], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', 'orange', '#fff'],
                                    score: this.props.route.params.score + 1

                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>中度</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[2], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', '#fff', 'orange'],
                                    score: this.props.route.params.score + 1.5
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>重度</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 问题主体  结束 */}
            </View>
        );
    }
}