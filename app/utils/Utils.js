import {Dimensions} from 'react-native';

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

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
    },
    /**
     * 生成唯一id
     * @param len
     * @param radix
     */
    uuid: (len, radix)=> {
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = 4;

            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    getCurrentTimestamp: ()=> {
        return (new Date()).valueOf()+'';
    },
}
export default  Utils;