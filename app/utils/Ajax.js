'use strict';
/**
 * 用于数据传输时使用
 * @param obj
 * @returns {string}
 */
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

const Ajax = {
    post: (url, params, callback)=> {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: toQueryString(params)
        })
            .then(res => res.json())
            .then(res => {
                callback(res);
            }
        )
            .catch(msg=> {
                console.log('ajax-post-error:' + msg)
            })
            .done();
    },
    //fixme  先判断url是否有 &符号
    get: (url, params, callback)=> {
        url = url + '&' + toQueryString(params);
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                callback(res);
            }
        )
            .catch(msg=> {
                console.log('ajax-post-error:' + msg)
            })
            .done();
    }
}
export default Ajax;