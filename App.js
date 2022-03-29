// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Demo from './src/pages/demo';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import RootStore from './src/mbox';
import { Provider } from 'mobx-react';
import JMessage from './src/utils/JMessage';
import TabBar from './src/pages/TabBar';
import Geo from './src/utils/Geo';
import Radio from './src/pages/TabBar/Radio';
import Recording from './src/pages/TabBar/Radio/components/Recording'
import My from './src/pages/TabBar/My';
import Others from './src/pages/Others';
import Home from './src/pages/TabBar/Home';
import Evaluation from './src/pages/Evaluation';
import Consultation from './src/pages/Consultation';
import EditUserInfo from './src/pages/EditUserInfo'
import Works from './src/pages/Woks';
import Cooperation from './src/pages/TabBar/Cooperation';
import PublishComment from './src/pages/TabBar/Cooperation/Community/PublishComment';
import Community from './src/pages/TabBar/Cooperation/Community';
import Life from './src/pages/Life';
import Chat from './src/pages/Chat';
import Comment from './src/pages/Comment';
import CareList from './src/pages/CareList';
import BookStore from './src/pages/BookStore';
import EvaluationForm from './src/pages/EvaluationForm';
import SecondQuestion from './src/pages/SecondQuestion';
import ThirdQuestion from './src/pages/ThirdQuestion';
import FourthQuestion from './src/pages/FourthQuestion';
import FifthQuestion from './src/pages/FifthQuestion';
import Result from './src/pages/Result';
import ShowBooks from './src/pages/ShowBooks';
import Detials from './src/pages/Detials';
import Record from './src/pages/Record';
import RecordList from './src/pages/RecordList';
import AMap from './src/utils/AMap';
import Navigation from './src/pages/Navigation';
import Answer from './src/pages/Answer';
import AnswerList from './src/pages/AnswerList';
import ActiveMood from './src/pages/ActiveMood';
import QuestionDetails from './src/pages/QuestionDetails';
import MovieList from './src/pages/MovieList';
import Sentence from './src/pages/Sentence';
import Journalism from './src/pages/Journalism';

const Stack = createNativeStackNavigator();

class App extends React.Component {

  componentDidMount() {
    // 极光初始化
    JMessage.init();
    // 高德SDK初始化
    Geo.getCurrentStreet();
    // 高德3D初始化
    AMap.init();
  }

  render() {
    return (
      <Provider RootStore={RootStore}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false
            }}
          >
            {/* 组件测试页面  测试时用 开始 */}
            <Stack.Screen name="Demo" component={Demo} />
            {/* 组件测试页面  测试时用 结束 */}

            {/* 登录页面  开始 */}
            <Stack.Screen name="Login" component={Login} />
            {/* 登录页面  结束 */}

            {/* 注册页面  开始 */}
            <Stack.Screen name="Register" component={Register} />
            {/* 注册页面  结束 */}

            {/* 导航栏  开始 */}
            <Stack.Screen name="TabBar" component={TabBar} />
            {/* 导航栏  结束 */}

            {/* 心灵驿站  开始 */}
            <Stack.Screen name="Radio" component={Radio} />
            {/* 心灵驿站  结束 */}

            {/* 分享你的故事  开始 */}
            <Stack.Screen name="Recording" component={Recording} />
            {/* 分享你的故事  结束 */}

            {/* 我的  开始 */}
            <Stack.Screen name="My" component={My} />
            {/* 我的  结束 */}

            {/* 其他人的资料 开始 */}
            <Stack.Screen name="Others" component={Others} />
            {/* 其他人的资料 结束 */}

            {/* 首页  开始 */}
            <Stack.Screen name="Home" component={Home} />
            {/* 首页  结束 */}

            {/* 心理测评  开始 */}
            <Stack.Screen name="Evaluation" component={Evaluation} />
            {/* 其他人的资料 结束 */}

            {/* 咨询预约  开始 */}
            <Stack.Screen name="Consultation" component={Consultation} />
            {/* 咨询预约  结束 */}

            {/* 编辑个人信息  开始 */}
            <Stack.Screen name="EditUserInfo" component={EditUserInfo} />
            {/* 编辑个人信息  结束 */}

            {/* 作品列表  开始 */}
            <Stack.Screen name="Works" component={Works} />
            {/* 作品列表  结束 */}

            {/* 互助社区页  开始 */}
            <Stack.Screen name='Cooperation' component={Cooperation} />
            {/* 互助社区页  结束 */}

            {/* 社区页  开始 */}
            <Stack.Screen name='Community' component={Community} />
            {/* 社区页  结束 */}

            {/* 发布评论页  开始 */}
            <Stack.Screen name='PublishComment' component={PublishComment} />
            {/* 发布评论页  结束 */}

            {/* 个人空间页  开始 */}
            <Stack.Screen name='Life' component={Life} />
            {/* 个人空间页  结束 */}

            {/* 聊天页  开始 */}
            <Stack.Screen name='Chat' component={Chat} />
            {/* 聊天页  结束 */}

            {/* 评论动态  开始 */}
            <Stack.Screen name='Comment' component={Comment} />
            {/* 评论动态  结束 */}

            {/* 我关注的人  开始 */}
            <Stack.Screen name='CareList' component={CareList} />
            {/* 我关注的人  结束 */}

            {/* 书架  开始 */}
            <Stack.Screen name='BookStore' component={BookStore} />
            {/* 书架  结束 */}

            {/* 咨询表单页面  开始 */}
            <Stack.Screen name='EvaluationForm' component={EvaluationForm} />
            {/* 咨询表单页面  结束 */}

            {/* 第二个问题  开始 */}
            <Stack.Screen name='SecondQuestion' component={SecondQuestion} />
            {/* 第二个问题  结束 */}

            {/* 第三个问题  开始 */}
            <Stack.Screen name='ThirdQuestion' component={ThirdQuestion} />
            {/* 第三个问题  结束 */}

            {/* 第四个问题  开始 */}
            <Stack.Screen name='FourthQuestion' component={FourthQuestion} />
            {/* 第四个问题  结束 */}

            {/* 第五个问题  开始 */}
            <Stack.Screen name='FifthQuestion' component={FifthQuestion} />
            {/* 第五个问题  结束 */}

            {/* 问卷结果页  开始 */}
            <Stack.Screen name='Result' component={Result} />
            {/* 问卷结果页  结束 */}

            {/* 展示图书  开始 */}
            <Stack.Screen name='ShowBooks' component={ShowBooks} />
            {/* 展示图书  结束 */}

            {/* 图书详情页  开始 */}
            <Stack.Screen name='Detials' component={Detials} />
            {/* 图书详情页  结束 */}

            {/* 预约记录  开始 */}
            <Stack.Screen name='Record' component={Record} />
            {/* 预约记录  结束 */}

            {/* 预约列表  开始 */}
            <Stack.Screen name='RecordList' component={RecordList} />
            {/* 预约列表  结束 */}

            {/* 导航页面  开始 */}
            <Stack.Screen name='Navigation' component={Navigation} />
            {/* 导航页面  结束 */}

            {/* 答案之书  开始 */}
            <Stack.Screen name='Answer' component={Answer} />
            {/* 答案之书  结束 */}

            {/* 答案之书的答案  开始 */}
            <Stack.Screen name='AnswerList' component={AnswerList} />
            {/* 答案之书的答案  结束 */}

            {/* 每日正念  开始 */}
            <Stack.Screen name='ActiveMood' component={ActiveMood} />
            {/* 每日正念  结束 */}

            {/* 每日正念的知识详情页  开始 */}
            <Stack.Screen name='QuestionDetails' component={QuestionDetails}/>
            {/* 每日正念的知识详情页  结束 */}

            {/* 今日好片  开始 */}
            <Stack.Screen name='MovieList' component={MovieList}/>
            {/* 今日好片  结束 */}

            {/* 每日十句  开始 */}
            <Stack.Screen name='Sentence' component={Sentence} />
            {/* 每日十句  结束 */}

            {/* 深度报道  开始 */}
            <Stack.Screen name='Journalism' component={Journalism}/>
            {/* 深度报道  结束 */}

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
