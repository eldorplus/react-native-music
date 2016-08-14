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
 * 搜索顶部栏
 */
export default class SearchHeader extends Component {
    // 构造
    constructor(props) {
        super(props);

        this.returnBack = this.returnBack.bind(this);
        this._onSubmitEditing = this._onSubmitEditing.bind(this);
        this._onChangeText = this._onChangeText.bind(this);

    }

    returnBack() {
        const {router} = this.props;
        router.pop();
    }

    /**
     * 输入框失去焦点时触发
     * @param event
     * @private
     */
    _onSubmitEditing(event) {
        const search_text = event.nativeEvent.text;
        const {actions,searchText} = this.props;
        actions.startSearch(search_text);
    }

    _onChangeText(text) {
        const {actions,} = this.props;
        actions.changeSearchText(text);
    }

    render() {
        const {searchText} = this.props;
        return (
            <View style={sh_styles.container} key={'SEARCHHEADER'}>
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
                               onSubmitEditing={this._onSubmitEditing}
                               onChangeText={this._onChangeText}
                               value={searchText}
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