'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

import ContentSwiper from '../components/content/ContentSwiper';
import ContentList from '../components/content/ContentList';

export default class ContentPage extends Component {
    componentDidMount() {
        const {actions} = this.props;
        actions.setTabbarIsShow(true);
    }

    render() {
        const {actions,router,content} = this.props;
        return (
            <ScrollView style={styles.container}>
                <ContentSwiper actions={actions} router={router} sliders={content.sliders}/>
                <ContentList actions={actions} router={router} excelList={content.excelList} style={styles.container}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
