import axios from 'axios';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav4 from '../TabBar/XLNav4';

export default class QuestionDetails extends React.Component {

    state = {
        queAndAnsList: []
    }

    componentDidMount() {
        this.getQuestionDetailsById();
    }

    // 获取对应问答详情
    getQuestionDetailsById = async () => {
        const { item } = this.props.route.params;
        await axios.get(BASE_URL + "/user/getQuestionDetailsById/" + item.id).then(res => {
            this.setState({
                queAndAnsList: res.data.data
            })
        })
    }

    render() {
        const { item } = this.props.route.params;
        const { queAndAnsList } = this.state;
        console.log(queAndAnsList);
        return (
            <ScrollView>
                <XLNav4 title={item.title} />
                {/* 主题图片  开始 */}
                <Image source={{ uri: item.image }} style={{
                    width: '100%', height: 200
                }} />
                {/* 主题图片  结束 */}

                <View style={{ padding: 20 }}>
                    {/* 标题  开始 */}
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>{item.title}</Text>
                    </View>
                    {/* 标题  结束 */}

                    {/* 问答栏  开始 */}
                    <>
                        <FlatList
                            keyExtractor={Math.random}
                            data={queAndAnsList}
                            renderItem={({ item }) => <View style={{ marginTop: 50 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>Step</Text> */}
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>{item.question}</Text>
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    {/* <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>A：</Text> */}
                                    <Text>{item.answer.replace(/\\n/g, '\n')}</Text>
                                </View>
                            </View>}

                        />

                    </>
                    {/* 问答栏  结束 */}
                    {/* 底部留白  开始 */}
                    <View style={{ height: 100 }}>

                    </View>
                    {/* 底部留白  结束 */}
                </View>
            </ScrollView>
        );
    }
}