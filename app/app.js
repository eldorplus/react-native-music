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

import SmartHomeContainer from './SmartHomeContainer';


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
            default :
                return currentState;
        }
    }
}

const NavReducer = createReducer({
    index: 0,
    routes: [
        {
            key: 'SmartHomeContainer',
            component: SmartHomeContainer
        }
    ]
});

export default class App extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            navState: NavReducer(undefined, {})
        };
        //首先把this给锁定
        this._handleAction = this._handleAction.bind(this);
        this._renderScene = this._renderScene.bind(this);
    }

    /**
     * 处理导航的action
     * @param action
     * @returns {boolean}
     * @private
     */
    _handleAction(action) {
        const state = NavReducer(this.state.navState, action);
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
        const Component = nav.scene.route.component;
        return (
            <Component handleAction={this._handleAction} {...nav.scene.route.passProps} {...this.props}/>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar hidden={true}/>
                <NavigationCardStack
                    navigationState={this.state.navState}
                    onNavigate={this._handleAction}
                    renderScene={this._renderScene}
                    />
            </View>

        )
    }
}
