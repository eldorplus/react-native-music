import {Dimensions} from 'react-native';
const Utils = {
    window: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    calculate: {
        /**
         * 把形如 “3：10”的字符串转成秒数
         * @param time
         */
        transStringToSecond: (time)=> {
            var second = parseInt((time[0] * 60 + time[2] * 10), 10) + parseInt(time[3], 10);
            if (time[2] == ':') {
                second = parseInt((time[0] + '' + time[1]), 10) * 60 + time[3] * 10 + parseInt(time[4], 10);
            }
            return second;
        },
        /**
         * 把秒转换成形如 "3:10"的字符串
         * @param second
         */
        transSecondToString: (second)=> {
            var minute = Math.floor(second / 60);
            var _second = Math.floor(second) - Math.floor(minute * 60);
            if (_second < 10) {
                _second = '0' + _second;
            }
            return minute + ':' + _second;
        },
    }
}
export default  Utils;