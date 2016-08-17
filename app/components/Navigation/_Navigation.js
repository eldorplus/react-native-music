/**
 * Create by Guanmac
 *
 **/

import React,{ Component } from 'react';
import {
    NavigationExperimental,
    StatusBar,
    View,
} from 'react-native';

const {
    CardStack : NavigationCardStack,
    StateUtils : NavigationStateUtils,
    } = NavigationExperimental;


function createReducer(initialState) {
    return (currentState = initialState, action)=> {
        switch (action.type) {
            case 'jump':
                if (NavigationStateUtils.has(currentState, action.key)) {
                    return NavigationStateUtils.replaceAt(currentState, action.key, {...action});
                } else {
                    return NavigationStateUtils.push(currentState, {key: action.key, ...action});
                }
                break;
            case 'pop':
                if (currentState.index > 0) {
                    return NavigationStateUtils.pop(currentState);
                } else {
                    return currentState;
                }
                break;
            case 'replaceAtIndex':
                return NavigationStateUtils.replaceAtIndex(currentState, action.index, {...action});
            default :
                return currentState;
        }
    }
}

//const NavReducer = createReducer({
//    index: 0,
//    routes: [
//        {
//            key: 'SmartHomeContainer',
//            component: SmartHomeContainer
//        }
//    ]
//});

export default class Navigation extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.NavReducer = createReducer({
            index: 0,
            routes: [
                this.props.initialRoute
            ]
        });
        // 初始状态
        this.state = {
            navState: this.NavReducer(undefined, {})
        };
        //首先把this给锁定
        this._handleNavAction = this._handleNavAction.bind(this);
        this._renderScene = this._renderScene.bind(this);
    }

    /**
     * 处理导航的action
     * @param action
     * @returns {boolean}
     * @private
     */
    _handleNavAction(action) {
        const state = this.NavReducer(this.state.navState, action);
        if (state == this.state.navState) {
            return false
        } else {
            this.setState({
                navState: state
            });
            return false;
        }
    }

    /**
     * 渲染导航的view，传递handleAction 和其他参数
     * @param route
     * @returns {XML}
     * @private
     */
    _renderScene(nav) {
        console.log('a');
        const Component = nav.scene.route.component;
        return (
            <Component navDispatch={this._handleNavAction} {...nav.scene.route.params} {...this.props}/>
        )
    }
    componentWillReceiveProps(nextProps){
        var action={
            type:'replaceAtIndex',
            index:this.state.navState.index,
            ...nextProps
        }
        const _state = this.NavReducer(this.state.navState, action);
        this.setState(_state);
    }
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar hidden={true}/>
                <NavigationCardStack
                    navigationState={this.state.navState}
                    onNavigate={this._handleNavAction}
                    renderScene={this._renderScene}
                    />
            </View>

        )
    }
}
