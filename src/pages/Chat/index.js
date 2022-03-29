/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import { View, Text } from 'react-native';
import XLNav from '../TabBar/XLNav';
import JMessage from '../../utils/JMessage';

export default function Demo(props) {

  console.log(props.route.params.myId);
  const getHistoryMessages = async () => {
    const res = await JMessage.getHistoryMessages("JGuser" + props.route.params.uid, 1, 10);
    console.log(res);
    var arr = [];
    for (var i = res.length - 1; i >= 0; i--) {
      arr.push({
        _id: i,
        text: res[i].text,
        createdAt: new Date(parseInt(res[i].createTime)),
        user: {
          _id: JSON.parse(res[i].extras.user).id,
          name: props.route.params.param.nickname,
          avatar: JSON.parse(res[i].extras.user).headerImg
        }
      })
    }
    return arr;
  }

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getHistoryMessages().then(res => {
      setMessages(
        res
      )
    })


  }, []);
  const onSend = useCallback((msg = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
    JMessage.sendTextMessage("JGuser" + props.route.params.uid, msg[0].text, {
      user: JSON.stringify({
        id: props.route.params.myId,
        telephone: props.route.params.telephone,
        headerImg: props.route.params.myHeadImg
      })
    });
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#95ec69',
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Text style={{ color: '#0366d6', fontSize: 18 }}>发送</Text>
        </View>
      </Send>
    );
  }
  console.log(props.route.params.myHeadImg);
  return (
    <>
      <XLNav title={props.route.params.param.nickname} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        locale={"zh-cn"}
        showAvatarForEveryMessage={true}
        renderBubble={renderBubble}
        placeholder={"开始聊天吧"}
        renderSend={renderSend}
        user={{
          _id: props.route.params.myId,
          avatar: props.route.params.myHeadImg
        }}
      />
    </>
  )
}