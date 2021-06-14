KindEditor.plugin('hide4purchase', function (K) {
    var editor = this, name = 'hide4purchase';
    // 点击图标时执行
    editor.clickToolbar(name, function () {
        $.ajax({
            url: NP_Config.domain + "/admin/content/nextHideId",
            type: "get",
            dataType: "json",
            async: false,
            headers: {
                access_token: layui.data(NP_Config.tableName)[NP_Config.request.tokenName]
            },
            success: function (resp) {
                if (resp.code === 200) {
                    var dialog = K.dialog({
                        width: 650,
                        height: 500,
                        title: '添加隐藏模块（购买可见）',
                        body: '<div style="margin:10px;padding: 10px;">' +
                            '<p style="margin-bottom: 10px;">' +
                            '<label for="hidePrice">所需硬币数：</label>' +
                            '<input class="layui-input-inline layui-input" type="number" min="0" id="hidePrice" name="hidePrice" placeholder="购买价格（硬币）" style="width: 200px;">' +
                            '</p>' +
                            '<div id="hide4purchase" style="height: 300px; width: 100%;"></div>',
                        closeBtn: {
                            name: '关闭',
                            click: function (e) {
                                dialog.remove();
                            }
                        },
                        yesBtn: {
                            name: '确定',
                            click: function (e) {
                                var price = $("input#hidePrice").val();
                                var finalHtml = "<div data-hide='purchase' data-hid='" + resp.data + "' data-price='" + price + "' " +
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
        var hideCommentEditor = new E('#hide4purchase');
        hideCommentEditor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'code' // 插入代码
        ];
        hideCommentEditor.create();


    });
});