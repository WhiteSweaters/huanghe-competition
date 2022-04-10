import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, FlatList, Image } from 'react-native';
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view';
import { SvgXml } from 'react-native-svg';
import { bookStore, game, kownledge, meditation, movie, radio, rightArrow, whiteNoise } from '../../../assets/svgs';
import { BASE_URL } from '../../../utils/BaseUrl';

@inject("RootStore")
@observer
export default class Home extends React.Component {

  // 分页参数
  params = {
    currentPage: 1,
    pageSize: 5,
  }

  // 异步加载分页的节流阀
  isLoading = false;

  state = {
    diaryList: [1, 2, 3],//用户日记数组
    postive: 0,//积极天数
    negative: 0,//消极天数
    consecutiveDays: 0,//连续写日记天数
    totalPage: 2,//默认的总页数
    diaryPaginationList: [],//日记分页数据
    totalPage: 2,
    gender: 'male',
  }

  componentDidMount() {
    this.getUserDiaryList();
    this.getConsecutiveDays();
    this.getUserById();
  }

  // 获取用户写日记的情况(累计天数、心理状态等等)
  getUserDiaryList = async () => {
    const { uid } = this.props.RootStore;
    await axios.get(BASE_URL + "/user/getDiaryListByUid/" + uid).then(res => {
      // 获取积极、消极天数
      let postive = 0;
      let negative = 0;
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].tag === '积极') {
          postive++;
        } else if (res.data.data[i].tag === '消极') {
          negative++;
        }
      }
      this.setState({
        diaryList: res.data.data,
        postive, negative
      })
    })
  }

  // 返回连续日记天数
  getConsecutiveDays = async () => {
    await axios.get(BASE_URL + "/user/getConsecutiveDays/" + this.props.RootStore.uid).then(res => {
      this.setState({
        consecutiveDays: res.data.data
      })
    })
  }

  // 返回日记分页列表
  getDiaryListPagination = async () => {
    const { currentPage, pageSize } = this.params;
    await axios.get(BASE_URL + "/user/getDiaryListPagination?uid=" + this.props.RootStore.uid + "&currentPage=" + currentPage + "&pageSize=" + pageSize).then(res => {
      this.setState({
        diaryPaginationList: [...res.data.data.pageList, ...this.state.diaryPaginationList],
        totalPage: res.data.data.totalPage
      })

      this.isLoading = false;
    })
  }

  // 滚动条触底事件
  onEndReached = async () => {
    const { currentPage } = this.params;
    // 判断当前页数是否大于总页数与节流阀是否开启
    if (currentPage >= this.state.totalPage || this.isLoading) {
      return;
    } else {
      this.isLoading = true;
      currentPage++;
      this.getDiaryListPagination();
    }
  }

  // 获取用户性别
  getUserById = async () => {
    await axios.get(BASE_URL + "/user/getUserById/" + this.props.RootStore.uid).then(res => {
      this.setState({
        gender: res.data.data.gender
      })
    })
  }


  render() {
    const { diaryList, postive, negative, consecutiveDays, gender } = this.state;
    console.log(diaryList);
    return (
      <ImageHeaderScrollView
        maxHeight={300}
        minHeight={60}
        headerImage={require("../../../assets/images/scrowImage.jpg")}
        renderForeground={() => (
          <View style={{
            height: 150, position: 'relative'
          }} >
            {/* 遮罩层  开始 */}
            <View style={{
              width: '90%', height: 100, backgroundColor: '#fff', opacity: 0.3, position: 'absolute',
              top: 170, alignSelf: 'center', borderRadius: 8
            }}>
            </View>
            {/* 遮罩层  结束 */}

            {/* 展示用户记录日记多少  开始 */}
            <View style={{ position: 'absolute', top: 80, width: '100%', flexDirection: 'row', justifyContent: 'center', height: 100 }}>
              <Text style={{ color: 'white' }}>累计记录</Text>
              <Text style={{ color: 'white', fontSize: 48, marginTop: -28, fontWeight: '700' }}>{diaryList.length}</Text>
              <Text style={{ color: 'white' }}>天日记</Text>
            </View>
            {/* 展示用户记录日记多少  结束 */}

            {/* 鼓励的话  开始 */}
            <View style={{ position: 'absolute', top: 120, alignItems: 'center', width: '100%' }}>
              <Text style={{ color: '#fff' }}>阳光{gender === 'male' ? "男" : "女"}孩，继续保持积极心态</Text>
            </View>
            {/* 鼓励的话  结束 */}

            {/* 具体分析  开始 */}
            <View style={{ top: 190, position: 'absolute', flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-around' }}>
              {/* 连续写日记天数  开始 */}
              <View style={{ alignItems: 'center' }}>
                <Text>连续记录</Text>
                <Text style={{ marginTop: 20 }}>{consecutiveDays}天</Text>
              </View>
              {/* 连续写日记天数  结束 */}

              {/* 积极天数天数  开始 */}
              <View style={{ alignItems: 'center' }}>
                <Text>积极</Text>
                <Text style={{ marginTop: 20 }}>{postive}天</Text>
              </View>
              {/* 积极天数天数  结束 */}

              {/* 消极天数天数  开始 */}
              <View style={{ alignItems: 'center' }}>
                <Text>消极</Text>
                <Text style={{ marginTop: 20 }}>{negative}天</Text>
              </View>
              {/* 消极天数天数  结束 */}

              {/* 积极天数天数  开始 */}
              <View style={{ alignItems: 'center' }}>
                <Text>心理状况</Text>
                <Text style={{ marginTop: 20 }}>{postive > negative ? "良好" : postive === negative ? "一般" : "需要调整"}</Text>
              </View>
              {/* 积极天数天数  结束 */}

            </View>
            {/* 具体分析  结束 */}
          </View>
        )}
      >

        <View style={{ backgroundColor: '#f4f4f4' }}>
          <StatusBar backgroundColor={'transparent'} translucent={true} />
          {/* 上半部分方块  开始 */}
          <View style={{ flexDirection: 'row', padding: 10, width: '100%', borderRadius: 8, backgroundColor: '#fff', alignSelf: 'center', marginTop: 10 }}>

            {/* 日记模块  开始 */}
            <TouchableOpacity style={{
              width: 150, height: 150, borderRadius: 8,
              backgroundColor: 'orange', justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => {
                this.props.navigation.navigate("Diary", {
                  refresh: ()=>{
                    this.getUserDiaryList();
                    this.getConsecutiveDays();
                  }
                });
              }}
            >
              <SvgXml xml={game} width={80} height={80} />
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>每日一记</Text>
            </TouchableOpacity>
            {/* 日记模块  结束 */}

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
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 15 }}>电影推介</Text>
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
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 15 }}>今日笺言</Text>
              </TouchableOpacity>
              {/* 每日十句  结束 */}
            </View>
          </View>
          {/* 上半部分方块  结束 */}

          {/*  横板方块  开始*/}
          <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* 正念知识  开始 */}
            <TouchableOpacity style={{
              marginBottom: 10, width: '24%', borderRadius: 8, justifyContent: 'center',
              height: 100, backgroundColor: '#fff', marginTop: 10, alignItems: 'center',

            }}
              onPress={() => {
                this.props.navigation.navigate("ActiveMood");
              }}
            >
              <SvgXml xml={kownledge} width={50} height={50} />
              <Text style={{ fontWeight: '700', fontSize: 12 }}>正念知识</Text>
            </TouchableOpacity>
            {/* 正念知识  结束 */}

            {/* 冥想练习  开始 */}
            <TouchableOpacity style={{
              marginBottom: 10, width: '24%', borderRadius: 8, justifyContent: 'center',
              height: 100, backgroundColor: '#fff', marginTop: 10, alignItems: 'center',

            }}
              onPress={() => {
                this.props.navigation.navigate("Meditation");
              }}
            >
              <SvgXml xml={meditation} width={80} height={50} />
              <Text style={{ fontWeight: '700', fontSize: 12 }}>冥想练习</Text>
            </TouchableOpacity>
            {/* 冥想练习  开始 */}

            {/* 心灵驿站  开始 */}
            <TouchableOpacity style={{
              marginBottom: 10, width: '24%', borderRadius: 8, justifyContent: 'center',
              height: 100, backgroundColor: '#fff', marginTop: 10, alignItems: 'center',

            }}
              onPress={() => {
                this.props.navigation.navigate("Radio");
              }}
            >
              <SvgXml xml={radio} width={50} height={50} />
              <Text style={{ fontWeight: '700', fontSize: 12 }}>心灵驿站</Text>
            </TouchableOpacity>
            {/* 心灵驿站  结束 */}

            {/* 书架  开始 */}
            <TouchableOpacity style={{
              marginBottom: 10, width: '24%', borderRadius: 8, justifyContent: 'center',
              height: 100, backgroundColor: '#fff', marginTop: 10, alignItems: 'center',

            }}
              onPress={() => {
                this.props.navigation.navigate("BookStore");
              }}
            >
              <SvgXml xml={bookStore} width={50} height={50} />
              <Text style={{ fontWeight: '700', fontSize: 12 }}>书架</Text>
            </TouchableOpacity>
            {/* 书架  结束 */}


          </View>

          {/*  横板方块  结束*/}

          {/*  用户日记  开始 */}
          <>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>我的日记</Text>

            <FlatList
              keyExtractor={Math.random}
              data={diaryList}
              renderItem={({ item }) => <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: '#fff', width: '100%', height: 100,
                borderBottomColor: '#eee', borderBottomWidth: 2, paddingHorizontal: 20, paddingVertical: 10
              }}
                onPress={() => {
                  this.props.navigation.navigate("DiaryContent", {
                    item
                  });
                }}
              >
                {/* 日记内容简介  开始  */}
                <View style={{ width: 220, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: '400', color: '#000' }}>{item.title}</Text>
                  <Text style={{ fontWeight: '400', color: '#ccc', marginTop: 10, fontSize: 12 }}>{item.date}</Text>
                </View>
                {/* 日记内容简介  结束 */}
                <Image source={{ uri: item.image }}
                  style={{ width: 143, height: 100 }}
                />
              </TouchableOpacity>}
            />
          </>
          {/*  用户日记  结束 */}

        </View>
      </ImageHeaderScrollView>
    );
  }
}