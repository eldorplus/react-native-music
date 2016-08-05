'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import Utils from '../../utils/Utils';

export default class ContentThunb extends Component {
    render() {
        const {info,router} = this.props;
        console.log(info);
        return (
            <View style={styles.container}>
                <Image source={{uri:info.image}} style={styles.ct_img}/>
                <View style={styles.title_wrap}>
                    <Text style={styles.tag}>话题</Text>
                    <Text style={styles.title}>{info.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Utils.window.width,
        //height: 200,
        marginBottom: 16,
        backgroundColor: 'white'
    },
    ct_img: {
        width: Utils.window.width,
        height: 200,
        resizeMode: 'cover',
    },
    title_wrap: {
        //position: 'absolute',
        //bottom: 0,
        paddingTop: 8,
        paddingLeft: 50,
        paddingRight: 10,
        paddingBottom: 8,
        flex: 1,
        width: Utils.window.width,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    tag: {
        position: 'absolute',
        left: 0,
        top:8,
        backgroundColor: '#dd3f40',
        color: 'white',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 14,
    }

});