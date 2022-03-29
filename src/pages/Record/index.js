import React from 'react';
import { Image, Text, View } from 'react-native';
import XLNav from '../TabBar/XLNav';

export default class Record extends React.Component {


    state={
        evaluation:{}
    }

    render() {
        const { name, telephone, orderDate1 } = this.props.route.params;
        return (
            <View style={{ backgroundColor: '#7ed37d', flex: 1, position: 'relative' }}>
                <XLNav title={"预约结果"} />

                <View style={{
                    position: 'absolute', backgroundColor: '#fff', height: 670,
                    width: '90%', borderRadius: 8, alignSelf: 'center', top: 70
                }}>
                    <View>
                        {/* 两个装饰用半圆  开始 */}
                        <View style={{
                            width: 16, height: 16, borderRadius: 8,
                            backgroundColor: '#7cd37a', position: 'absolute',
                            top: 200, left: -8
                        }}>

                        </View>
                        <View style={{
                            width: 16, height: 16, borderRadius: 8,
                            backgroundColor: '#7cd37a', position: 'absolute',
                            top: 200, right: -8
                        }}>

                        </View>
                        {/* 两个装饰用半圆  结束 */}

                        {/* 预约成功图标  开始 */}
                        <View style={{
                            width: '90%', height: 208, alignSelf: 'center',
                            borderBottomWidth: 2, borderBottomColor: '#f7f7f7',
                            alignItems: "center", justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/images/success.png')} />
                        </View>
                        {/* 预约成功图标  结束 */}

                        {/* 预约详情  开始 */}
                        <View style={{ padding: 20 }}>
                            {/* 预约业务  开始 */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '700', color: '#aaa' }}>预约业务</Text>
                                <Text style={{ fontWeight: '700', color: '#666' }}>心理咨询</Text>
                            </View>
                            {/* 预约业务  结束 */}

                            {/* 预约人姓名  开始 */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontWeight: '700', color: '#aaa' }}>预约人姓名</Text>
                                <Text style={{ fontWeight: '700', color: '#666' }}>{name}</Text>
                            </View>
                            {/* 预约人姓名  结束 */}

                            {/* 预约时间  开始 */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontWeight: '700', color: '#aaa' }}>预约时间</Text>
                                <Text style={{ fontWeight: '700', color: '#666' }}>{orderDate1}</Text>
                            </View>
                            {/* 预约时间  结束 */}

                            {/* 预约时间  开始 */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontWeight: '700', color: '#aaa' }}>机构名称</Text>
                                <Text style={{ fontWeight: '700', color: '#666' }}>华中师范大学心理健康教育中心</Text>
                            </View>
                            {/* 预约时间  结束 */}

                            {/* 预约人联系方式  开始 */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontWeight: '700', color: '#aaa' }}>预约人联系电话</Text>
                                <Text style={{ fontWeight: '700', color: '#666' }}>{telephone}</Text>
                            </View>
                            {/* 预约人联系方式  结束 */}

                            {/* 温馨提示  开始 */}
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontWeight: '700', color: '#aaa' }}>温馨提示</Text>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontWeight: '700' }}>1、预约信息可在“向TA求助”——“预约记录”中查看</Text>
                                    <Text style={{ fontWeight: '700', marginTop: 10 }}>2、到达预约地点后，请在预约时间后30分钟内取号，逾期号源作废。建议您至少在预约时间前5分钟到场取号，避免错过取号时间</Text>
                                    <Text style={{ fontWeight: '700', marginTop: 10 }}>3、在预约起始时间的30分钟以内将不能取消本次预约，爽约影响下次预约</Text>
                                    <Text style={{ fontWeight: '700', marginTop: 10 }}>4、到场后请勿大声喧哗，以免影响其他预约者的情绪，谢谢您的配合</Text>
                                </View>
                            </View>
                            {/* 温馨提示  结束 */}
                        </View>
                        {/* 预约详情  结束 */}
                    </View>
                </View>
            </View>
        );
    }
}