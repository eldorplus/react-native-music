'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Navigation from '../components/Navigation';//导航
import ContentPage from '../pages/ContentPage';

export default class ContentContainer extends Component {
    render() {
        return (
            <Navigation
                initialRoute={{
                        name: 'ContentPage',
                        component: ContentPage,
                        params:{actions:this.props.actions,}
                        }}
                content={this.props.content}
                />
        )
    }
}
