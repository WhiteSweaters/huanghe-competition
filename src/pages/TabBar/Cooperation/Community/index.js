import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, FlatList, ToastAndroid, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import { beishang, chongmanxiwang, depression, deyi2, fangkong, fanzao, forwarding, jiaolv, jingju, meizizi, more, pijuan, pinlun, position, shimian, weinan, xiaoku, zan } from '../../../../assets/svgs';
import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/BaseUrl';
import { inject, observer } from 'mobx-react';


const tagList = [
    {
        id: 1,
        tag: '抑郁',
        svg: depression
    },
    {
        id: 2,
        tag: '焦虑',
        svg: jiaolv
    },
    {
        id: 3,
        tag: '惊惧',
        svg: jingju
    },
    {
        id: 4,
        tag: '悲伤',
        svg: beishang
    },
    {
        id: 5,
        tag: '烦躁',
        svg: fanzao
    },
    {
        id: 6,
        tag: '失眠',
        svg: shimian
    },
    {
        id: 7,
        tag: '疲倦',
        svg: pijuan
    },
    {
        id: 8,
        tag: '畏难',
        svg: weinan
    },
    {
        id: 9,
        tag: '放空',
        svg: fangkong
    },
    {
        id: 10,
        tag: '美滋滋',
        svg: meizizi
    },
    {
        id: 11,
        tag: '充满希望',
        svg: chongmanxiwang
    },
    {
        id: 12,
        tag: '笑哭',
        svg: xiaoku
    },
    {
        id: 13,
        tag: '得意',
        svg: deyi2
    }
]
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
        const { data, modalVisible } = this.state;
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                {/* 选择对应话题标签  开始 */}
                <ScrollView style={{ padding: 20, height: 140 }} horizontal>
                    {tagList.map((value, index) => <TouchableOpacity key={index} onPress={() => {
                        this.toBegin();
                        this.getCommunityInfo(value.tag);
                        this.setState({
                            tag: value.tag
                        })
                    }}
                        style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
                    >
                        <SvgXml xml={value.svg} width={'100%'} height={'100%'} />
                        <Text style={{ alignSelf: 'center', fontWeight: '700' }}>#{value.tag}</Text>
                    </TouchableOpacity>)}
                </ScrollView>
                {/* 选择对应话题标签  结束 */}

                {/* 动态主体  开始 */}
                <>
                    <FlatList
                        onEndReached={() => {
                            this.onEndReached();
                        }}
                        onEndReachedThreshold={0.1}
                        data={data ? data : ''}
                        renderItem={({ item }) => <View style={{ flexDirection: 'row', padding: 20 }}>
                            {/* 左边部分结构  开始 */}
                            <View>
                                {/* 用户头像  开始 */}
                                <TouchableOpacity onPress={() => {
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
                                <View style={{ marginTop: 5, width: '80%' }}>
                                    <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.content.replace(/\\n/g, '\n')}</Text>
                                    <ScrollView horizontal style={{ marginTop: 10 }}>
                                        {item.imageList.map((v, i) => <Image key={i} style={{
                                            width: 150,
                                            height: 150,
                                            marginRight: 5
                                        }} source={{ uri: v }} />)}
                                    </ScrollView>
                                    {/* 动态内容  结束 */}
                                </View>

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

                                <View style={{ width: "90%", backgroundColor: '#eee', borderRadius: 4 }}>
                                    <FlatList
                                        data={item.commentList ? item.commentList : ''}
                                        renderItem={({ item }) => <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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

            </View>
        );
    }
}