/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

var NP_Config = {
    domain: "http://127.0.0.1:8086"
    , accessTokenInParam: false //是否给ajax请求参数添加token
    , tableName: 'NotePressAdmin'
    , request: {
        tokenName: "access_token" //自动携带 token 的字段名。可设置 false 不携带。
    }
    , response: {
        statusName: 'code' //数据状态的字段名称
        , statusCode: {
            ok: 200 //数据状态一切正常的状态码
            , logout: -3 //登录状态失效的状态码
        }
        , msgName: 'message' //状态信息的字段名称
        , dataName: 'data' //数据详情的字段名称
    }
};