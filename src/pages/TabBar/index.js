import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Consulting from './Consulting';
import Cooperation from './Cooperation';
import Radio from './Radio';
import My from './My';
import JMessage from '../../utils/JMessage';
import { inject, observer } from 'mobx-react';


const Tab = createBottomTabNavigator();

@inject("RootStore")
@observer
export default class TabBa extends React.Component {


    async componentDidMount() {
       await JMessage.login("JGuser" + this.props.RootStore.uid, this.props.RootStore.telephone);
    }

    render() {
        return (
            <Tab.Navigator screenOptions={
                ({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === '首页') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === '咨询') {
                            iconName = focused ? 'cafe' : 'cafe-outline';
                        } else if (route.name === '互助') {
                            iconName = focused ? 'hand-left' : 'hand-left-outline';
                        } else if (route.name === '电台') {
                            iconName = focused ? 'radio' : 'radio-outline';
                        } else if (route.name === '我的') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })
            }>
                <Tab.Screen name="首页" component={Home} />
                <Tab.Screen name="咨询" component={Consulting} />
                <Tab.Screen name="互助" component={Cooperation} />
                <Tab.Screen name="电台" component={Radio} />
                <Tab.Screen name="我的" component={My} />
            </Tab.Navigator>
        );
    }
}