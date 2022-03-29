import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default class CustomerBar2 extends React.Component {

    render() {
        // console.log(this.props);
        const { goToPage, tabs, activeTab } = this.props;
        // goToPage :函数、负责跳转页面
        // tabs:标题数组
        // activeTab:当前激活选中的索引
        return (
            <View style={{ height: 60, flexDirection: 'row', paddingLeft: 20, paddingRight: 20, justifyContent: 'space-evenly' }}
            >
                {tabs.map((v, i) => <TouchableOpacity key={i} onPress={() => {
                    goToPage(i)
                }} style={{
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: activeTab === i ? '#3399FF' : '#333' }}>{v}</Text>
                </TouchableOpacity>)}
            </View>
        );
    }
}