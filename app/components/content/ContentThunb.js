'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

import Utils from '../../utils/Utils';

export default class ContentThunb extends Component {
    render() {
        const {info,router} = this.props;
        return (
            <View
                style={styles.container}
                >
                <TouchableWithoutFeedback
                    onPress={()=>router.toContentDetail({})}
                    >
                    <View>
                        <Image source={{uri:info.image}} style={styles.ct_img}/>
                        <View style={styles.title_wrap}>
                            <Text style={styles.tag}>话题</Text>
                            <Text style={styles.title}>{info.title}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Utils.window.width - 20,
        marginBottom: 16,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
    },
    ct_img: {
        width: Utils.window.width - 20,
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
        width: Utils.window.width - 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 16,
        color: '#333',
    },
    tag: {
        position: 'absolute',
        left: 0,
        top: 8,
        backgroundColor: '#dd3f40',
        color: 'white',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 14,
    }

});