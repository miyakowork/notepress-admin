/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

/**
 * 全局方法
 * @type
 */
var NotePress = {
    Constant: {
        CODE_SUCCESS: 200
    }

    , showMsgRefresh: function (resp, callback) {
        layer.msg(resp.message);
        if (callback) {
            callback();
        }
        setTimeout(function () {
            if (resp.code === NotePress.Constant.CODE_SUCCESS) {
                location.reload();
            }
        }, 1000);
    }

    /**
     * 通用 json 处理
     * @param json
     * @param successCallback
     * @param errorCallback
     */
    , jsonResult: function (json, successCallback, errorCallback) {
        if (json.code === NotePress.Constant.CODE_SUCCESS) {
            successCallback(json);
        } else {
            errorCallback(json);
        }
    }

    /**
     * 不等于空的问号表达式
     * @param value
     * @param falseExpress
     * @returns {*}
     */
    , questionExpressNotEmpty: function (value, falseExpress) {
        if (value !== null && value !== '') {
            return value;
        }
        return falseExpress;
    }
};

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

/**
 * 全局处理ajax
 */
//全局ajax拦截处理

$(document).ajaxSuccess(function (event, xhr, options) {
    var respTxt = String(xhr.responseText);
    var data = {};
    try {
        data = eval('(' + respTxt + ')');
    } catch (error) {
        //说明不是json对象
    }
    if (data.code) {
        if (data.code !== NotePress.Constant.CODE_SUCCESS) {
            layer.close(layer.index);
            layer.msg(data.message);
        }
    }
});

$(document).ajaxError(function (event, xhr, options, exc) {
    if (xhr.responseJSON !== undefined && xhr.responseJSON) {
        var resp = xhr.responseJSON;
        layer.close(layer.index);
        layer.msg(resp.message);
    }
});

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    header: {
        "Set-Cookie": "widget_session=abc123; SameSite=None; Secure"
    }
});

