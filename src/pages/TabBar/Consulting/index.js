import React from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from './components/CustomerBar';
import Evaluation from '../../Evaluation';
import Consultation from '../../Consultation';
import BookStore from '../../BookStore';

export default class Consulting extends React.Component {

    render() {
        return (
            <ScrollableTabView
                initialPage={1}
                renderTabBar={() => <CustomerBar />}
            >
                <Evaluation tabLabel ='测评'/>
                <Consultation tabLabel ='向TA求助'/>
                <BookStore tabLabel ='书架'/>
            </ScrollableTabView>
        )
    }
}