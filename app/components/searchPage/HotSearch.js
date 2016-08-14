'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * 热门搜索模块
 */
export default class HotSearch extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.hot_search = ['周杰伦', '过不起', '小雪', '流浪记', '牛仔很忙', '黑暗骑士'];
    }

    renderWord(word, index) {

        return (
            <View style={[hs_styles.word,index==0?{borderColor:'#dd3f40'}:{}]} key={index}>
                <Text style={[hs_styles.word_text,index==0?{color:'#dd3f40'}:{}]}>{word}</Text>
            </View>
        )
    }

    render() {
        const words = this.hot_search.map((word, index)=> {
            return this.renderWord(word, index);
        });
        return (
            <View style={hs_styles.container}>
                <View>
                    <Text style={hs_styles.title}>热门搜索</Text>
                </View>
                <View style={hs_styles.words_wrapper}>
                    {words}
                </View>
            </View>
        )
    }
}
const hs_styles = StyleSheet.create({
    container: {
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 14,
        backgroundColor: 'white',
    },
    title: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 14,
        color: '#666'
    },
    words_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    word: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 20,
    },
    word_text: {
        fontSize: 16,
        color: '#333'
    }
});

