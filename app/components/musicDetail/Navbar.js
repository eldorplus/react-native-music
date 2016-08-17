'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Navbar extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.showMusicList = this.showMusicList.bind(this);
        this._onNarbarReturnPress = this._onNarbarReturnPress.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    showMusicList() {
        const {actions} = this.props;
        actions.toggleMusicList(true)
    }

    /**
     * 头部导航栏，返回按钮点击事件
     * @private
     */
    _onNarbarReturnPress() {
        const {actions} = this.props;
        actions.set_is_show_music_detail(false);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {

        return (
            <View style={styles.nav_bar}>
                <Icon.Button
                    name="chevron-left"
                    size={20}
                    color="white"
                    backgroundColor="transparent"
                    onPress={this._onNarbarReturnPress}
                    style={{justifyContent:'center'}}
                    iconStyle={{marginRight:0}}
                    />
                <Text style={styles.nav_bar_text}>LIVING ROOM</Text>
                <Icon.Button
                    name="list" size={20}
                    color="white"
                    backgroundColor="transparent"
                    onPress={this.showMusicList}
                    style={{justifyContent:'center'}}
                    iconStyle={{marginRight:0}}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav_bar: {
        height: 60,
        paddingLeft: 6,
        paddingRight: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nav_bar_text: {
        fontSize: 22,
        color: '#ddd'
    },
});