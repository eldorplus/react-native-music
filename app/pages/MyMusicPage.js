'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

import Header from '../components/MyMusic/Header';
import SearchBar from '../components/MyMusic/SearchBar';
import MyMusicList from '../components/MyMusic/MyMusicList';

export default class MyMusicPage extends Component {
    componentDidMount() {
        const {actions} = this.props;
        actions.setTabbarIsShow(false);
    }


    render() {
        const {actions,router} = this.props;
        return (
            <View style={styles.container}>
                <Header actions={actions} router={router}/>
                <ScrollView style={styles.scrollView}>
                    <SearchBar actions={actions} router={router}/>
                    <MyMusicList actions={actions} router={router}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
