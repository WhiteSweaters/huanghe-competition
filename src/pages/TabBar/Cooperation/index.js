import React from 'react';
import {
    Text,
} from 'react-native';
import Community from './Community';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ChartWithOthers from './ChartWithOthers';
import CustomerBar from '../Consulting/components/CustomerBar';

export default () => {
    return (
        <ScrollableTabView
            initialPage={1}
            renderTabBar={() => <CustomerBar />}
        >
            <Community tabLabel='社群' />
            <ChartWithOthers tabLabel = '聊天'/>
        </ScrollableTabView>
    )
}