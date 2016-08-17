'use strict';
import React,{Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';

import SearchHeader from '../components/SearchPage/SearchHeader';
import HotSearch from '../components/SearchPage/HotSearch';
import HistorySearch from '../components/SearchPage/HistorySearch';


export default class SearchPage extends Component {

    render() {
        const {actions,router,search} = this.props;
        const {is_show_search_result} = search;

        return (
            <View style={styles.container}>
                <SearchHeader actions={actions} router={router} searchText={search.search_text}/>
                {is_show_search_result == false &&
                    <ScrollView style={styles.container}>
                        <HotSearch actions={actions} router={router}/>
                        <HistorySearch actions={actions} router={router} historyList={search.history_list}
                                       searchText={search.search_text}/>
                    </ScrollView>
                }
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
