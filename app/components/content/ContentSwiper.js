'use strict';

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';

import Utils from '../../utils/Utils';
import Swiper from 'react-native-swiper';

export default class ContentSwiper extends Component {
    componentDidMount() {
        const {actions,router} = this.props;
        actions.getSliders();
    }

    render() {
        const {sliders} = this.props;

        let sliderChilds;
        if (sliders.length) {
            sliderChilds = this._renderSwiperChilds();
        } else {
            sliderChilds = this._renderWaitingView();
        }

        return (
            <View style={styles.swiper}>
                <Swiper loop={true}
                        autoplay={true}
                        height={200}
                        paginationStyle={{bottom:10}}
                        activeDot={this._renderActiveDot()}>
                    {sliderChilds}
                </Swiper>
            </View>
        )
    }

    /**
     * 渲染滚动栏子视图
     * @returns {*}
     * @private
     */
    _renderSwiperChilds() {
        const {sliders,actions} = this.props;
        return sliders.map((slider, i)=> {
            return (
                <View key={i}>
                    <TouchableWithoutFeedback>
                        <Image source={{uri:slider.image}} style={styles.slider_img}/>
                    </TouchableWithoutFeedback>
                </View>
            )
        });
    }

    /**
     * 渲染等待中
     * @returns {XML}
     * @private
     */
    _renderWaitingView() {
        return (
            <View style={styles.waiting_view}>
                <ActivityIndicator size="small"/>
            </View>
        )
    }

    /**
     * 渲染active状态的点
     * @returns {XML}
     * @private
     */
    _renderActiveDot() {
        return (
            <View
                style={{backgroundColor: '#dd3f40', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}}/>
        )
    }
}


const styles = StyleSheet.create({
    swiper: {
        backgroundColor: 'white',
        height: 200,
    },
    slider_img: {
        width: Utils.window.width,
        height: 200,
        resizeMode: 'cover',
    },
    waiting_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});