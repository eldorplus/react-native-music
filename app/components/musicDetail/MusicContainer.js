'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Utils from '../../utils/Utils';

export default class MusicContainer extends Component {

    render() {
        const {
            songImg,
            songName,
            songAuthor
            } = this.props;
        return (
            <View style={styles.music_container}>
                <View style={styles.mc_title}>
                    <Text style={styles.mc_title_text}>Music</Text>
                </View>
                <View style={styles.mc_pic}>
                    <Image source={songImg} style={styles.mc_pic_image}/>
                </View>
                <View style={styles.mc_song_info}>
                    <Text style={styles.mc_song_name}>{songName}</Text>
                    <Text style={styles.mc_song_author}>{songAuthor}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    music_container: {
        flex: 1,
    },
    mc_title: {
        alignItems: 'center'
    },
    mc_title_text: {
        color: 'white',
        fontSize: 20
    },
    mc_pic: {
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    mc_pic_image: {
        width: Utils.window.width - 70,
        height: Utils.window.width - 70
    },
    mc_song_info: {
        alignItems: 'center'
    },
    mc_song_name: {
        fontSize: 20,
        color: 'white'
    },
    mc_song_author: {
        fontSize: 14,
        color: '#aaa'
    },
});