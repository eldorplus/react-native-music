'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import ContentThumb from './ContentThunb';
import Utils from '../../utils/Utils';

export default class ContentList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
        this._renderRow = this._renderRow.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }

    _renderRow(rowData) {
        const {actions,router}=this.props;
        return (
            <ContentThumb info={rowData} actions={actions} router={router}/>
        )
    }

    _onEndReached() {
        const {actions,excelList} = this.props;
        const {
            page_size,
            page_num,
            fetching_status,
            is_load_end,
            } = excelList;
        //如果已经加载完毕，则不再请求
        //如果正在请求中，也不请求
        if (fetching_status == false && is_load_end != true) {
            var params = {
                page_size: page_size,
                page_num: page_num,
            }
            actions.getExcel(params);
        }

    }

    /**
     * 滚动列表，底部加载时的视图
     * @returns {XML}
     * @private
     */
    _renderFooter() {
        const {excelList} = this.props;
        const {is_load_end} = excelList;

        let view = (
            <View style={styles.loading_view}>
                <Text style={styles.loading_text}>客官，看到底啦~</Text>
            </View>
        );
        if (!is_load_end) {
            view = (
                <View style={styles.loading_view}>
                    <ActivityIndicator size="small" style={{marginRight:10}}/>
                    <Text style={styles.loading_text}>快速加载中</Text>
                </View>
            )
        }

        return view;
    }

    render() {
        const {excelList} = this.props;
        const {
            page_size,
            list,
            } = excelList;
        let _list = this.ds.cloneWithRows(list);

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={_list}
                    renderRow={this._renderRow}
                    initialListSize={page_size}         //刚挂载时渲染多少行
                    pageSize={page_size}                //每次事件循环渲染的行数
                    onEndReached={this._onEndReached}   //所有数据渲染后，到达最底部之前时调用
                    renderFooter={this._renderFooter}
                    enableEmptySections={true}
                    style={styles.list_view}
                    contentContainerStyle={styles.content_container_style}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:6,
    },
    list_view: {
        flex: 1,
        backgroundColor:'#f1f1f1',
    },
    content_container_style: {
        //flexDirection: 'row',
        //flexWrap: 'wrap'
    },
    loading_view: {
        width: Utils.window.width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
    },
    loading_text: {
        color: '#999',
        fontSize: 14,
    }
});