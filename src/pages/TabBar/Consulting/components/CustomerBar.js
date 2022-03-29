import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default class CustomerBar extends React.Component {

    render() {
        // console.log(this.props);
        const { goToPage, tabs, activeTab } = this.props;
        // goToPage :函数、负责跳转页面
        // tabs:标题数组
        // activeTab:当前激活选中的索引
        return (
            <ImageBackground style={{ height: 60, flexDirection: 'row', paddingLeft: 20, paddingRight: 20, justifyContent: 'space-evenly' }}
                source={require('../../../../assets/images/scrowImage.jpg')}>
                {tabs.map((v, i) => <TouchableOpacity key={i} style={{
                    justifyContent: 'center', borderBottomColor: '#fff',
                    borderBottomWidth: activeTab === i ? 3 : 0
                }}>
                    <Text style={{ color: 'white', fontSize: activeTab === i ? 26 : 20 }}>{v}</Text>
                </TouchableOpacity>)}
            </ImageBackground>
        );
    }
}