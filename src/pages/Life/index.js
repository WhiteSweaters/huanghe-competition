import axios from 'axios';
import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';
import { SvgXml } from 'react-native-svg';
import { anxiety, depression, empty, forwarding, insomnia, more, pinlun, position, zan } from '../../assets/svgs';

export default class Life extends React.Component {

    params = {
        currentPage: 1,
        pageSize: 5
    }

    isLoading = false;

    state = {
        data: []
    };

    componentDidMount() {
        this.getLifeByUid();
    }

    // 获取后台数据方法
    getLifeByUid = async () => {
        await axios.get(BASE_URL + "/community/getLifeByUid?uid=" + this.props.route.params.uid + "&currentPage=" + this.params.currentPage + "&pageSize=" + this.params.pageSize).then(res => {
            console.log(res);
            this.setState({ data: res.data.data.pageList });
        })
    }

    // 滚动条触底事件
    onEndReached = () => {
        if ((this.params.currentPage >= this.state.totalPage) || this.isLoading) {
            return;
        } else {
            this.isLoading = true;
            this.params.currentPage++;
            this.getLifeByUid()
        }
    }

    render() {

        const { data } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <XLNav title={'好友动态'} />
                <>
                    <FlatList
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                        data={data}
                        renderItem={({ item }) => <View style={{ flexDirection: 'row', padding: 20 }}>
                            {/* 左边部分结构  开始 */}
                            <View>
                                {/* 用户头像  开始 */}
                                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.headerImage }} />
                                {/* 用户头像  结束 */}
                            </View>
                            {/* 左边部分结构  结束 */}

                            {/* 右边部分  开始 */}
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ flexDirection: "row" }}>
                                    {/* 昵称及动态位置  开始 */}
                                    <View>
                                        {/* 作者昵称  开始 */}
                                        <Text style={{ fontWeight: '700' }}>{item.nickname}</Text>
                                        {/* 作者昵称  结束 */}

                                        {/* 动态发布的地点  开始 */}
                                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                            <SvgXml xml={position} width={16} height={16} />
                                            <Text style={{ color: '#ccc' }}>{item.street}</Text>
                                        </View>
                                        {/* 动态发布的地点  结束 */}
                                    </View>
                                    {/* 昵称及动态位置  结束 */}

                                    <View style={{ marginLeft: 80, flexDirection: 'row', alignItems: 'center' }}>
                                        <Button title={"关注"} buttonStyle={{ backgroundColor: '#25d3d1', width: 60, height: 30, borderRadius: 15 }}
                                            titleStyle={{ fontSize: 11 }}
                                        />
                                        <TouchableOpacity style={{ marginLeft: 10 }}>
                                            <SvgXml xml={more} width={20} height={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* 动态内容  开始 */}
                                <ScrollView horizontal style={{ marginTop: 10 }}>
                                    {item.imageList.map((v, i) => <Image key={i} style={{
                                        width: 100,
                                        height: 150,
                                        marginRight: 5
                                    }} source={{ uri: v }} />)}


                                </ScrollView>
                                <Text style={{ marginTop: 5, fontWeight: '700', fontSize: 16 }}>{item.content}</Text>
                                {/* 动态内容  结束 */}

                                {/* 相关操作  开始 */}
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <TouchableOpacity>
                                        <SvgXml xml={forwarding} width={20} height={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: 120, flexDirection: 'row' }}>
                                        <SvgXml xml={zan} width={20} height={20} />
                                        <Text>99</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <SvgXml xml={pinlun} width={20} height={20} />
                                        <Text>99</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* 相关操作  结束 */}
                            </View>
                            {/* 右边部分  结束 */}
                        </View>}
                        keyExtractor={Math.random}
                    />
                </>

            </View>
        );
    }
} 