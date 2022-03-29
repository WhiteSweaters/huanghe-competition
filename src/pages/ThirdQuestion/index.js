import { NavigationContext } from '@react-navigation/native';
import React from 'react';
import { Text, View ,TouchableOpacity} from 'react-native';
import XLNav from '../TabBar/XLNav';

export default class ThirdQuestion extends React.Component {

    static contextType = NavigationContext;

    state = {
        score: this.props.route.params.score,
        colors:['#fff','#fff','#fff','#fff','#fff']
    }

    render() {
        const { score ,colors} = this.state;

        return (
            <View>
                <XLNav title={"第三题"} funcText={"下一题"} submitIdea={() => {
                    this.context.navigate("FourthQuestion", {
                        score
                    });
                }} />
                {/* 问题主体  开始 */}
                <View>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>你面临的问题/困扰对你造成的负面影响持续多久了？</Text>
                    </View>

                    <View style={{ marginTop: 80, alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: colors[0], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['orange', '#fff', '#fff', '#fff', '#fff'],
                                    score: this.props.route.params.score * 1.2
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>不到一个月</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[1], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', 'orange', '#fff', '#fff', '#fff'],
                                    score: this.props.route.params.score * 2
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>1~3个月</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[2], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', '#fff', 'orange', '#fff', '#fff'],
                                    score: this.props.route.params.score * 1.5
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>4~6个月</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[3], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', '#fff', '#fff', 'orange', '#fff'],
                                    score: this.props.route.params.score * 2
                                })
                            }}
                        >
                            <Text style={{ fontWeight: '700' }}>6个月以上</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: colors[4], width: '80%', height: 50,
                            borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10
                        }}
                            onPress={() => {
                                this.setState({
                                    colors: ['#fff', '#fff', '#fff', '#fff', 'orange']
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