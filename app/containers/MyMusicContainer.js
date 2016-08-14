'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Navigation from '../components/Navigation';//导航
import MyMusicPage from '../pages/MyMusicPage';

export default class MusicContainer extends Component {

    render() {
        return (
            <Navigation
                initialRoute={{
                        name: 'MyMusicPage',
                        component: MyMusicPage,
                        params:{
                            actions:this.props.actions,
                        }
                        }}
                search={this.props.search}
                />
        )
    }
}
