'use strict';

import React ,{
    Component,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>我的音乐</Text>
                <View style={styles.icon_container}>
                    <Icon name="headphones" size={20} color="white" style={styles.icon}/>
                    <Icon name="music" size={20} color="#fafafa" style={styles.icon}/>
                    <Icon name="navicon" size={20} color="#fafafa" style={styles.icon}/>
                    <Icon name="search" size={20} color="#fafafa" style={styles.icon}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    icon_container: {
        flexDirection: 'row'
    },
    icon: {
        paddingLeft: 12,
        paddingRight: 12,
    },
    name: {
        color: 'white',
        fontSize: 18
    }
});