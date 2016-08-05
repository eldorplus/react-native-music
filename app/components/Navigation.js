/**
 * 自定义导航，
 * 封装导航后，通过 Router 管理所有页面。
 * router.toXXX(params);
 */

import React , {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Navigator
} from 'react-native';

import Router from './Router';

export default class Navigation extends Component {

    /**
     * 路由转跳的效果，默认是FadeAndroid
     */
    configureScene(route, routeStact) {
        //如果路由有传 切换方式，则使用
        if (route.configureScene) {
            return route.configureScene;
        }
        else {
            return Navigator.SceneConfigs.FadeAndroid;
        }
    }

    /**
     * 渲染视图，传递props
     */
    renderScene(route, navigator) {
        //router是传递给其他组件，用于路由跳转的类
        this.router = this.router || new Router(navigator);
        //把actions直接传递给每个通过路由转跳的页面，其他参数则通过  route.params传递，它可覆盖actions
        this.actions = this.actions || route.params.actions;
        if (route.component) {
            const MyComponent = route.component;
            return (
                <MyComponent
                    router={this.router}
                    actions={this.actions}
                    {...this.props}
                    {...route.params}
                    />
            )
        }
    }

    render() {
        const {initialRoute} = this.props;
        return (
            <Navigator
                ref={view => this.navigation = view}
                initialRoute={initialRoute}
                navigationBar={<View></View>}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                />
        )
    }
}

Navigator.propTypes = {
    initialRoute: PropTypes.object.isRequired
}