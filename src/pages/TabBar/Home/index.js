import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ImageBackground, ScrollView, FlatList, Image } from 'react-native';
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view';
import { SvgXml } from 'react-native-svg';
import { game, movie, psychologicalConsultation, psychologicalEvaluation, radio, rightArrow, scroll, whiteNoise } from '../../../assets/svgs';
import { BASE_URL } from '../../../utils/BaseUrl';

export default class Home extends React.Component {

  state = {
    data: [1, 2, 3] //深度报道有关集合/数组
  }

  componentDidMount() {
    this.getJournalismList();
  }

  // 获取新闻报道集合
  getJournalismList = async () => {

    await axios.get(BASE_URL + "/user/getJournalismList").then(res => {
      this.setState({
        data: res.data.data
      })
    })

  }


  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <ImageHeaderScrollView
        maxHeight={190}
        minHeight={60}
        headerImage={require("../../../assets/images/scrowImage.jpg")}
        renderForeground={() => (
          <View style={{ height: 150, justifyContent: "space-between", alignItems: "center", flexDirection: 'row', paddingHorizontal: 70 }} >
            {/* 心灵驿站  开始 */}
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Radio");
            }}>
              <SvgXml xml={radio} width={50} height={50} />
              <Text style={{ fontWeight: '700' }}>心灵驿站</Text>
            </TouchableOpacity>
            {/* 心灵驿站  结束 */}

            {/* 心理测评  开始 */}
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Evaluation");
            }}>
              <SvgXml xml={psychologicalEvaluation} width={50} height={50} />
              <Text style={{ fontWeight: '700' }}>心理测评</Text>
            </TouchableOpacity>
            {/* 心理测评  结束 */}

            {/* 咨询预约  开始 */}
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("Consultation");
            }}>
              <SvgXml xml={psychologicalConsultation} width={50} height={50} />
              <Text style={{ fontWeight: '700' }}>咨询预约</Text>
            </TouchableOpacity>
            {/* 咨询预约  结束 */}

          </View>
        )}
      >

        <ScrollView style={{ backgroundColor: '#f4f4f4' }}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />
          {/* 上半部分方块  开始 */}
          <View style={{ flexDirection: 'row', padding: 10, width: '100%', borderRadius: 8, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10 }}>

            {/* 答案之书  开始 */}
            <TouchableOpacity style={{
              width: 150, height: 150, borderRadius: 8,
              backgroundColor: 'orange', justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => {
                this.props.navigation.navigate("Answer");
              }}
            >
              <SvgXml xml={scroll} width={80} height={80} />
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>答案之书</Text>
            </TouchableOpacity>
            {/* 答案之书  结束 */}

            <View style={{ width: 180, height: 150, marginLeft: 25 }}>
              {/* 每日电影和句子  开始 */}
              <TouchableOpacity style={{
                width: '100%', height: 70, backgroundColor: 'skyblue', borderRadius: 8,
                alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10
              }}
                onPress={() => {
                  this.props.navigation.navigate("MovieList")
                }}
              >
                <SvgXml xml={movie} width={50} height={50} />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 15 }}>今日好片</Text>
              </TouchableOpacity>
              {/* 每日电影和句子  结束 */}

              {/* 每日十句  开始 */}
              <TouchableOpacity style={{
                width: '100%', height: 70, backgroundColor: 'pink', marginTop: 10,
                borderRadius: 8, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10
              }}
                onPress={() => {
                  this.props.navigation.navigate("Sentence")
                }}
              >
                <SvgXml xml={whiteNoise} width={50} height={50} />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 15 }}>每日十句</Text>
              </TouchableOpacity>
              {/* 每日十句  结束 */}
            </View>
          </View>
          {/* 上半部分方块  结束 */}

          {/*  每日正念  开始*/}
          <TouchableOpacity style={{
            flexDirection: 'row', marginBottom: 10, width: '100%',
            height: 100, backgroundColor: '#fff', marginTop: 10, alignItems: 'center', paddingHorizontal: 20

          }}
            onPress={() => {
              this.props.navigation.navigate("ActiveMood");
            }}
          >
            <SvgXml xml={game} width={50} height={50} />
            <Text style={{ fontWeight: '700', fontSize: 16, marginLeft: 15 }}>每日正念</Text>
            <SvgXml xml={rightArrow} width={30} height={30} style={{ marginLeft: 140 }} />
          </TouchableOpacity>
          {/*  每日正念  结束*/}

          {/* //TODO 深度报道  开始 */}
          <>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>深度报道</Text>
            <FlatList
              keyExtractor={Math.random}
              data={data}
              renderItem={({ item }) => <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: '#fff', width: '100%', height: 100,
                borderBottomColor: '#eee', borderBottomWidth: 2, paddingHorizontal: 20, paddingVertical: 10
              }}
                onPress={() => {
                  this.props.navigation.navigate("Journalism", {
                    item
                  });
                }}
              >
                {/* 新闻内容简介  开始 //TODO */}
                <View style={{ width: 220, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: '400', color: '#000' }}>{item.title}</Text>
                </View>
                {/* 新闻内容简介  结束 */}
                <Image source={{ uri: item.image }}
                  style={{ width: 143, height: 100 }}
                />
              </TouchableOpacity>}
            />
          </>
          {/* //TODO 深度报道  结束 */}

        </ScrollView>
      </ImageHeaderScrollView>
    );
  }
}