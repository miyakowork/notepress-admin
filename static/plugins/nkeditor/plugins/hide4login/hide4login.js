KindEditor.plugin('hide4login', function (K) {
    var editor = this, name = 'hide4login';
    // 点击图标时执行
    editor.clickToolbar(name, function () {

        $.ajax({
            url: NP_Config.domain + "/admin/content/nextHideId",
            type: "get",
            dataType: "json",
            headers: {
                access_token: layui.data(NP_Config.tableName)[NP_Config.request.tokenName]
            },
            async: false,
            success: function (resp) {
                if (resp.code === 200) {
                    var dialog = K.dialog({
                        width: 600,
                        height: 430,
                        title: '添加隐藏模块（登录可见）',
                        body: '<div style="margin:10px;">' +
                            '<div id="hide4login" style="height: 300px;"></div>',
                        closeBtn: {
                            name: '关闭',
                            click: function (e) {
                                dialog.remove();
                            }
                        },
                        yesBtn: {
                            name: '确定',
                            click: function (e) {
                                var finalHtml = "<div data-hide='login' data-hid='" + resp.data + "' " +
                                    "style='margin-bottom: 10px;padding: 15px; line-height: 22px;" +
                                    "border: 1px dashed #F44336;border-radius: 0 2px 2px 0;background-color: #fcfcfc;'>"
                                    + hideCommentEditor.txt.html() + "</div>";
                                editor.insertHtml(finalHtml);
                                dialog.remove();
                            }
                        },
                        noBtn: {
                            name: '取消',
                            click: function (e) {
                                dialog.remove();
                            }
                        }
                    });
                } else {
                    layer.msg("获取token失败，请刷新重试！");
                }
            }
        });
        var E = window.wangEditor;
        var hideCommentEditor = new E('#hide4login');
        hideCommentEditor.create()


    });
});