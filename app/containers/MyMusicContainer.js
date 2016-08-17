'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Navigation from '../components/Navigation';//导航
import MyMusicPage from '../pages/MyMusicPage';
import FooterPlayBar from '../components/FooterPlayBar';

export default class MusicContainer extends Component {

    render() {
        const {actions,router}=this.props;
        return (
            <View style={{flex:1}}>
                <Navigation
                    initialRoute={{
                        name: 'MyMusicPage',
                        component: MyMusicPage,
                        params:{
                            actions:actions,
                        }
                        }}
                    search={this.props.search}
                    />
                <FooterPlayBar actions={actions} playmusic={this.props.playmusic}/>
            </View>
        )
    }
}
