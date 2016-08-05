'use strict';
import React,{Component} from 'react';
import{
    View,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';

import Dimensions from 'Dimensions';
const {
    width : deviceWidth,
    height : deviceHeight,
    } = Dimensions.get('window');

//基础设置
const ANIMATION_END_Y = Math.ceil(deviceHeight * .3);
const NEGATIVE_END_Y = ANIMATION_END_Y * -1;
let startCount = 1;


/**
 * 基础-心
 */
class Heart extends Component {
    render() {
        return (
            <View style={[heartStyles.heart]}>
                <View style={[heartStyles.heartShape,heartStyles.left]}></View>
                <View style={[heartStyles.heartShape,heartStyles.right]}></View>
            </View>
        )
    }
}
const heartStyles = StyleSheet.create({
    heart: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent'
    },
    heartShape: {
        width: 30,
        height: 45,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#dd3f40',
        position: 'absolute',
        top: 0,

    },
    right: {
        transform: [
            {rotate: '45deg'}
        ],
        right: 5,
    },
    left: {
        transform: [
            {rotate: '-45deg'}
        ],
        left: 5,
    }
});

/**
 * 有动态的心
 */
class AnimatedHeart extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            position: new Animated.Value(0),
        };
    }

    componentWillMount() {
        this._yAnimation = this.state.position.interpolate({
            inputRange: [NEGATIVE_END_Y, 0],
            outputRange: [ANIMATION_END_Y, 0]
        });
        this._opacityAnimation = this._yAnimation.interpolate({
            inputRange: [0, ANIMATION_END_Y],
            outputRange: [1, 0]
        });
        this._scaleAnimation = this._yAnimation.interpolate({
            inputRange: [0, 15, 30],
            outputRange: [0, 1.2, 1],
            extrapolate: 'clamp'
        });
        this._xAnimation = this._yAnimation.interpolate({
            inputRange: [0, ANIMATION_END_Y / 2, ANIMATION_END_Y],
            outputRange: [0, 15, 0]
        });

        this._rotateAnimation = this._yAnimation.interpolate({
            inputRange: [0, ANIMATION_END_Y / 4, ANIMATION_END_Y / 3, ANIMATION_END_Y / 2, ANIMATION_END_Y],
            outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg']
        });
    }

    componentDidMount() {
        Animated.timing(this.state.position, {
            duration: 2000,
            toValue: NEGATIVE_END_Y
        }).start(this.props.onComplete);
    }

    /**
     * 获取动画样式
     */
    getHeartAnimationStyle() {
        return {
            transform: [
                {translateX: this._xAnimation},
                {translateY: this.state.position},
                {scale: this._scaleAnimation},
                {rotate: this._rotateAnimation},
            ],
            opacity: this._opacityAnimation
        }
    }

    render() {
        return (
            <Animated.View style={[animatedHeartStyle.heartWrap,this.getHeartAnimationStyle(),this.props.style]}>
                <Heart/>
            </Animated.View>
        )
    }
}
const animatedHeartStyle = StyleSheet.create({
    heartWrap: {
        position: 'absolute',
        bottom: 30,
    }
});


class HeartFloater extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            hearts: [],
        };
        this.addHeart = this.addHeart.bind(this);
        this.removeHeart = this.removeHeart.bind(this);
    }

    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    addHeart() {
        startCount += 1;
        this.state.hearts.push(
            {
                id: startCount,
                right: this.getRandomNumber(50, 150)
            }
        )
        this.setState(this.state);
    }

    removeHeart(v) {
        var index = this.state.hearts.findIndex((heart)=>heart.id === v);
        this.state.hearts.splice(index, 1);
        this.setState(this.state);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableWithoutFeedback
                    style={{flex:1}}
                    onPress={this.addHeart}>
                    <View style={{flex:1}}>
                        {
                            this.state.hearts.map((heart, i)=> {
                                return (
                                    <AnimatedHeart
                                        key={heart.id}
                                        onComplete={()=>{this.removeHeart(heart.id)}}
                                        style={{right:heart.right}}
                                        />
                                )
                            })
                        }
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


export default class Splash extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.splash}>
                <HeartFloater/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    splash: {
        flex: 1,
    },
});