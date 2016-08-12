'use strict';
import React ,{Component,}from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


class CDNav extends Component{
    render(){
        return(
            <View>

            </View>
        )
    }
}

export default class ContentDetail extends Component {
    componentDidMount() {
        const {actions} = this.props;
        actions.setTabbarIsShow(false);
    }

    render() {
        const {actions,router}=this.props;
        return (
            <View style={styles.container}>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});