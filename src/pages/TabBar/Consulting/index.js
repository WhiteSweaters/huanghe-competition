import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomerBar from './components/CustomerBar';
import Evaluation from '../../Evaluation';
import Consultation from '../../Consultation';
export default class Consulting extends React.Component {
    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <CustomerBar />}
            >
                <Evaluation tabLabel ='测评'/>
                <Consultation tabLabel ='向TA求助'/>
            </ScrollableTabView>
        )
    }
}