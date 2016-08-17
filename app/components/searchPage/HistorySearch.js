'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    TextInput,
    TouchableWithoutFeedback,
    InteractionManager,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HistorySearch extends Component {
    // 构造
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});

        this._renderRow = this._renderRow.bind(this);
        this._setSearchWord = this._setSearchWord.bind(this);
        this._removeHistory = this._removeHistory.bind(this);
        console.log('hs,constructor');

    }

    /**
     * 初始挂载的时候，查询数据库，获取当前历史列表
     * 如果是非空，则不请求了
     * fixme 如果用户一开始没有搜索，也是空的，这个判断需要改变
     */
    componentDidMount() {
        const {actions,historyList} = this.props;

        if (historyList.length == 0) {
            //fixme 我也不知道为什么，这样写就正常了
            InteractionManager.runAfterInteractions(()=>actions.getHistoryList());
            //    setTimeout(()=> {
            //        actions.getHistoryList();
            //    }, 0);
        }
    }

    /**
     * 根据id删除某条历史记录
     * @param id
     * @private
     */
    _removeHistory(id) {
        const {actions} = this.props;
        actions.removeSomeHistoryWord(id);
    }

    /**
     * 设置某个词为搜索词
     * @param word
     * @private
     */
    _setSearchWord(word) {
        const {actions} = this.props;
    }

    /***
     * history 结果如下
     * {
     *  id : 主键
     *  word : 关键词
     *  create_time : 生成时间
     * }
     * @param history
     * @returns {XML}
     * @private
     */
    _renderRow(history) {
        return (
            <View style={history_style.item} key={history.id}>

                <Icon name="circle-o-notch" size={16} color="#999"/>

                <TouchableWithoutFeedback
                    onPress={()=>{this._setSearchWord(history.word)}}
                    >
                    <View style={history_style.text_wrapper}>
                        <Text style={history_style.text}>
                            {history.word}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={()=>{this._removeHistory(history.id)}}
                    >
                    <Icon name="close" size={16} color="#999" style={history_style.close_btn}/>
                </TouchableWithoutFeedback>

            </View>
        )
    }


    render() {
        const {historyList} =this.props;
        //如果没有历史记录，则直接返回空
        if (historyList.length == 0) {
            return (
                <View></View>
            )
        } else {
            const dataSource = this.ds.cloneWithRows(historyList);
            return (
                <View style={history_style.container}>
                    <ListView
                        style={history_style.history_container}
                        dataSource={dataSource}
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        />

                    <View style={history_style.footer}>
                        <Text style={history_style.footer_text}>清空所有</Text>
                    </View>
                </View>
            )
        }

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
        //paddingRight: 14,
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
    close_btn: {
        paddingLeft: 20,
        paddingRight: 14,
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
