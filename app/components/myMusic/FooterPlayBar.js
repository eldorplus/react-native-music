'use strict';

import React,{
    Component
} from 'react';

import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class FooterPlayBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.album_img}>
                </View>
                <View style={styles.album_info}>
                    <Text style={styles.album_name}>雨下一整晚</Text>
                    <Text style={styles.album_iyirc}>小纸伞 影子被拉长</Text>
                </View>
                <View style={styles.btn_wrapper}>
                    <View style={[styles.pause_btn,styles.icon]}>
                        <TouchableWithoutFeedback >
                            <Icon name="pause" color="green" size={12}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <Icon name="navicon" color="green" size={20} style={styles.icon}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 14,
        paddingRight:14,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"#fefefe",
        borderTopWidth:1,
        borderColor: '#F7F7F7',
    },
    album_img: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#ccc',
    },
    album_info: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'center',
    },
    album_name: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    album_iyirc: {
        fontSize: 12,
        color: '#666',
    },
    btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pause_btn: {
        width: 36,
        height: 36,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
    }


});
