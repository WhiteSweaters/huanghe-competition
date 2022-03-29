import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, FlatList, ToastAndroid, Modal } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import { anxiety, depression, empty, forwarding, insomnia, more, pinlun, position, zan } from '../../../../assets/svgs';
import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/BaseUrl';
import { inject, observer } from 'mobx-react';


@inject("RootStore")
@observer
export default class Community extends React.Component {

    static contextType = NavigationContext;

    params = {
        currentPage: 1,
        pageSize: 5
    }

    // 异步加载分页的节流阀
    isLoading = false;

    state = {
        queryConditions: '',  //TODO
        tag: '',              //用户的标签
        data: [],             //动态内容的数据(从后台返回)
        totalPage: 2,         //默认的总页数
        modalVisible: false,  //默认的Modal组件不显示
        hearts: 17
    }

    componentDidMount() {
        this.getCommunityInfo();
    }

    // 从后台获取动态有关数据(滚动条触底之后调用)
    getCommunityInfo2 = async (tag) => {
        await axios.post(BASE_URL + "/community/getCommunityInfo", {
            currentPage: this.params.currentPage + '',
            pageSize: this.params.pageSize + '',
            queryConditions: this.state.queryConditions,
            tag: tag
        }).then(res => {
            this.setState({
                data: [...this.state.data, ...res.data.data.pageList],
                totalPage: res.data.data.totalPage
            });
        });
        this.isLoading = false;
    }

    // 从后台获取动态有关数据(除去滚动条触底之后调用)
    getCommunityInfo = async (tag) => {
        await axios.post(BASE_URL + "/community/getCommunityInfo", {
            currentPage: this.params.currentPage + '',
            pageSize: this.params.pageSize + '',
            queryConditions: this.state.queryConditions,
            tag: tag
        }).then(res => {
            this.setState({
                data: res.data.data.pageList,
                totalPage: res.data.data.totalPage
            });
        });
        this.isLoading = false;
    }

    // 选择标签时还原组件状态
    toBegin = () => {
        this.params.currentPage = 1;
        this.params.pageSize = 5;
        this.isLoading = false;
    }

    searchForMessages = (value) => {

    }

    handleChange = e => {
        this.setState({ queryConditions: e });
    }

    // 滚动条触底事件
    onEndReached = () => {
        if ((this.params.currentPage >= this.state.totalPage) || this.isLoading) {
            return;
        } else {
            this.isLoading = true;
            this.params.currentPage++;
            this.getCommunityInfo2(this.state.tag);
        }
    }

    // 关注按钮 点击关注对应用户
    takeCareOf = async (id) => {
        await axios.get(BASE_URL + "/user/takeCareOf?caredId=" + this.props.RootStore.uid + "&beCaredOfId=" + id).then(res => {
            ToastAndroid.show(res.data.errMsg, 2000);
        });
    }

    // 切换Modal组件可见与否的函数
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    // 举报动态
    toReport = async (cid) => {
        await axios.get(BASE_URL + "/user/toReport/" + cid).then(res => {
            ToastAndroid.show(res.data.errMsg, 2000);
        });
    }

    render() {
        const { queryConditions, data, modalVisible } = this.state;
        console.log(data);
        return (
            <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                {/* 搜索框  开始 */}
                <View>
                    <Input
                        leftIcon={<Icon name='search' />} placeholder={'输入您感兴趣的话题...'}
                        containerStyle={{ width: '80%', alignSelf: 'center', height: 40, marginTop: 10 }}
                        onSubmitEditing={() => {
                            this.getCommunityInfo();
                        }}
                        value={queryConditions}
                        onChangeText={this.handleChange}
                    />
                </View>
                {/* 搜索框  结束 */}


                {/* 选择对应话题标签  开始 */}
                <View style={{ padding: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.toBegin();
                            this.getCommunityInfo("抑郁");
                            this.setState({
                                tag: '抑郁'
                            });
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc' }}>
                        <SvgXml xml={depression} width={'100%'} height={'100%'} />
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>#抑郁</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.toBegin();
                            this.getCommunityInfo("失眠");
                            this.setState({
                                tag: '失眠'
                            });
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc' }}>
                        <SvgXml xml={insomnia} width={'100%'} height={'100%'} />
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>#失眠</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.toBegin();
                            this.getCommunityInfo("焦虑");
                            this.setState({
                                tag: '焦虑'
                            });
                        }}

                        style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc' }}>
                        <SvgXml xml={anxiety} width={'100%'} height={'100%'} />
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>#焦虑</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.toBegin();
                            this.getCommunityInfo("放空");
                            this.setState({
                                tag: '放空'
                            });
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc' }}>
                        <SvgXml xml={empty} width={'100%'} height={'100%'} />
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>#放空</Text>
                    </TouchableOpacity>
                </View>
                {/* 选择对应话题标签  结束 */}

                {/* 动态主体  开始 */}
                <>
                    <FlatList
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                        data={data ? data : ''}
                        renderItem={({ item }) => <View style={{ flexDirection: 'row', padding: 20 }}>
                            {/* 左边部分结构  开始 */}
                            <View>
                                {/* 用户头像  开始 */}
                                <TouchableOpacity onPress={() => {
                                    console.log(item.uid);
                                    this.context.navigate("Others", {
                                        uid: item.uid
                                    })
                                }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.headerImage }} />
                                </TouchableOpacity>

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
                                            onPress={() => { this.takeCareOf(item.uid) }}
                                        />
                                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { this.setModalVisible(!modalVisible) }}>
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
                                    <TouchableOpacity style={{ marginLeft: 120, flexDirection: 'row' }} onPress={() => {
                                        this.setState({ hearts: this.state.hearts + 1 });
                                    }}>
                                        <SvgXml xml={zan} width={20} height={20} />
                                        <Text>{this.state.hearts + item.commentNum}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row' }}
                                        onPress={() => {
                                            this.context.navigate("Comment", {
                                                cid: item.id,
                                                uid: this.props.RootStore.uid
                                            })
                                        }}
                                    >
                                        <SvgXml xml={pinlun} width={20} height={20} />
                                        <Text>{item.commentNum}</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* 相关操作  结束 */}

                                <View style={{ width: "100%", backgroundColor: '#eee', borderRadius: 4 }}>
                                    <FlatList
                                        data={item.commentList ? item.commentList : ''}
                                        renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#003366', fontWeight: '700' }}>{item.nickname}：</Text>
                                            <Text>{item.content}</Text>
                                        </View>}
                                        keyExtractor={Math.random}
                                    />
                                </View>
                            </View>
                            {/* 右边部分  结束 */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(!modalVisible);
                                }}>
                                <View style={{ position: "relative", width: 300, height: 100, borderRadius: 8, backgroundColor: '#f3f5f7', alignSelf: 'center', marginTop: '60%' }}>
                                    <Text style={{ fontSize: 16, alignSelf: 'center', fontWeight: '700', color: 'blue' }}>您确定要举报这条动态吗？</Text>
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute", bottom: 0, right: 0, width: 75, height: 30, borderRadius: 8,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                        onPress={() => { this.setModalVisible(!modalVisible) }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'red' }}>取消</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute", bottom: 0, left: 0, width: 75, height: 30, borderRadius: 8,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                        onPress={() => {
                                            this.toReport(item.id);
                                            this.setModalVisible(!modalVisible);
                                        }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'red' }}>确定</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>}
                        keyExtractor={Math.random}
                    />
                </>
                {/* 动态主体  结束 */}

                {/* 添加动态  开始 */}
                <TouchableOpacity
                    style={{
                        position: 'absolute', right: '10%', bottom: '10%', width: 60, height: 60,
                        backgroundColor: '#22d4d1', borderRadius: 30, alignItems: 'center', justifyContent: 'center'
                    }}
                    onPress={() => {
                        this.context.navigate("PublishComment", {
                            myId: this.props.RootStore.uid
                        });
                    }}>
                    <Text style={{ color: '#fff', fontSize: 40 }}>+</Text>
                </TouchableOpacity>
                {/* 添加动态  结束 */}

            </ScrollView>
        );
    }
}