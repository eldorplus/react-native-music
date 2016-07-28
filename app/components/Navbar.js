'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Navbar extends Component {
    render() {
        const {
            toggleMusicList
            } =this.props;

        return (
            <View style={styles.nav_bar}>
                <Icon.Button
                    name="chevron-left"
                    size={20}
                    color="white"
                    backgroundColor="transparent"
                    onPress={()=>{}}
                    style={{justifyContent:'center'}}
                    iconStyle={{marginRight:0}}
                    />
                <Text style={styles.nav_bar_text}>LIVING ROOM</Text>
                <Icon.Button
                    name="list" size={20}
                    color="white"
                    backgroundColor="transparent"
                    onPress={()=>{toggleMusicList(true)}}
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