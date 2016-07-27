'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from './Utils';

export default class MusicControllerLine extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            'currentTime': '0',
            'lineCircleLeft': 0
        };
    }

    /**
     * 绑定手势操作
     */
    componentWillMount() {
        this._panResponder = PanResponder.create({
            //成为响应者
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState)=>true,
            onMoveShouldSetPanResponder: (evt, gestureState)=>true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState)=>true,
            //开始手势操作
            onPanResponderGrant: (evt, gestureState)=> {
                this.props.onStop();
            },
            onPanResponderMove: (evt, gestureState)=> {
                this.throttle((gs_moveX)=> {
                    let moveX = gs_moveX - 20;
                    if (moveX <= 0) {
                        moveX = 0;
                    } else if (moveX >= Utils.window.width - 60) {
                        moveX = Utils.window.width - 60;
                    }
                    let currentTime = this.calculSecond(moveX);
                    this.setState({
                        currentTime: currentTime,
                        lineCircleLeft: moveX
                    });
                }, 200)(gestureState.moveX);

            },

            //手势完成
            onPanResponderRelease: (evt, gestureState)=> {
                const {onCircleMove} = this.props;

                let moveX = gestureState.moveX - 20;
                if (moveX <= 0) {
                    moveX = 0;
                } else if (moveX >= Utils.window.width - 60) {
                    moveX = Utils.window.width - 60;
                }
                let currentSecond = this.calculSecond(moveX);
                onCircleMove(currentSecond);

            }
        });
    }

    /**
     * 函数节流
     * @param fn
     * @param delay
     */
    throttle(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay)
        }
    }


    /**
     * 根据长度计算秒数
     * @param length
     */
    calculSecond(length) {
        const {
            overallLength
            } = this.props;
        const radit = length / (Utils.window.width - 40);
        return overallLength * radit;
    }

    /**
     * 根据字符串计算长度
     * @param overallLength
     * @param currentTime
     * @returns {number}
     */
    calculLine(overallLength, currentTime) {
        if (currentTime == 0) {
            return 0;
        }
        return currentTime / overallLength * (Utils.window.width - 40);
    }

    componentWillReceiveProps(nextProps) {
        const {
            overallLength,
            } = this.props;
        const {
            currentTime,
            } = this.state;
        if (currentTime != nextProps.currentTime) {
            //计算偏移长度
            const length = this.calculLine(overallLength, nextProps.currentTime);
            this.setState({
                currentTime: nextProps.currentTime,
                lineCircleLeft: length
            });
        }
    }

    render() {
        const {
            overallLength,
            } = this.props;
        const {
            currentTime,
            lineCircleLeft
            } =this.state;

        //把秒转换成形如【3：00】的格式
        const overllSecond = Utils.calculate.transSecondToString(overallLength);
        const currentSecond = Utils.calculate.transSecondToString(currentTime);

        return (
            <View style={styles.music_controller_line}>
                <View style={styles.mcl_time}>
                    <Text style={styles.mcl_current_time}>{currentSecond}</Text>
                    <Text style={styles.mcl_overall_length}>{overllSecond}</Text>
                </View>
                <View style={styles.mcl_line_controller}>
                    <View style={[styles.mcl_line,{width:lineCircleLeft}]}></View>
                    <View
                        style={[styles.mcl_line_circle,{left:lineCircleLeft}]}
                        {...this._panResponder.panHandlers} ></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    music_controller_line: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    mcl_line_controller: {
        marginTop: 12,
        marginBottom: 16,
        height: 2,
        borderRadius: 4,
        backgroundColor: '#bbb'
    },
    mcl_line: {
        height: 2,
        borderRadius: 4,
        backgroundColor: 'rgb(36,147,110)'
    },
    mcl_line_circle: {
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: 'rgb(26,147,110)',
        position: 'absolute',
        top: -8,
    },
    mcl_time: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mcl_current_time: {
        color: '#aaa',
    },
    mcl_overall_length: {
        color: '#aaa',
    }
})