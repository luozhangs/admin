$(function () {
    layui.use(['form'], function () {
        var form = layui.form;
    });
    resources.init();
})

var resources = {
    //初始化方法
    init: function () {
        //初始化button
        // this.form = form;
        this.initIndex();
        this.getListAjax();
    },
    initIndex: function () {
        var url = adminPath + "/resources/findBtn";
        JY.Ajax.doPost(null, url, {resUrl: "/resources/menu/list", type: "2"}, function (data) {
            JY.Tags.initButton($(".private-buttons"), data.model);
            resources.bindEvent();
        },"mmes");
    },
    //分页列表html
    html: function (m, permitBtn) {
        var html = [];
        html.push('<li class="layui-clear" style="background: #EBEFF5;" >');
        html.push('<span class="id-index"></span>');
        html.push('<span style="text-align: center">');
        // html.push( "<img src='../../image/tree_10.png' class='tree-img_10' />");
        html.push('<i class="mxx-text">' + JY.Object.notEmpty(m.name) + '</i>');
        /*if (m.nodes!=null&&m.nodes.length>0){
         html.push( '<i class="mxx-icon-right i-left"></i>');
         }*/
        html.push('</span>');
        // html.push('<i class="glyphicon '+m.icon+'"></i>');
        // html.push( JY.Object.notEmpty(m.name)+'</li>');
        // html.push( '<li class="pull-left">'+JY.Object.notEmpty(m.resUrl)+'</li>');
        html.push('<span style="text-align: left;text-indent: 1%;">' + JY.Object.notEmpty(m.resUrl) + '</span>');
        html.push('<span>' + (m.isValid == 1 ? "有效" : "无效") + '</span>');
        html.push('<span>' + JY.Object.notEmpty(m.descn) + '</span>');
        html.push('<span>');
        JY.Tags.setFunction(m.id, html, permitBtn);
        html.push('</span>');
        html.push('</li>');
        return this.setNodes(m.nodes, m.id, html, 0, permitBtn, true, true);
    },
    setMenuType: function (type) {
        var name;
        switch (type) {
            case 1:
                name = "菜单";
                break;
            case 2:
                name = "功能";
                break;
            case 3:
                name = "按钮";
                break;
            case 4:
                name = "权限";
                break;
        }
        return name;
    },
    setBtnType: function (type) {
        var name;
        switch (type) {
            case 'private-get-btn':
                name = "查询";
                break;
            case 'private-edit-btn':
                name = "修改";
                break;
            case 'private-del-btn':
                name = "删除";
                break;
            case 'private-edit-rule-btn':
                name = "授权";
                break;
            case 'private-edit-pwd-btn':
                name = "密码修改";
                break;
            case 'private-add-btn':
                name = "添加";
                break;
            case 'private-del-batch-btn':
                name = "批量删除";
                break;
            case 'private-refresh-btn':
                name = "刷新";
                break;
        }
        return name;
    },
    setNodes: function (nodes, parenetId, html, level, permitBtn, flag, pflag) {
        if (nodes != null && nodes.length > 0) {
            level++;
            for (var i = 0; i < nodes.length; i++) {
                var m = nodes[i];
                if (level == 1) {
                    html.push('<li class="layui-clear" data-value="' + m.id + '"  onclick="extendMenu(this,' + m.id + ',1);">');
                } else {
                    if (i == nodes.length - 1) {
                        html.push('<li class="layui-clear hide parent' + parenetId + '" data-value="' + m.id + '" onclick="extendMenu(this,' + m.id + ',2);">');
                    } else {
                        html.push('<li class="layui-clear hide parent' + parenetId + '" data-value="' + m.id + '" onclick="extendMenu(this,' + m.id + ',3);">');
                    }

                }
                html.push('<span class="id-index"></span>');
                html.push('<span>');
                var class_str = "";
                if (level == 2) {
                    //判断还有第一条竖线会margin-left
                    class_str = "tree-img";
                } else {
                    class_str = "tree-img_0";
                }
                if (level == 1) {
                    //二级目录图标
                    html.push("<img src='../../image/tree_0.png' class='tree-img_1' />");
                }
                var imgstr = "tree_line.png";
                if (!flag) {
                    imgstr = "tree_empty.png";
                }
                var img2str = "tree_empty.png";
                if (!pflag) {
                    img2str = "tree_line.png";
                }
                // console.log(img2str + "---" + level)
                for (var le = 2; le < level - 1; le++) {
                    if (le == 2) {
                        html.push("<img src='../../image/" + img2str + "' class='tree-img tree-img_line' />");
                    } else if (le > 2) {
                        html.push("<img src='../../image/" + img2str + "' class='tree-img_0 tree-img_line' />");
                    }
                    // html.push("<img src='../../image/" + img2str + "' class='tree-img_0 tree-img_line' />");
                }
                if (level > 2) {
                    if (le == 2) {
                        html.push("<img src='../../image/" + imgstr + "' class='tree-img tree-img_line' />");
                    } else if (le > 2) {
                        html.push("<img src='../../image/" + imgstr + "' class='tree-img_0 tree-img_line' />");
                    }
                    // html.push("<img src='../../image/" + imgstr + "' class='tree-img_0 tree-img_line' />");
                }
                if (level > 1) {
                    if (i == nodes.length - 1) {
                        html.push("<img src='../../image/tree_l.png' class='" + class_str + "'/>");
                    } else {
                        html.push("<img src='../../image/tree_T.png' class='" + class_str + "'/>");//需要更换
                    }
                }

                // html.push('<i class="glyphicon '+m.icon+'"></i>');
                // html.push( JY.Object.notEmpty(m.name)+'</li>');
                if (level == 1) {
                    html.push('<i class="mxx-text">' + JY.Object.notEmpty(m.name) + '</i>');
                }
                if (level > 1) {
                    html.push('<i class="mxx-text">' + resources.setMenuType(m.type) + '：' + JY.Object.notEmpty(m.name) + '</i>');
                }
                if (m.nodes != null && m.nodes.length > 0) {
                    html.push('<i class="mxx-icon-right i-left"></i>');
                }
                html.push('</span>');
                html.push('<span style="text-align: left;text-indent: 1%;">' + JY.Object.notEmpty(m.resUrl) + '</span>');
                html.push('<span>' + (m.isValid == 1 ? "有效" : "无效") + '</span>');
                html.push('<span>' + JY.Object.notEmpty(m.descn) + '</span>');
                html.push('<span>');
                JY.Tags.setFunction(m.id, html, permitBtn);
                html.push('</span>');
                html.push('</li>');

                if (flag) {
                    if (i == (nodes.length - 1) && level > 1) {
                        flag = false;
                    } else {
                        flag = true;
                    }
                }

                if (level == 2) {
                    if (i == (nodes.length - 1)) {
                        pflag = true;
                    } else {
                        pflag = false;
                    }
                }

                // console.log(nodes[i].name + "--" + i + "--" + flag + "---" + level + "----" + pflag);
                this.setNodes(m.nodes, m.id, html, level, permitBtn, flag, pflag);
            }
        }

        return html.join("");
    },
    dom: function (m, permitBtn) {
        var $dom = $(this.html(m, permitBtn));
        // $($dom).data("model",m);
        //绑定查询方法
        $($dom).find(".private-get-btn").bind({
            click: function (e) {
                e.stopPropagation();
                var url = adminPath + $(this).attr("res-url");
                JY.Ajax.doGet(null, url, {id: $(this).attr("data-value")}, function (data1) {
                    var dom = resources.formInsertGet(data1.model);
                    JY.Model.check(dom, "菜单详情", function (layero, index) {
                        var url = adminPath + "/resources/listResources";
                        var treeDom = $("<div style='display: none'></div>");
                        JY.Ajax.doGet(null, url, null, function (data) {
                            var treeObj = $.fn.zTree.init(treeDom, {data: {simpleData: {enable: true}}}, data.model);
                            var node = treeObj.getNodeByParam("id", data1.model.pid, null);
                            var nodes;
                            var path = "/";
                            if (node != null) {
                                nodes = node.getPath();
                                for (var i = 0; i < nodes.length; i++) {
                                    path += nodes[i].name + "/";
                                }
                            }
                            $(layero).find(".td-parent").text(path)
                        });
                    }, null, null, '500px');
                },"mmes");
            }
        });
        //绑定更新方法
        $($dom).find(".private-edit-btn").bind({
            click: function (e) {
                // var m = $(this).parents("ul.jur-tbody").data("model");
                e.stopPropagation();//阻止冒泡事件
                var url = adminPath + $(this).parent().find(".private-get-btn").attr("res-url");
                if (!JY.Object.notNull(url)) {
                    JY.Model.error("没有查看权限");
                    return;
                }
                var _this = this;
                //表单弹层
                JY.Ajax.doGet(null, url, {id: $(this).attr("data-value")}, function (data) {
                    JY.Tags.removeDisable("resources-form-id");
                    $("#resources-form-id  input[name='parentPath']").attr("readonly", true);
                    resources.updateFormInit(_this, data.model);
                },"mmes");
            }
        });
        //绑定删除方法
        $($dom).find(".private-del-btn").bind({
            click: function (e) {
                e.stopPropagation();//阻止冒泡事件
                var id = $(this).attr("data-value");
                resources.deleteAjax(id, this);
            }
        });

        //$("#resources-list-id").append($dom);
        return $dom;
    },
    formInsertGet: function (m) {
        var dom = [];
        dom.push('<div class="mxx-check-layer">');

        dom.push('<div>');
        dom.push('<p>状态：</p>');
        dom.push('<p>' + (m.isValid == 1 ? "有效" : "无效") + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>菜单名称：</p>');
        dom.push('<p>' + m.name + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>菜单路由：</p>');
        dom.push('<p>' + m.resUrl + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>上级菜单：</p>');
        dom.push('<p class="td-parent"></p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>菜单名类型：</p>');
        dom.push('<p>' + this.setMenuType(m.type) + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>排序：</p>');
        dom.push('<p>' + JY.Object.notEmpty(m.sort) + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>按钮类型：</p>');
        dom.push('<p>' + JY.Object.notEmpty(this.setBtnType(m.btnType)) + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>菜单描述：</p>');
        dom.push('<p>' + JY.Object.notEmpty(m.descn) + '</p>');
        dom.push('</div>');

        dom.push('</div>')
        return dom.join("");
    },
    initFormDom: function () {
        var dom = [];
        dom.push('<div class="form-div mxx-addEdit-layer">');
        dom.push('<form class="layui-form" id="resources-form-id">');
        dom.push('<div class="layui-form-item">');
        dom.push('<input type="hidden" name="id" />');
        dom.push('<label class="layui-form-label">菜单名称</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:名称不能为空"   name="name" placeholder="请输入菜单名称">');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('<div class="layui-form-item isValid">');
        dom.push('<label class="layui-form-label">状态</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="checkbox" class="switch" name="switch" lay-filter="switch"  lay-text="ON|OFF" checked value="1"  lay-skin="switch">');
        dom.push('<input type="hidden" name="isValid" value="1" />');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">菜单路径</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input"  name="resUrl" placeholder="请输入路由">');
        dom.push('</div>');
        dom.push('</div>');
        /*  dom.push('<div class="layui-form-item">');
         dom.push('<label class="layui-form-label">菜单图标</label>');
         dom.push('<div class="layui-input-block">');
         dom.push('<input type="text" class="layui-input"  name="icon" placeholder="请选择图标">');
         dom.push('</div>');
         dom.push('</div>');*/
        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">上级资源</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input"   name="parentPath" readonly="readonly"  placeholder="选择上级菜单">');
        // dom.push('<i class="clear-all" title="清空" >x</i>');
        dom.push('</div>');
        dom.push('<div class="layui-input-block tree-div" style="display: none">');
        dom.push('<input type="hidden"    name="pid" placeholder="">');
        dom.push('<ul  class="ztree" id="pre-resources-tree"></ul>');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">菜单类型</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<select  name="type" placeholder="菜单类型">');
        dom.push('<option value="1">菜单</option>');
        dom.push('<option value="2">功能</option>');
        dom.push('<option value="3">按钮</option>');
        dom.push('<option value="4">权限</option>');
        dom.push('</select>');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">排序</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input  name="sort" type="number" class="layui-input" placeholder="排序">');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">按钮类型</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<select name="btnType" placeholder="" lay-verify="">');
        dom.push('<option value="">请选择按钮类型</option>');
        dom.push('<option value="private-get-btn">查询</option>');
        dom.push('<option value="private-edit-btn">修改</option>');
        dom.push('<option value="private-del-btn">删除</option>');
        dom.push('<option value="private-edit-rule-btn">授权</option>');
        dom.push('<option value="private-edit-pwd-btn">密码修改</option>');
        dom.push('<option value="private-add-btn">添加</option>');
        dom.push('<option value="private-del-batch-btn">批量删除</option>');
        dom.push('<option value="private-refresh-btn">刷新</option>');
        dom.push('</select>');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label" >菜单描述</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<textarea type="text" class="layui-textarea"  name="descn" placeholder="请输入描述"></textarea>');
        dom.push('</div>');
        dom.push('</div>');
        dom.push('</form>');
        dom.push('</div>');

        return dom.join("");
    },
    formInsertDeal: function (m, dom) {
        $(dom).find("form").each(function () {

            $(this).find("input[name='id']").val(m.id);
            $(this).find("input[name='name']").val(JY.Object.notEmpty(m.name));
            $(this).find("input[name='resUrl']").val(JY.Object.notEmpty(m.resUrl));
            $(this).find("input[name='icon']").val(JY.Object.notEmpty(m.icon));
            $(this).find("input[name='pid']").val(JY.Object.notEmpty(m.pid));

            $(this).find("input[name='isValid']").val(JY.Object.notEmpty(m.isValid));
            $(this).find("input[name='switch']").attr("checked", m.isValid == 1 ? true:false);
            window.top.index.form.on('switch(switch)', function (data) {
                $(dom).find("input[name='isValid']").val(data.elem.checked ? 1 : 0);
            });

            //设置父级菜单
            resources.showResourceTree(m, dom);
            $(this).find("input[name='parentPath']").off("click");
            $(this).find("input[name='parentPath']").on("click", function () {
                JY.Model.showHidden($(dom).find(".tree-div"));
            });
            /* $(this).find(".clear-all").off("click");
             $(this).find(".clear-all").on("click", function () {
             resources.clearParnetId(dom);
             });*/

            $(this).find("select[name='type']").each(function () {
                try {
                    $(this).find("option[value=" + m.type + "]").prop("selected", true);
                } catch (e) {
                }
            });
            $(this).find("input[name='sort']").val(JY.Object.notEmpty(m.sort));
            $(this).find("select[name='btnType']").each(function () {
                try {
                    $(this).find("option[value=" + m.btnType + "]").prop("selected", true);
                } catch (e) {
                }
            });
            $(this).find("textarea[name='descn']").val(JY.Object.notEmpty(m.descn));
            //初始隐藏资源树容器
        });
        window.top.index.form.render();
    },


    //列表查询成功
    getListSuccess: function (data) {

        var list = data.model;
        // var permitBtn = data.model.permitBtn;
        JY.Ajax.doPost(null, adminPath + "/resources/findBtn", {
            resUrl: "/resources/menu/list",
            type: "3"
        }, function (data) {
            var permitBtn = data.model;
            var $list = $("#resources-list-id");
            $($list).html("");
            for (var i = 0, len = list.length, o; i < len; i++) {
                o = list[i];
                $list.append(resources.dom(o, permitBtn));
            }
            var i = 1;
            $(".id-index").each(function () {
                $(this).text(i++)
            });
        });
    },

    getListAjax: function () {
        // var menu_url="&menuId="+JY.Url.getParam("menuId");
        var url = adminPath + "/resources/menu/list";
        $("#resources-list-id").trigger("startLoading");
        JY.Ajax.doGet(null, url, null, function (data) {
            resources.getListSuccess(data);
        },"mmes");
    },

    //异步删除
    deleteAjax: function (id, obj) {
        // var theUrl = adminPath+"/resources/tranDelete";
        var url = adminPath + $(obj).attr("res-url");
        JY.Model.confirm("是否删除？", function () {
            JY.Ajax.doGet(null, url, {id: id}, function (data) {
                JY.Model.info(data.mes, function () {
                    resources.getListAjax();
                    window.top.index.initData();
                });
            },"malert");
        });

    },


    addFormInit: function (obj) {

        var dom = this.initFormDom();
        JY.Model.edit(dom, "添加", function (layero) {
                $(layero).find("div.isValid").remove();
                resources.showResourceTree(null, layero);
                $(layero).find("form").find("input[name='parentPath']").off("click");
                $(layero).find("form").find("input[name='parentPath']").on("click", function () {
                    JY.Model.showHidden($(layero).find(".tree-div"));
                });
                /*    $(layero).find(".clear-all").off("click");
                 $(layero).find(".clear-all").on("click", function () {
                 resources.clearParnetId(layero);
                 });*/
                window.top.index.form.render();
            },
            function (index, layero) {
                var _this = index;
                if (!JY.Validate.form(layero)) {
                    return;
                }
                // var theUrl = adminPath+"/resources/add";
                // var url = adminPath + $(obj).attr("res-url");
                var url = adminPath + "/resources/add";
                JY.Ajax.doPost($(layero).find("form"), url, null, function (data) {
                    window.top.index.layer.close(_this);
                    JY.Model.info(data.mes, function () {
                        resources.getListAjax();
                        window.top.index.initData();
                    });
                },"malert");
            }, null, null, '620px');
    },
    updateFormInit: function (obj, data) {
        var dom = this.initFormDom();
        JY.Model.edit(dom, "更新", function (layero) {
                resources.formInsertDeal(data, layero);
                window.top.index.form.render();
            },
            function (index, layero) {
                if (!JY.Validate.form($(layero).find("form"))) {
                    return;
                }
                var url = adminPath + $(obj).attr("res-url");
                JY.Model.confirm("确认更新", function () {
                    JY.Ajax.doPost($(layero).find("form"), url, null, function (data) {
                        window.top.index.layer.close(index);
                        JY.Model.info(data.mes, function () {
                            resources.getListAjax();
                            window.top.index.initData();
                        });
                    },"malert");
                });

            }, null, null, '650px');
    },

    bindEvent: function () {
        //绑定表单添加事件
        $(".private-buttons").on({
            add:function (event,obj) {
                resources.addFormInit(this);
            },
            refresh:function () {
                resources.getListAjax();
            }
        });
        $(".private-add-btn").on("click", function () {
            var _this = this;
            $(this).parents(".private-buttons").trigger("add",_this);
        });
        //绑定刷新事件
        $(".private-refresh-btn").on("click", function () {
            $(this).parents(".private-buttons").trigger("refresh");
        });

        //绑定批量删除事件
    },

    showResourceTree: function (m, dom) {
        // $("#parent-div-id").hide();
        $(dom).find(".tree-div").hide();
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    if (treeNode == null) {
                        return;
                    }
                    if (JY.Object.notNull(m) && (m.id == treeNode.id || m.id == treeNode.pId)) {
                        return;
                    }
                    var node = treeNode.getPath();
                    var path = "/";
                    for (var i = 0; i < node.length; i++) {
                        path += node[i].name + "/";
                    }
                    $(dom).find("form").each(function () {
                        $(this).find("input[name='parentPath']").val(path);
                        $(this).find("input[name='pid']").val(treeNode.id);
                    });
                    $(dom).find(".tree-div").hide();
                }
            },
            data: {simpleData: {enable: true}}
        };
        var url = adminPath + "/resources/listResources";
        JY.Ajax.doGet(null, url, null, function (data) {
            var treeObj = $.fn.zTree.init($(dom).find(".ztree"), setting, data.model);
            if (!JY.Object.notNull(m)) {
                return;
            }
            // var treeObj = $.fn.zTree.getZTreeObj("pre-resources-tree");
            var node = treeObj.getNodeByParam("id", m.pid, null);
            var nodes;
            var path = "/";
            if (node != null) {
                nodes = node.getPath();
                for (var i = 0; i < nodes.length; i++) {
                    path += nodes[i].name + "/";
                }
            }
            $(dom).find("form").find("input[name='parentPath']").val(path);
            // $("#resources-form-id input[name='parentPath").val(path);
        },"mmes");
    },
    //清空上级资源内容
    clearParnetId: function (dom) {
        $(dom).each(function () {
            $(this).find(".tree-div").hide();
            $(this).find("input[name='parentPath']").val("");
            $(this).find("input[name='pid']").val(0);
        });
    }
};

/*
 * 打开子菜单
 */
function extendMenu(o, id, flag) {
    var obj = $(o).find("i.i-left");
    if ($(obj).hasClass('mxx-icon-right')) {
        $(obj).removeClass("mxx-icon-right").addClass("mxx-icon-down");
        $("li.layui-clear.parent" + id).slideDown();
        if (flag == 1) {
            $(o).find("img").attr("src", "../../image/tree_1.png");
        }
        if (flag == 2) {
            $(o).find("img:last").attr("src", "../../image/tree_z.png");
        }
        if (flag == 3) {
            $(o).find("img:last").attr("src", "../../image/tree_h.png");
        }
        // open(obj, id);
    } else if ($(obj).hasClass('mxx-icon-down')) {
        $(obj).removeClass("mxx-icon-down").addClass("mxx-icon-right");
        $("li.layui-clear.parent" + id).slideUp();
        if (flag == 1) {
            $(o).find("img").attr("src", "../../image/tree_0.png");
        }
        if (flag == 2) {
            $(o).find("img:last").attr("src", "../../image/tree_l.png");
        }
        if (flag == 3) {
            $(o).find("img:last").attr("src", "../../image/tree_T.png");
        }
        hiden(obj, id);
    }
}
//递归打开
function open(obj, id) {
    $(obj).removeClass("mxx-icon-right").addClass("mxx-icon-down");
    $("li.layui-clear.parent" + id).show();
    $("li.layui-clear.parent" + id).each(function () {
        open($(this).find("i.i-left"), $(this).attr("data-value"));
    });
}
//递归隐藏
function hiden(obj, id) {
    $(obj).removeClass("mxx-icon-down").addClass("mxx-icon-right");
    $("li.layui-clear.parent" + id).slideUp();
    $("li.layui-clear.parent" + id).each(function () {
        hiden($(this).find("i.i-left"), $(this).attr("data-value"));
        if ($(this).find("img:last").attr("src") == "../../image/tree_h.png") {
            $(this).find("img:last").attr("src", "../../image/tree_T.png");
        }
        if ($(this).find("img:last").attr("src") == "../../image/tree_z.png") {
            $(this).find("img:last").attr("src", "../../image/tree_l.png");
        }
    });
}