'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SearchBar extends Component {

    // 构造
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }

    /**
     * 点击跳转搜索页面
     * @private
     */
    _onPress() {
        const {router} = this.props;
        router.toSearchPage();
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.input_wrapper}>
                        <Icon name="search" size={16} color="#9b9b9b"/>
                        <Text style={styles.search_text}>BOOMBYA</Text>
                    </View>
                    <Icon
                        name="music" size={20} color="green"/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 14,
        paddingRight: 14,
        height: 50,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input_wrapper: {
        flex: 1,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    search_text: {
        color: '#9b9b9b',
        fontSize: 16,
        marginLeft: 4
    }
});