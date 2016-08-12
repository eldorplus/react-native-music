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

class SearchHeader extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.returnBack = this.returnBack.bind(this);
    }

    returnBack() {
        const {router} = this.props;
        router.pop();
    }

    render() {
        return (
            <View style={sh_styles.container}>
                <View style={sh_styles.input_wrapper}>
                    <Icon name="search" color="#f0f0f0" size={18} style={sh_styles.icon}/>
                    <TextInput multiline={false}
                               autoCapitalize="none"
                               autoFocus={true}
                               autoCorrect={false}
                               maxLength={16}
                               placeholder="梦里的歌"
                               placeholderTextColor="#f0f0f0"
                               selectionColor="#fff"
                               style={sh_styles.input_text}
                        />
                    <TouchableWithoutFeedback>
                        <Icon name="microphone" color="#f0f0f0" size={18} style={sh_styles.icon}/>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.returnBack}>
                    <View style={sh_styles.btn_wrapper}>
                        <Text style={sh_styles.btn}>取消</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const sh_styles = StyleSheet.create({
    container: {
        height: 50,
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    input_wrapper: {
        flex: 1,
        height: 30,
        backgroundColor: '#4CA567',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 6,
    },
    icon: {
        paddingLeft: 6,
        paddingRight: 6,
    },
    input_text: {
        flex: 1,
        backgroundColor: 'transparent',
        color: 'white',
    },
    btn_wrapper: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    btn: {
        fontSize: 16,
        color: 'white',
    }
});

/**
 * 热门搜索模块
 */
class HotSearch extends Component {
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

class HistorySearch extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.history_search = [
            '周杰伦 live', '王力宏', '陈奕迅', '陈奕迅 live',
        ]
    }

    _renderItem(history, index) {
        return (
            <View style={history_style.item} key={index}>
                <Icon name="circle-o-notch" size={16} color="#999"/>
                <View style={history_style.text_wrapper}>
                    <Text style={history_style.text}>{history}</Text>
                </View>
                <Icon name="close" size={16} color="#999"/>
            </View>
        )
    }

    render() {
        const items = this.history_search.map((history, index)=> {
            return this._renderItem(history, index);
        });
        return (
            <View style={history_style.container}>
                <View style={history_style.history_container}>
                    {items}
                </View>
                <View style={history_style.footer}>
                    <Text style={history_style.footer_text}>清空所有</Text>
                </View>
            </View>
        )
    }
}
const history_style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    history_container: {
        borderBottomWidth: 1,
        borderColor: '#fcfcfc',
    },
    item: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#fcfcfc',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 14,
        paddingRight: 14,

    },
    text_wrapper: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        fontSize: 16,
        color: '#333'
    },
    footer: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer_text: {
        fontSize: 14,
        color: '#666'
    }
});


export default class SearchPage extends Component {
    render() {
        const {actions,router} = this.props;
        return (
            <View style={styles.container}>
                <SearchHeader actions={actions} router={router}/>
                <ScrollView style={styles.container}>
                    <HotSearch/>
                    <HistorySearch/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
