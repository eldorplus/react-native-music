/**
 * App进入总逻辑
 */
'use strict';

import React,{Component,PropTypes} from 'react';
import {View,StatusBar} from 'react-native';
/**
 * connect
 * 通过react-redux提供的connect方法，
 * 将包装好的组件链接到Redux。
 * 任何一个从connect() 包装好的组件都可以得到
 * dispath方法作为组件的props，以及全局state
 */
import { connect } from 'react-redux';
/**
 * bindActionCreators
 * 它把 action creators转成拥有同名Key的对象，
 * 使用 dispatch 把每个action包围起来，这样可以直接使用他们。
 *
 * 唯一使用 bindActionCreators的场景是：
 * 当需要把 action creator往下传到一个组件上，却不想让这个组件觉察到redux的存在，
 * 即：不希望将 redux store 和 dispatch传给它
 */
import {bindActionCreators} from 'redux';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import allActions from '../actions';//所有actions


import Splash from './Splash';//闪屏container
import ContentContainer from './ContentContainer';
import MyMusicContainer from './MyMusicContainer';

class App extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        const {application,actions,content,search,playmusic} = this.props;
        const {isShowSplash,selectedTab,tabBarHeight} = application;
        if (isShowSplash) {
            return (
                <Splash actions={actions}/>
            )
        }
        return (
            <TabNavigator
                tabBarStyle={{height:tabBarHeight,overflow:'hidden'}}
                sceneStyle={{paddingBottom:tabBarHeight}}>

                <TabNavigator.Item
                    selected={selectedTab == 'content'}
                    title="精选"
                    onPress={()=>actions.setTabbarItem('content')}
                    renderIcon={()=> <Icon name="diamond" size={24} color="#666"/>}
                    renderSelectedIcon={()=> <Icon name="diamond" size={24} color="#dd3f40"/> }
                    titleStyle={{fontSize:12,marginBottom:4,}}
                    selectedTitleStyle={{fontSize:12,marginBottom:4,color:'#dd3f40'}}
                    >
                    <View style={{flex:1}}>
                        <StatusBar hidden={true}/>
                        <ContentContainer {...this.props}/>
                    </View>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title="装备库"
                    selected={selectedTab == 'equipment_ku'}
                    onPress={()=>actions.setTabbarItem('equipment_ku')}
                    renderIcon={()=> <Icon name="cube" size={24} color="#666"/>}
                    renderSelectedIcon={()=> <Icon name="cube" size={24} color="#dd3f40"/>}
                    titleStyle={{fontSize:12,marginBottom:4,}}
                    selectedTitleStyle={{fontSize:12,marginBottom:4,color:'#dd3f40'}}
                    >
                    <View style={{flex:1}}>
                        <StatusBar hidden={true}/>
                        <MyMusicContainer actions={actions} search={search} playmusic={playmusic}/>
                    </View>
                </TabNavigator.Item>

            </TabNavigator>
        )
    }
}

App.propTypes = {
    application: PropTypes.object.isRequired,//
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}


function mapStateToProps(state) {
    return {
        application: {
            selectedTab: state.application.selectedTab,
            tabBarHeight: state.application.tabBarHeight,
            isShowSplash: state.application.isShowSplash
        },
        content: {
            sliders: state.content.sliders,
            excelList: state.content.excelList,
        },
        search: {
            search_text: state.search.search_text,
            history_list: state.search.history_list,
            search_result_list: state.search.search_result_list,
            is_show_search_result: state.search.is_show_search_result
        },
        playmusic: {
            is_show_detail_page: state.playmusic.is_show_detail_page,
            musicList: state.playmusic.musicList,
            currentIndex: state.playmusic.currentIndex,
            overallLength: state.playmusic.overallLength,
            currentTime: state.playmusic.currentTime,
            mode: state.playmusic.mode,
            musicHash: state.playmusic.musicHash,
            isPlay: state.playmusic.isPlay,
            showMusicList: state.playmusic.showMusicList,
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(allActions, dispatch),
    }
}

/**
 * connnect
 * connect函数会调用两次，第一次设置参数，第二次是组件与redux store链接
 * connect不会修改传入的组件，而是返回一个新的与redux store连接的组件。
 *
 * connect第一个参数
 * 组件监听到redux store发送变化时，就会调用该函数，
 * 该函数必须返回一个对象，这对象会与组件的props合并
 *
 * connect第二个参数
 * 如果传递的是一个函数，该函数将会接收一个dispatch,然后自行返回一个对象。
 * 这个对象通过dispatch 函数与 action creator以某种方式绑定在一起（bindActionCreators）
 * 如果忽略了这个参数，dispatch将会注入到组件的props中。
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);