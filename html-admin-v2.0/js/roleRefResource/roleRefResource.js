$(function () {
    layui.use("form", function () {
        var form = layui.form;
        roleRefResource.init(form);
    });
})

var roleRefResource = {
    beClickNode: {},
    init: function (form) {
        this.form = form;
        this.bindAllEvent();
        this.initIndex();
        this.initTypeIndex();
        this.initTree();
        $("#roles-list-id").data("pn", 1);
        $("#roles-list-id").data("ps", 10);
        this.getListAjax();
    },
    initIndex: function () {
        var url = adminPath + "/resources/findBtn";
        JY.Ajax.doPost(null, url, {
            resUrl: "/role/page",
            type: "2"
        }, function (data) {
            var funBtn = data.model;
            JY.Tags.initButton($(".mxx-add-new"), funBtn);
            //绑定表单添加事件
            $(".mxx-add-new .private-add-btn").on("click", function () {
                roleRefResource.addFormInit(this);
            });
        },"mmes");
    },
    initTypeIndex: function () {
        var url = adminPath + "/resources/findBtn";
        JY.Ajax.doPost(null, url, {
            resUrl: "/role/type/type/tree",
            type: "2"
        }, function (data) {
            var funBtn = data.model;
            var html = [];
            for (var i = 0; i < funBtn.length; i++) {
                html.push('<p class="btn ' + funBtn[i].icon + ' ' + funBtn[i].btnType + '"  res-url="' + funBtn[i].resUrl + '"><span>' + funBtn[i].name + '</span></p>');
            }
            $(".private-tree-box").append(html.join(""));
            roleRefResource.bindLeftEvent();
        },"mmes");
    },
    initTree: function () {
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    roleRefResource.beClickNode = treeNode;
                    roleRefResource.getListAjax(1, 10, treeNode.id);
                }
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
        var url = adminPath + "/role/type/type/tree";
        JY.Ajax.doGet(null, url, null, function (data) {
            $.fn.zTree.init($("#mxx-tree"), setting, data.model);
        },"mmes");
    },
    html: function (m, index, permitBtn) {
        var html = [];
        html.push('<li>');
        html.push('<span class="id-index">' + (index + 1) + '</span>');
        html.push('<span >' + JY.Object.notEmpty(m.title) + '</span>');
        html.push('<span>' + (m.isValid == 1 ? "有效" : "无效") + '</span>');
        html.push('<span>' + JY.Object.notEmpty(m.descn) + '</span>');
        html.push('<span class="mxx-button-box">');
        JY.Tags.setFunction(m.id, html, permitBtn);
        html.push('</span>');
        html.push('</li>');
        return html.join("");
    },

    dom: function (m, index, permitBtn) {
        var $dom = $(this.html(m, index, permitBtn));
        $($dom).data("model", m);
        //绑定角色授权方法
        $($dom).find(".private-edit-rule-btn").bind({
            click: function () {
                var m = $(this).parents("li").data("model");
                //表单弹层
                roleRefResource.getRolesInit(m, this);
            }
        });
        //绑定查询方法
        $($dom).find(".private-get-btn").bind({
            click: function () {
                var m = $(this).parents("li").data("model");

                var dom = roleRefResource.formInsertGet(m);
                //表单弹层
                JY.Model.check(dom, "详情", function (layero) {
                    var url = adminPath + "/role/type/type/tree";
                    var treeDom = $("<div style='display: none'></div>");
                    JY.Ajax.doGet(null, url, null, function (data) {
                        var treeObj = $.fn.zTree.init(treeDom, {
                            data: {
                                simpleData: {
                                    enable: true
                                }
                            }
                        }, data.model);
                        //显示数据库中的父级菜单数据
                        var path = "/";
                        if (JY.Object.notNull(m)) {
                            var node = treeObj.getNodeByParam("id", m.pid, null);
                            var nodes;
                            if (node != null) {
                                nodes = node.getPath();
                                for (var i = 0; i < nodes.length; i++) {
                                    path += nodes[i].name + "/";
                                }
                            }
                        }
                        $(layero).find(".td-parent").text(path)
                    },"mmes");
                });
            }
        });
        //绑定更新方法
        $($dom).find(".private-edit-btn").bind({
            click: function () {
                var m = $(this).parents("li").data("model");
                var dom = roleRefResource.formInsertDom();
                var _this = this;
                JY.Model.edit(dom, "更新", function (layero) {
                        //绑定父级目录事件
                        roleRefResource.formInsertDeal(m, layero);
                        window.top.index.form.render();
                    },
                    function (index, layero) {
                        roleRefResource.updateFormInit(_this, index, layero);
                    },null,null,'450px');
            }
        });
        //绑定删除方法
        $($dom).find(".private-del-btn").bind({
            click: function () {
                roleRefResource.deleteAjax(m.id, this);
            }
        });
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
        dom.push('<p>角色名称名称：</p>');
        dom.push('<p>' + m.title + '</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>上级目录：</p>');
        dom.push('<p class="td-parent"></p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>排序：</p>');
        dom.push('<p>' + JY.Object.notEmpty(m.sort) + '</p>');
        dom.push('</div>');


        dom.push('<div>');
        dom.push('<p>菜单描述：</p>');
        dom.push('<p>' + JY.Object.notEmpty(m.descn) + '</p>');
        dom.push('</div>');

        dom.push('</div>');
        return dom.join("");
    },
    formInsertDom: function () {
        var dom = [];
        dom.push('<div class="mxx-addEdit-layer">');
        dom.push('<form class="layui-form roles-form-id">');
        dom.push('<div class="layui-form-item">');
        dom.push('<input type="hidden" name="id"  />');
        dom.push('<label class="layui-form-label">角色名称</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:名称不能为空"   name="title" placeholder="请输入角色名称"/>');
        dom.push('</div>');
        dom.push('</div>');

        dom.push('<div class="layui-form-item isValid">');
        dom.push('<label class="layui-form-label">状态</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="checkbox" name="switch" id="switch" lay-filter="switch"   lay-text="ON|OFF" checked value="1"  lay-skin="switch">');
        dom.push('<input type="hidden" name="isValid" value="1"  />');
        dom.push('</div>');
        dom.push('</div>');

        dom.push(' <div class="layui-form-item">');
        dom.push(' <label class="layui-form-label">上级目录</label>');
        dom.push(' <div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:角色类别不能为空"  name="parentName" readonly="readonly"  placeholder="角色类型">');
        // dom.push('<i class="clear-all" title="清空" >x</i>');
        dom.push('</div>');
        dom.push('<div class="layui-input-block tree-div roles-type-tree-div-id">');
        dom.push('<input type="hidden"   name="pid"  placeholder="">');
        dom.push('<ul  class="ztree roles-type-tree-id"></ul>');
        dom.push('</div>');
        dom.push(' </div>');

        dom.push(' <div class="layui-form-item">');
        dom.push(' <label class="layui-form-label">排序</label>');
        dom.push(' <div class="layui-input-block">');
        dom.push(' <input  name="sort" class="layui-input" value="1"  placeholder="排序">');
        dom.push(' </div>');
        dom.push('</div>');

        dom.push(' <div class="layui-form-item">');
        dom.push('<label class="layui-form-label" >描述</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<textarea type="text" class="layui-textarea"  name="descn" placeholder="请输入描述"></textarea>');
        dom.push('  </div>');
        dom.push(' </div>');

        dom.push('</form>');
        dom.push('</div>');

        return dom.join("");
    },
    formInsertDeal: function (m, dom) {
        $(dom).find("form").each(function () {

            $(this).find("input[name='id']").val(m.id);
            $(this).find("input[name='pid']").val(m.pid);
            $(this).find("input[name='isValid']").val(m.isValid);
            $(this).find("input[name='sort']").val(m.sort);
            $(this).find("input[name='title']").val(m.title);
            $(this).find("textarea[name='descn']").val(m.descn);
            $(this).find("input[name='switch']").attr("checked", m.isValid == 1 ? true : false);
        });
        //绑定父级目录事件
        this.bindParentEvent(m, dom);
    },
    clearParnetId: function (dom) {
        $(dom).each(function () {
            $(this).find(".roles-type-tree-div-id").hide();
            $(this).find("input[name='parentName']").val("");
            $(this).find("input[name='pid']").val(0);
        });
    },
    //绑定父级目录方法
    bindParentEvent: function (m, layero) {
        //加载角色树
        $(layero).find(".roles-type-tree-div-id").hide();
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    if (treeNode == null) {
                        return;
                    }
                    var path = "/";
                    var node = treeNode.getPath();
                    for (var i = 0; i < node.length; i++) {
                        path += node[i].name + "/";
                    }
                    $(layero).find(".roles-form-id").each(function () {
                        $(this).find("input[name='parentName']").val(path);
                        $(this).find("input[name='pid']").val(treeNode.id);
                    });
                    $(layero).find(".roles-type-tree-div-id").hide();
                }
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
        var url = adminPath + "/role/type/type/tree";
        JY.Ajax.doGet(null, url, null, function (data) {
            var treeObj = $.fn.zTree.init($(layero).find(".roles-type-tree-id"), setting, data.model);
            //显示数据库中的父级菜单数据
            var path = "/";
            if (JY.Object.notNull(m)) {
                var node = treeObj.getNodeByParam("id", m.pid, null);
                var nodes;
                if (node != null) {
                    nodes = node.getPath();
                    for (var i = 0; i < nodes.length; i++) {
                        path += nodes[i].name + "/";
                    }
                }
                $(layero).find(".roles-form-id").each(function () {
                    $(this).find("input[name='parentName']").val(path);
                });
            }

        },"mmes");
        //取消绑定事件
        $(layero).find(".roles-form-id").find("input[name='parentName']").off('click');
        //绑定角色事件
        $(layero).find(".roles-form-id").find("input[name='parentName']").on('click', function () {
            JY.Model.showHidden($(layero).find(".roles-type-tree-div-id"));
        });
        /* $(layero).find(".clear-all").off("click");
         $(layero).find(".clear-all").on("click",function () {
         roleRefResource.clearParnetId(layero);
         });*/
        window.top.index.form.on('switch(switch)', function (data) {
            $(layero).find("input[name='isValid']").val(data.elem.checked ? 1 : 0);
        });
    },

    //列表查询成功
    getListSuccess: function (data, pid) {
        var page = data.model;
        var list = page.result;
        var $list = $("#roles-list-id");
        $($list).html("");
        JY.Ajax.doPost(null, adminPath + "/resources/findBtn", {
            resUrl: "/role/page",
            type: "3"
        }, function (data) {
            var permitBtn = data.model;
            for (var i = 0, len = list.length, o; i < len; i++) {
                o = list[i];
                if (o.id==1&&JY.getZxxData("account").roleId!=1){
                    continue;
                }
                $list.append(roleRefResource.dom(o, i, permitBtn));
            }
            //添加分页
            JY.Pageing("mxx-paging", page, function (pageNo, pageSize) {
                roleRefResource.getListAjax(pageNo, pageSize);
            });
            //缓存页码和pageSize
            $($list).data("pn", page.pageNo);
            $($list).data("ps", page.pageSize);
            //缓存角色分组id
            $($list).data("pid", pid);
            var i = page.pageNo * page.pageSize + 1;
            if (page.pageNo == 1) {
                i = 1;
            }
            $(".id-index").each(function () {
                $(this).text(i++)
            });
        },"mmes");

    },

    getListAjax: function (pn, ps, pid) {
        pn = pn || $("#roles-list-id").data("pn");
        ps = ps || $("#roles-list-id").data("ps");
        if (pid == -1) {
            pid = null;
        } else {
            pid = pid || $("#roles-list-id").data("pid");
        }
        var keyWord = JY.Object.notEmpty($("div.mxx-form-input").find('input[name="price_min"]').val());
        var isValid = $("div.mxx-form-select").find('select[name="isValid"]').val();
        var json_url = "&isValid=" + isValid + "&keyWord=" + keyWord + "&pid=" + JY.Object.notEmpty(pid);
        var url = adminPath + "/role/page?pageNo=" + pn + "&pageSize=" + ps + json_url;
        // console.log(url)
        $("#roles-list-id").trigger("startLoading");
        JY.Ajax.doGet(null, url, null, function (data) {
            roleRefResource.getListSuccess(data, pid);
        });
    },

    //异步删除
    deleteAjax: function (id, obj) {
        // var theUrl = adminPath+"/role/del";
        var url = adminPath + $(obj).attr("res-url");
        JY.Model.confirm("是否删除？", function () {
            JY.Ajax.doGet(null, url, {
                id: id
            }, function (data) {
                JY.Model.info(data.mes, function () {
                    roleRefResource.getListAjax();
                });
            });
        },"malert");
    },


    bindAllEvent: function () {
        // 搜索框前下拉框
        this.form.on("select(isValid)", function (data) {
            roleRefResource.getListAjax(1, null, -1);
        });
        // 右侧搜索
        $('.mxx-form-input').bind({
            search: function () {
                //搜索方法
                roleRefResource.getListAjax(1, null, -1);
            }
        }).find('input').on('keydown', function (e) {
            if (e.keyCode === 13) {
                $(this).parent().trigger('search');
            }
        }).parent().find('i').on('click', function () {
            $(this).parent().trigger('search');
        });
    },
    bindLeftEvent: function () {
        $('.private-category').on('click', function () {
            $(this).siblings('.private-tree-box').toggle();
        });
        // 分类事件
        // 新增
        $('.private-tree-box .private-add-btn').on('click', function () {
            roleRefResource.addRoleTypeTree(this);
        });
        // 修改
        $('.private-tree-box .private-edit-btn').on('click', function () {
            roleRefResource.updateRoleTree(this);
        });

        // 删除
        $('.private-tree-box .private-del-btn').on('click', function () {
            roleRefResource.delRoleType(this);
        });
    },
    delRoleType: function (obj) {
        // var url=adminPath+"/role/type/del?id="+roleRefResource.beClickNode.id+"&delType=1";
        if (!JY.Object.notNull(this.beClickNode.id)) {
            return;
        }
        var url = adminPath + $(obj).attr("res-url");
        JY.Model.confirm("确认删除？", function () {
            JY.Ajax.doGet(null, url, {
                id: roleRefResource.beClickNode.id
            }, function (data) {
                JY.Model.info(data.mes, function () {
                    roleRefResource.initTree();
                });
            });
        },"malert");
    },
    addFormInit: function (obj) {
        var dom = this.formInsertDom();
        JY.Model.edit(dom, "添加",
            function (layero) {
                roleRefResource.bindParentEvent(null, layero);
                $(layero).find("div.isValid").remove();
            },
            function (index, layero) {
                if (!JY.Validate.form($(layero).find("form"))) {
                    return;
                }
                // var theUrl = adminPath+"/role/add";
                // var url = adminPath + $(obj).find("span.add").attr("res-url");
                var url = adminPath + "/role/add";
                var _this = index;
                JY.Ajax.doPost($(layero).find("form"), url, null, function (data) {
                    window.top.index.layer.close(_this);
                    JY.Model.info(data.mes, function () {
                        roleRefResource.getListAjax();
                    });
                },"malert");
            });
    },
    getRolesInit: function (m, obj) {
        var roleId = m.id;
        if (!JY.Object.notNull(roleId)) {
            return;
        }
        var url = adminPath + "/role/list/authorized?roleId=" + roleId + "&layer=1";
        // var url=adminPath+$(obj).attr("res-url")+"?roleId="+roleId+"&layer=1";
        var dom = [];
        dom.push('<div style="height:350px;">');
        dom.push('<ul  class="ztree"></ul>');
        dom.push('</div>');
        dom = dom.join("");
        JY.Ajax.doGet(null, url, null, function (data) {
            var zTree;
            JY.Model.edit(dom, "角色授权",
                function (layero) {
                    zTree = $.fn.zTree.init($(layero).find("ul"), {
                        check: {
                            enable: true,
                            chkDisabledInherit: true,
                            chkboxType: {
                                "Y": "ps",
                                "N": "s"
                            }
                        },
                        data: {
                            simpleData: {
                                enable: true
                            }
                        }
                    }, data.model);
                },
                function (index) {
                    var nodes = zTree.getCheckedNodes(),
                        aus = "";
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        aus += nodes[i].id + ",";
                    }
                    if (aus.length > 0) aus = aus.substring(0, aus.length - 1);
                    //异步授权
                    var _this = index;
                    var data = {
                        "roleId": roleId,
                        "layer": 1,
                        "auss": aus
                    };
                    JY.Ajax.doPost(null, adminPath + $(obj).attr("res-url"), data, function (data) {
                        window.top.index.layer.close(_this)
                        JY.Model.info(data.mes, function () {
                            //授权成功后重新加载左侧导航菜单
                            window.top.index.initData();
                        });
                    },"malert");
                }, null, '300px');
        },"mmes");
    },

    updateFormInit: function (obj, index, dom) {

        if (!JY.Validate.form(dom.find("form"))) {
            return;
        }
        // var theUrl = adminPath+"/role/update";
        var url = adminPath + $(obj).attr("res-url");
        var _this = index;
        JY.Ajax.doPost(dom.find("form"), url, null, function (data) {
            window.top.index.layer.close(_this);
            JY.Model.info(data.mes, function () {
                roleRefResource.getListAjax();
            });
        },"malert");

    },


    initRoleTypeTree: function (m, dom) {
        //初始化角色树
        $(dom).find(".tree-div").hide();
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    if (treeNode == null) {
                        return;
                    }
                    var id = treeNode.id;
                    var pid = treeNode.pId;
                    if (JY.Object.notNull(m) && (m.id == id || m.id == pid)) {
                        return;
                    }
                    var path = "/";
                    var node = treeNode.getPath();
                    for (var i = 0; i < node.length; i++) {
                        path += node[i].name + "/";
                    }
                    $(dom).each(function () {
                        $(this).find("input[name='parentName']").val(path);
                        $(this).find("input[name='pid']").val(id);
                    });
                    $(dom).find(".tree-div").hide();
                }
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
        var url = adminPath + "/role/type/type/tree";
        JY.Ajax.doGet(null, url, null, function (data) {
            var treeObj = $.fn.zTree.init($(dom).find(".ztree"), setting, data.model);
            //显示数据库中的父级菜单数据
            var node = treeObj.getNodeByParam("id", roleRefResource.beClickNode.id, null);
            if (JY.Object.notNull(m)) {
                node = treeObj.getNodeByParam("id", m.pId, null);
            }
            var nodes;
            var path = "/";
            if (node != null) {
                nodes = node.getPath();
                for (var i = 0; i < nodes.length; i++) {
                    path += nodes[i].name + "/";
                }
            }
            $(dom).find("form").each(function () {
                $(this).find("input[name='parentName']").val(path);
                //其余数据是从缓存中所取
                if (JY.Object.notNull(m)) {
                    $(this).find("input[name='id']").val(m.id);
                    $(this).find("input[name='title']").val(m.name);
                    $(this).find("textarea[name='descn']").val(m.other);
                    $(this).find("input[name='pid']").val(m.pId);
                } else {
                    $(this).find("input[name='pid']").val(roleRefResource.beClickNode.id);
                }
            });
        },"mmes");
        //绑定一个单击事件用于显示父级菜单
        $(dom).find("input[name = 'parentName']").off("click");
        $(dom).find("input[name = 'parentName']").on("click", function () {
            JY.Model.showHidden($(dom).find(".tree-div"));
        });
        /* $(dom).find(".clear-all").off("click");
         $(dom).find(".clear-all").on("click",function () {
         roleRefResource.clearParnetId(dom);
         });*/

    },
    initRoleTypeDom: function () {
        var dom = [];
        dom.push('<div class="mxx-addEdit-layer">');
        dom.push('<form class="layui-form roles-form-id"">');

        dom.push('<div class="layui-form-item">');
        dom.push('<input type="hidden" name="id"  />');
        dom.push('<label class="layui-form-label">角色类型名称</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:名称不能为空"   name="title" placeholder="请输入名称"/>');
        dom.push('</div>');
        dom.push('</div>');

        dom.push(' <div class="layui-form-item">');
        dom.push(' <label class="layui-form-label">上级目录</label>');
        dom.push(' <div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input"   name="parentName" readonly="readonly"  placeholder="上级目录">');
        // dom.push('<i class="clear-all" title="清空" >x</i>');
        dom.push('</div>');
        dom.push('<div class="layui-input-block tree-div">');
        dom.push('<input type="hidden" name="pid" placeholder="">');
        dom.push('<ul  class="ztree"></ul>');
        dom.push('</div>');
        dom.push(' </div>');

        dom.push(' <div class="layui-form-item">');
        dom.push('<label class="layui-form-label" >描述</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<textarea type="text" class="layui-textarea"  name="descn" placeholder="请输入描述"></textarea>');
        dom.push('  </div>');
        dom.push(' </div>');

        dom.push('</form>');
        dom.push('</div>');
        return dom.join("");
    },
    addRoleTypeTree: function (obj) {
        var dom = this.initRoleTypeDom();
        //表单弹层
        JY.Model.edit(dom, "新增角色",
            function (layero) {
                roleRefResource.initRoleTypeTree(null, layero);
            },
            function (index, layero) {
                var url = adminPath + $(obj).attr("res-url");
                var _this = index;
                if (!JY.Validate.form($(layero).find("form"))) {
                    return;
                }
                JY.Ajax.doPost(layero.find("form"), url, null, function (data) {
                    window.top.index.layer.close(_this);
                    JY.Model.info(data.mes, function () {
                        roleRefResource.initTree();
                    });
                },"malert");
            });
    },

    updateRoleTree: function (obj) {
        if (this.beClickNode.id == null) {
            return;
        }
        var dom = this.initRoleTypeDom();
        //表单弹层
        JY.Model.edit(dom, "角色分组修改",
            function (layero) {
                roleRefResource.initRoleTypeTree(roleRefResource.beClickNode, layero);
            },
            function (index, layero) {
                var _this = index;
                var url = adminPath + $(obj).attr("res-url");
                if (!JY.Validate.form($(layero).find("form"))) {
                    return;
                }
                JY.Ajax.doPost($(layero).find("form"), url, null, function (data) {
                    window.top.index.layer.close(_this);
                    JY.Model.info(data.mes, function () {
                        roleRefResource.initTree();
                    });
                },"malert");
            });
    }
}