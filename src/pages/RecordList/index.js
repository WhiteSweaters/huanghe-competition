import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { FlatList, View, Text, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';

@inject("RootStore")
@observer
export default class RecordList extends React.Component {

    static contextType = NavigationContext;

    state = {
        evaluationList: []
    }

    componentDidMount() {
        this.getUserAppointmentStatus();
    }

    // 获取当前用户预约信息
    getUserAppointmentStatus = async () => {
        await axios.get(BASE_URL + "/evaluation/getUserAppointmentStatus/" + this.props.RootStore.telephone).then(res => {
            this.setState({ evaluationList: res.data.data });
        })
    }

    // 取消预约
    cancelBooking = async (telephone, orderDate) => {
        axios.get(BASE_URL + "/evaluation/cancelBooking?telephone=" + telephone + "&orderDate=" + orderDate).then(res => {
            if (!res.data.status) {
                ToastAndroid.show(res.data.errMsg, 2000);
                return;
            }
            ToastAndroid.show(res.data.errMsg,2000);
            this.context.navigate("RecordList");
        })
    }

    render() {
        const { evaluationList } = this.state;

        return (
            <View>
                <XLNav title={"我的预约"} />
                <>
                    <FlatList
                        data={evaluationList}
                        renderItem={({ item }) =>
                            <View style={{
                                backgroundColor: '#fff', width: '90%',
                                height: 160, alignSelf: 'center', marginTop: 10, borderRadius: 8, marginBottom: 20
                            }}>
                                {/* 取号状态  开始 */}
                                <View style={{
                                    width: '90%', height: 30, alignSelf: 'center', margin: 5,
                                    borderBottomColor: '#f3f4f4',
                                    borderBottomWidth: 2, justifyContent: 'center'
                                }}>
                                    <Text style={{ color: '#99c7d7', fontWeight: '700' }}>待取号</Text>
                                </View>
                                {/* 取号状态  结束 */}

                                {/* 基本信息  开始 */}
                                <View style={{ paddingHorizontal: 16, flexDirection: "row" }}>
                                    <Text style={{ fontWeight: '700', color: '#aaa', width: 100 }}>姓名</Text>
                                    <Text style={{ fontWeight: '700', color: '#666' }}>{item.name}</Text>
                                </View>
                                <View style={{ paddingHorizontal: 16, flexDirection: "row", marginTop: 5 }}>
                                    <Text style={{ fontWeight: '700', color: '#aaa', width: 100 }}>预约业务</Text>
                                    <Text style={{ fontWeight: '700', color: '#666' }}>心理咨询</Text>
                                </View>
                                <View style={{ paddingHorizontal: 16, flexDirection: "row", marginTop: 5 }}>
                                    <Text style={{ fontWeight: '700', color: '#aaa', width: 100 }}>预约时间</Text>
                                    <Text style={{ fontWeight: '700', color: '#666' }}>{item.orderDate}</Text>
                                </View>
                                {/* 基本信息  结束 */}

                                {/* 相关操作  开始 */}
                                <View style={{
                                    width: '90%', height: 60, alignSelf: 'center', margin: 5,
                                    borderTopColor: '#f3f4f4',
                                    borderTopWidth: 2, flexDirection: 'row-reverse', alignItems: 'center'
                                }}>
                                    <Button title={"取消预约"} titleStyle={{ fontSize: 12, color: '#333' }} buttonStyle={{ width: 80, height: 30, borderRadius: 15, backgroundColor: '#e4e5e9' }}
                                        onPress={() => {
                                            this.cancelBooking(item.telephone, item.orderDate);
                                        }}
                                    />
                                    <Button title={"查看详情"} titleStyle={{ fontSize: 12 }} buttonStyle={{ width: 80, height: 30, borderRadius: 15, marginRight: 5 }}
                                        onPress={() => {
                                            this.context.navigate("Record", {
                                                name: item.name,
                                                telephone: item.telephone,
                                                orderDate1: item.orderDate
                                            })
                                        }}
                                    />
                                </View>
                                {/* 相关操作  结束 */}
                            </View>
                        } />
                </>
            </View>
        );
    }
}