/** Created By Wuwenbin https://wuwenbin.me
 * mail to wuwenbinwork@163.com
 * 欢迎加入我们，QQ群：697053454
 * if you use the code,  please do not delete the comment
 * 如果您使用了此代码，请勿删除此头部注释
 * */

layui.use(['form', 'upload'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.$,
        upload = layui.upload;

    layer.config({
        skin: 'layui-layer-lan'
    });

    upload.render({
        elem: '#uploadAvatar' //绑定元素
        , auto: false
        , bindAction: '#doUploadAvatar'
        //设定文件域的字段名
        , field: 'layFile'
        , url: NP_Config.domain + '/init/upload' //上传接口
        , data: {
            reqType: 'lay',
            code: 1
        }
        , choose: function (obj) {
            //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
            obj.preview(function (index, file, result) {
                $("#avatar").attr("src", result);
            });
            $("#uploadAvatar").text("重新选择");
            $("#uploadAvatar").attr("disabled", false);
        }
        , before: function () {
            $("#uploadAvatar").html('<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>上传中...');
        }
        , done: function (res) {
            NotePress.jsonResult(res, function (success) {
                layer.msg(success.data.msg);
                $("#avatar").attr("src", NP_Config.domain + success.data.data.src);
                $("#avatarField").val(success.data.data.src);
                $("#uploadStatus").css("display", "block");
                $("#uploadAvatar").text("重新选择");
            }, function (error) {
                layer.msg(error.msg);
                $("#uploadAvatar").text("重新上传");
                $("#uploadAvatar").attr("disabled", false);
            });
        }
        , error: function () {
            layer.msg("上传失败！");
            $("#uploadAvatar").text("重新上传")
        }
    });

    form.verify({
        username: function (value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名/昵称不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名/昵称首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名/昵称不能全为数字';
            }
            if (!/^[\S]{4,12}$/.test(value)) {
                return '用户名/昵称为4~12个字符';
            }
        }
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , repeatPass: function (value) {
            var pass = $("input[name=password]").val();
            if (pass !== value) {
                return '两次输入的密码不一致';
            }
        }
        , mail: [
            /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
            , '请输入正确的邮箱！'
        ]
    });

    $("#next").on('click', function () {
        $(this).hide();
        $("#prev").show();
        $("#base-form").hide();
        $("#uploadStatus").hide();
        $("#adminTxt").html(NotePress.questionExpressNotEmpty($("input[name=username]").val(), "<b>请填写用户名</b>"));
        $("#passTxt").html(NotePress.questionExpressNotEmpty($("input[name=password]").val(), "<b>请填写密码</b>"));
        $("#mailTxt").html(NotePress.questionExpressNotEmpty($("input[name=email]").val(), "<b>请填写Email</b>"));
        $("#nameTxt").html(NotePress.questionExpressNotEmpty($("input[name=nickname]").val(), "<b>请填写昵称</b>"));
        $("#advance-form").show();
        $("#submit").show();
    });

    $("#prev").on('click', function () {
        $(this).hide();
        $("#base-form").show();
        $("#next").show();
        $("#advance-form").hide();
        $("#submit").hide();
        if ($("#avatar").attr("src") !== '/notepress-admin/static/assets/image/noavatar.png') {
            $("#uploadStatus").show();
        }
    });


    form.on('submit(nbInit)', function (data) {
        var html = '<p style="color: #FF5722;">请您务必牢记所提交的信息！</p>';
        var obj = data.field;
        if (data && data.field && data.field.password) {
            data.field.password = md5(data.field.password);
        }
        var index = layer.confirm(html, {
            btn: ['确定', '我再看下']
            , title: '确认信息'
        }, function () {
            obj.password = md5(data.field.password);
            $.post(NP_Config.domain + '/init'
                , obj
                , function (json) {
                    layer.msg("     " + json.message, {icon: 1});
                    if (json.code === 200) {
                        setTimeout(function () {
                            location.href = "/notepress-admin/templates/admin/index.html";
                        }, 1000)
                    }
                    layer.close(index);
                });
        });
        return false;
    });

    $.get(NP_Config.domain + "/init/uploadPath", {}, function (resp) {
        if (resp.code === NotePress.Constant.CODE_SUCCESS) {
            $("#uploadPath").text(resp.data);
        }
    })
});


