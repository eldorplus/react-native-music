'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import Utils from '../../utils/Utils';

import MUSICLIST from '../../Data/MusicList';//音乐数据

export default class MusicList extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this._renderListItem = this._renderListItem.bind(this);
    }

    _renderListItem(music, i) {
        const {
            onPlayNext,
            }= this.props;
        return (
            <TouchableWithoutFeedback key={i}
                onPress={()=>onPlayNext(i)}>
                <View style={styles.list_item}>
                    <Text style={styles.li_song_name}>{music.songName}</Text>
                    <Text style={styles.li_song_author}>{music.songAuthor}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        const {
            toggleMusicList,
            } =this.props;
        return (
            <View style={styles.music_list}>
                <View style={styles.music_list_wrapper}>

                    <View style={styles.title}>
                        <Text style={styles.title_text}>播放列表</Text>
                    </View>

                    <ScrollView style={styles.ml_scroll_view}>
                        {MUSICLIST.map((music, i)=> {
                            return this._renderListItem(music, i);
                        })}
                    </ScrollView>
                    <TouchableWithoutFeedback
                        onPress={()=>{toggleMusicList(false)}}>
                        <View style={styles.btn_close}>
                            <Text style={styles.btn_close_text}>关闭</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    music_list: {
        flex: 1,
        width: Utils.window.width,
        height: Utils.window.height,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    music_list_wrapper: {
        position: 'absolute',
        bottom: 0,
        width: Utils.window.width,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: 'white',
    },
    ml_scroll_view: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6,
        maxHeight: 200,
    },
    list_item: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 6,
        borderBottomWidth: 0.8,
        borderColor: '#f2f2f2',
    },
    li_song_name: {
        fontSize: 16,
        color: '#666',
    },
    li_song_author: {
        paddingTop: 4,
        color: '#999'
    },
    title: {
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#d4d4d4'
    },
    title_text: {
        fontSize: 14,
        color: '#999'
    },
    btn_close: {
        paddingTop: 13,
        paddingBottom: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#d4d4d4'
    },
    btn_close_text: {
        color: '#999'
    }

});