import axios from 'axios';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav4 from '../TabBar/XLNav4';


const data = '中国睡眠研究会的调查数据显示，中国有3亿多人存在睡眠障碍，成年人的失眠发生率高达38.2%，位居全球第一。喜临门《中国睡眠研究报告2022》显示，全国睡眠超8小时人群不足8%。\\n“到目前为止，睡眠在国内还没有成为一个独立的学科，但是睡眠的疾病已经悄然影响越来越多国人。“\\n首都医科大学附属北京朝阳医院睡眠呼吸中心主任郭兮恒近期在一档名为《11点睡吧》的综艺中呼吁，人生有三分之一的时间都在睡眠中度过，睡眠问题应该得到重视。\\n不论你现在是否睡得香，第20个世界睡眠8即将到来，对于睡眠这件事，你真的了解吗?';
export default class Journalism extends React.Component {

    state = {
        journalismDetails: []
    }

    componentDidMount() {
        this.getDetailsByJid();
    }

    // 获取当前新闻信息
    getDetailsByJid = async () => {
        const { item } = this.props.route.params;
        await axios.get(BASE_URL + "/user/getDetailsByJid/" + item.id).then(res => {
            this.setState({
                journalismDetails: res.data.data
            })
        })
    }

    render() {
        const { item } = this.props.route.params;
        const { journalismDetails } = this.state;
        return (
            <ScrollView>
                {/* 头部  用于介绍文章的标题、作者、出处等  开始 */}
                <View style={{ padding: 20 }}>
                    {/* 标题  开始 */}
                    <View>
                        <Text style={{ fontSize: 22, fontWeight: '700', color: '#555' }}>{item.title}</Text>
                    </View>
                    {/* 标题  结束 */}

                    {/* 文章出处  开始 */}
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <Text style={{ color: '#aaa' }}>{item.author}</Text>
                        <Text style={{ marginLeft: 10, color: '#667699' }}>{item.press}</Text>
                        <Text style={{ marginLeft: 10, color: '#aaa' }}>{item.releaseTime}</Text>
                    </View>
                    {/* 文章出处  结束 */}
                </View>
                {/* 头部  用于介绍文章的标题、作者、出处等  结束 */}

                {/* 中间部分  用于搞气氛  开始 */}
                <View style={{
                    width: '70%', height: 60, alignSelf: 'center', marginTop: 30,
                    borderWidth: 1.5, borderLeftWidth: 0, borderRightWidth: 0, borderColor: '#aaa',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ fontWeight: '700', color: '#aaa' }}>{item.tag}</Text>
                </View>
                {/* 中间部分  结束 */}

                {/* 引言  开始 */}
                <View style={{ marginTop: 20, padding: 20 }}>
                    <Text style={{ fontWeight: '700', color: '#555', fontSize: 16, lineHeight: 30 }}>{item.introduction.replace(/\\n/g, '\n\n')}</Text>
                </View>
                {/* 引言  结束 */}

                {/* 内容  开始 */}
                <>
                    <FlatList
                        keyExtractor={Math.random}
                        data={journalismDetails}
                        renderItem={({ item }) => <View style={{ padding: 20 }}>
                            {/* 小标题  开始 */}
                            <Text style={{ alignSelf: 'center', fontSize: 18, color: '#2c557d', marginBottom: 20 }}>{item.title}</Text>
                            {/* 小标题  结束 */}

                            {/* 此段内容  开始 */}
                            <Text style={{ fontWeight: '700', color: '#555', fontSize: 16, lineHeight: 30 }}>{item.content.replace(/\\n/g, '\n\n')}</Text>
                            {/* 此段内容  结束 */}

                            {/* 图片  开始 */}
                            <Image source={{ uri: item.image }}
                                style={{ width: '100%', height: 200, marginVertical: 20 }}
                            />
                            {/* 图片  结束 */}
                        </View>}
                    />
                </>

                {/* 内容  结束 */}
            </ScrollView>
        );
    }
}