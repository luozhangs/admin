$(function () {
    layui.use("form",function () {
        var form = layui.form;
        account.init(form);
    });
});

var account = {
    beClickNode: {},//后面使用的
    //初始化方法
    init : function(form){
        //初始化button
        this.form = form;
        this.bindAllEvent();
        this.initIndex();
        this.initDeptIndex();
        //初始化页码
        this.initTree();
        $("#account-list-id").data("pn",1);
        $("#account-list-id").data("ps",10);
        this.getListAjax();
    },
    //初始化列表功能按钮
    initIndex:function () {
        var url = adminPath + "/resources/findBtn";
/*        $.ajax({
            url:url,
            data:JSON.stringify({resUrl:"/account/page",type:"2"}),
            type:"POST",
            dataType:"json",
            contentType:"application/json",
            success:function (data) {
                if (data.result==1){
                    var funBtn = data.model;
                    JY.Tags.initButton($(".mxx-add-new"),funBtn);
                    account.bindAllEvent();
                }else if(data.result == -1) {
                    //跳转到登录页面
                    // window.top.location.href = "/zxx/html/login/login.html";
                } else {
                    if(JY.Object.notNull(data.mes))
                        $.mmes(data.mes);
                    // JY.Model.loadingClose();
                }
            },
            error:function () {
                $.mmes();
            }
        });*/
        JY.Ajax.doPost(null,url, {resUrl:"/account/page",type:"2"}, function (data) {
            var funBtn = data.model;
            JY.Tags.initButton($(".mxx-add-new"),funBtn);
            //绑定表单添加事件
            $(".mxx-add-new .private-add-btn").on("click",function () {
                account.addFormInit(this);
            });
        },"mmes");
    },
    //初始化左侧树功能按钮
    initDeptIndex:function () {
        var url = adminPath + "/resources/findBtn";
       /* $.ajax({
            url:url,
            data:JSON.stringify({resUrl:"/dept/get/tree",type:"2"}),
            type:"POST",
            dataType:"json",
            contentType:"application/json",
            success:function (data) {
                if (data.result==1){
                    var funBtn = data.model;
                    var html = [];
                    for (var i=0;i<funBtn.length;i++){
                        html.push('<p class="'+JY.Object.notEmpty(funBtn[i].icon)+' '+funBtn[i].btnType+'"  res-url="'+JY.Object.notEmpty(funBtn[i].resUrl)+'"><span>'+funBtn[i].name+'</span></p>');
                    }
                    $(".private-tree-box").append(html.join(""));
                    account.bindEvent();
                }else if(data.result == -1) {
                    //跳转到登录页面
                    // window.top.location.href = "/zxx/html/login/login.html";
                } else {
                    if(JY.Object.notNull(data.mes))
                        $.mmes(data.mes);
                    // JY.Model.loadingClose();
                }
            },
            error:function () {
                $.mmes();
            }
        });*/
        JY.Ajax.doPost(null,url, {resUrl:"/dept/get/tree",type:"2"}, function (data) {
            var funBtn = data.model;
            var html = [];
            for (var i=0;i<funBtn.length;i++){
                html.push('<p class="btn '+JY.Object.notEmpty(funBtn[i].icon)+' '+funBtn[i].btnType+'"  res-url="'+JY.Object.notEmpty(funBtn[i].resUrl)+'"><span>'+funBtn[i].name+'</span></p>');
            }
            $(".private-tree-box").append(html.join(""));
            account.bindEvent();
        },"mmes");
    },
    //树结构获取
    //初始化左侧树
    initTree: function (m) {
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    account.beClickNode = treeNode;
                    account.getListAjax(1,10,treeNode.id);
                }
            },
            data:{simpleData:{enable:true}}
        };
        var url=adminPath+"/dept/get/tree?keyword="+JY.Object.notEmpty(m);
/*        $.ajax({
            url:url,
            type:"get",
            dataType:"json",
            success:function (data) {
                if (data.result==1){
                    $.fn.zTree.init($("#mxx-tree"), setting, data.model);
                }else if(data.result == -1) {
                    //跳转到登录页面
                    // window.top.location.href = "/zxx/html/login/login.html";
                } else {
                    if(JY.Object.notNull(data.mes))
                        $.mmes(data.mes);
                    // JY.Model.loadingClose();
                }
            },
            error:function () {
                $.mmes();
            }
        });*/
        JY.Ajax.doGet(null,url, null, function (data) {
            $.fn.zTree.init($("#mxx-tree"), setting, data.model);
        },"mmes");
    },

    //分页列表html
    html : function(m,index,permitBtn){
        var html = [];
        html.push('<li>');
        html.push('<span class="id-index">'+(index+1)+'</span>');
        html.push('<span >'+JY.Object.notEmpty(m.loginName)+'</span>');
        html.push('<span >'+JY.Object.notEmpty(m.realName)+'</span>');
        html.push('<span >'+JY.Object.notEmpty(m.roleName)+'</span>');
        html.push('<span >'+JY.Object.notEmpty(m.email)+'</span>');
        html.push('<span>'+(m.isValid==1?"有效":"无效")+'</span>');
        html.push('<span >'+JY.Object.notEmpty(m.phone)+'</span>');
        html.push('<span >'+JY.Object.notEmpty(m.deptName)+'</span>');
        html.push('<span class="mxx-button-box">');
        //按钮
        JY.Tags.setFunction(m.id, html,permitBtn);
        html.push('</span>');
        html.push('</li>');
        return html.join("");
    },

    //中间列表框的各按钮的功能
    dom : function(m,index,permitBtn){
        var $dom = $(this.html(m,index,permitBtn));
        $($dom).data("model",m);
        //绑定修改密码方法
        $($dom).find(".private-edit-pwd-btn").bind({
            click : function(){
                var m = $(this).parents("li").data("model");
                //表单弹层
                account.getPasswordInit(m,this);
            }
        });
        //绑定查询方法
        $($dom).find(".private-get-btn").bind({
            click : function(){
                var m = $(this).parents("li").data("model");
                //表单弹层
                var dom = account.formInsertGet(m);
                JY.Model.check(dom,"详情",null,null,null,'500px');
            }
        });
        //绑定更新方法
        $($dom).find(".private-edit-btn").bind({
            click : function(){
                var m = $(this).parents("li").data("model");

                account.updateFormInit(m, this);
            }
        });
        //绑定删除方法
        $($dom).find(".private-del-btn").bind({
            click : function(){
                account.deleteAjax(m.id,this);
            }
        });
        return $dom;
    },
    //详情table
    formInsertGet:function (m) {
        var dom = [];
        dom.push('<div class="mxx-check-layer">');

        dom.push('<div>');
        dom.push('<p>状态：</p>');
        dom.push('<p>'+(m.isValid==1?"有效":"无效")+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>登录名：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.loginName)+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>用户名：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.realName)+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>用户角色：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.roleName)+'</p>');
        dom.push('</div>');


        dom.push('<div>');
        dom.push('<p>用户部门：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.deptName)+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>性别：</p>');
        dom.push('<p>'+(m.sex==1?"男":"女")+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>邮箱：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.email)+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>手机号：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.phone)+'</p>');
        dom.push('</div>');

        dom.push('<div>');
        dom.push('<p>排序：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.sort)+'</p>');
        dom.push('</div>');


        dom.push('<div>');
        dom.push('<p>菜单描述：</p>');
        dom.push('<p>'+JY.Object.notEmpty(m.descn)+'</p>');
        dom.push('</div>');

        dom.push('</div>');
        return dom.join("");
    },
    //创建forn表单DOM对象
    formInsertDom:function () {
        var dom = [];
        dom.push('<div class="mxx-addEdit-layer">');
        dom.push('<form class="layui-form">');
        dom.push('<div class="layui-form-item">');
        dom.push('<input type="hidden" name="id"  />');
        dom.push('<label class="layui-form-label">登录名</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:登录名不允许为空,regexp#^[0-9a-zA-Z]+$:只能英文或数字"   name="loginName" placeholder="请输入登录名"/>');
        dom.push('</div>');
        dom.push('</div>');

        dom.push('<div class="layui-form-item isValid">');
        dom.push('<label class="layui-form-label">状态</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="checkbox" name="switch" id="switch" lay-filter="switch"   lay-text="ON|OFF" checked value="1"  lay-skin="switch">');
        dom.push('<input type="hidden" name="isValid" value="1"  />');
        dom.push('</div>');
        dom.push('</div>');

        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">用户名</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input"   name="realName" placeholder="请输入用户名"/>');
        dom.push('</div>');
        dom.push('</div>');

        dom.push(' <div class="layui-form-item">');
        dom.push(' <label class="layui-form-label">用户角色</label>');
        dom.push(' <div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:角色不能为空"  name="roleName" readonly="readonly"  placeholder="用户角色">');
        dom.push('</div>');
        dom.push('<div class="layui-input-block tree-div role-tree-div-id">');
        dom.push('<input type="hidden"   name="roleId" placeholder="">');
        dom.push('<ul  class="ztree role-tree-id" id="role"></ul>');
        dom.push('</div>');
        dom.push(' </div>');

        dom.push(' <div class="layui-form-item">');
        dom.push(' <label class="layui-form-label">用户部门</label>');
        dom.push(' <div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="required:部门不能为空"  name="deptName" readonly="readonly"  placeholder="用户部门">');
        dom.push('</div>');
        dom.push('<div class="layui-input-block tree-div dept-tree-div-id">');
        dom.push('<input type="hidden"  name="deptId" placeholder="">');
        dom.push('<ul  class="ztree dept-tree-id" id="dept"></ul>');
        dom.push('</div>');
        dom.push(' </div>');

        dom.push('<div class="layui-form-item" pane>');
        dom.push(' <label class="layui-form-label">性别</label>');
        dom.push('   <div class="layui-input-block">');
        dom.push('   <input type="radio" name="sex" value="1" title="男" checked>');
        dom.push('   <input type="radio" name="sex" value="0" title="女" >');
        dom.push(' </div>');
        dom.push(' </div>');

        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">邮箱</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input" jyValidate="email:邮箱不符合规则"   name="email" placeholder="请输入邮箱"/>');
        dom.push('</div>');
        dom.push('</div>');

        dom.push('<div class="layui-form-item">');
        dom.push('<label class="layui-form-label">手机号</label>');
        dom.push('<div class="layui-input-block">');
        dom.push('<input type="text" class="layui-input"  jyValidate="mobile:手机号不符合规则"  name="phone" placeholder="请输入手机号"/>');
        dom.push('</div>');
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
    //表单赋值
    formInsertDeal : function(m,dom){
        $(dom).find("form").each(function(){

            $(this).find("input[name='id']").val(m.id);
            $(this).find("input[name='loginName']").val(m.loginName);
            $(this).find("input[name='realName']").val(m.realName);
            $(this).find("input[name='roleId']").val(m.roleId);
            $(this).find("input[name='deptId']").val(m.deptId);
            $(this).find("input[name='roleName']").val(m.roleName);
            $(this).find("input[name='deptName']").val(m.deptName);
            $(this).find("input[name='sex'][value='"+m.sex+"']").prop("checked",true);
            $(this).find("input[name='email']").val(m.email);
            $(this).find("input[name='phone']").val(m.phone);
            $(this).find("input[name='identityCard']").val(m.idCard);
            $(this).find("input[name='sort']").val(m.sort);
            $(this).find("textarea[name='descn']").val(m.descn);
            $(this).find("input[name='switch']").attr("checked",m.isValid==1?true:false);
            //初始化角色树下拉框并且回显数据
            account.initRoleTree(dom,m);
            //绑定角色事件
            $(this).find("input[name='roleName']").off("click");
            $(this).find("input[name='roleName']").on("click",function () {
                //调用方法
                JY.Model.showHidden($(dom).find(".role-tree-div-id"));
            });
            //初始化部门树下拉框并且回显数据
            account.initDeptTree(dom);
            //绑定部门事件
            $(this).find("input[name='deptName']").off("click");
            $(this).find("input[name='deptName']").on("click",function () {
                //调用方法
                JY.Model.showHidden($(dom).find(".dept-tree-div-id"));
            });
            window.top.index.form.on('switch(switch)', function(data){
                $(dom).find("input[name='isValid']").val(data.elem.checked?1:0);
            });
        });
        window.top.index.form.render();
    },

    initRoleTree:function (dom,m) {
        // $("#role-tree-div-id").hide();
        $(dom).find(".role-tree-div-id").hide();
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    // roleRefResource.beClickNode = treeNode;
                    //如果为非超级管理员不能授权超级管理员
                    if(treeNode.isParent||(treeNode.id.split("_")[1]==1&&JY.getZxxData("account").roleId!=1)){
                        return;
                    }
                    //如果为非超级管理员不能将属于超级管理员角色的账户修改为其他角色
                    if (JY.Object.notNull(m)){
                        if (m.roleId==1&&JY.getZxxData("account").roleId!=1){
                            return;
                        }
                    }
                    $(dom).find("form").each(function () {
                        $(this).find("input[name='roleName']").val(treeNode.name);
                        $(this).find("input[name='roleId']").val(treeNode.id.split("_")[1]);
                    });
                    $(dom).find(".role-tree-div-id").hide();
                }
            },
            data:{simpleData:{enable:true}}
        };
        var url=adminPath+"/role/type/role/tree";
        JY.Ajax.doGet(null,url, null,function (data) {
            $.fn.zTree.init($(dom).find(".role-tree-id"), setting, data.model);
        });
    },

    initDeptTree:function (dom) {
        $(dom).find(".dept-tree-div-id").hide();
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    if (treeNode==null){
                        return;
                    }
                    $(dom).find("form").each(function () {
                        $(this).find("input[name='deptName']").val(treeNode.name);
                        $(this).find("input[name='deptId']").val(treeNode.id);
                    });
                    $(dom).find(".dept-tree-div-id").hide();
                }
            },
            data:{simpleData:{enable:true}}
        };
        var url=adminPath+"/dept/get/tree";
        JY.Ajax.doGet(null,url, null, function (data) {
            data=data.model;
            $.fn.zTree.init($(dom).find(".dept-tree-id"), setting, data);
        });
    },

    //列表查询成功
    getListSuccess : function(data,pid){
        var page = data.model;
        var list = page.result;
        var $list = $("#account-list-id");
        $($list).html("");
        JY.Ajax.doPost(null,adminPath+"/resources/findBtn",{resUrl:"/account/page",type:"3"},function (data) {
            var permitBtn = data.model;
            for(var i=0,len=list.length,o;i<len;i++){
                o = list[i];
                $list.append(account.dom(o,i,permitBtn));
            }
            //添加分页
            JY.Pageing("mxx-paging",page, function (pageNo,pageSize) {
                account.getListAjax(pageNo,pageSize);
            });
            //缓存页码和pageSize
            $( $list).data("pn",page.pageNo);
            $( $list).data("ps",page.pageSize)
            $( $list).data("pid",pid);
            var i = page.pageNo*page.pageSize+1;
            if (page.pageNo==1){
                i = 1;
            }
            $(".id-index").each(function () {
                $(this).text(i++)
            });
        });
    },

    getListAjax : function(pn,ps,pid){
        pn = pn || $("#account-list-id").data("pn");
        ps = ps || $("#account-list-id").data("ps");
        if (pid ==-1){
            pid = null;
        }else{
            pid  = pid || $("#account-list-id").data("pid");
        }
        var keyWord=JY.Object.notEmpty($("div.mxx-form-input").find('input[name="price_min"]').val());
        var isValid=$("div.mxx-form-select").find('select[name="isValid"]').val();
        var json="&keyWord="+JY.Object.notEmpty(keyWord)+"&isValid="+JY.Object.notEmpty(isValid)+"&deptId="+JY.Object.notEmpty(pid);
        var url = adminPath+"/account/page?&pageNo="+pn+"&pageSize="+ps+json;
        $("#account-list-id").trigger("startLoading");
        JY.Ajax.doGet(null,url,null, function (data) {
            account.getListSuccess(data,pid);
        });
    },

    //异步删除
    deleteAjax : function(id,obj){
        // var theUrl = adminPath+"/account/del";
        var url = adminPath+$(obj).attr("res-url");
        JY.Model.confirm("是否删除?",function () {
            JY.Ajax.doGet(null,url,{id:id},  function (data) {
                JY.Model.info(data.mes,function () {
                    account.getListAjax();
                });
            });
        });
    },

    //绑定按钮方法
    bindAllEvent:function () {

        // 搜索框前下拉框
        this.form.on("select(isValid)",function (data) {
            account.getListAjax(1,null,-1);
        });
        // 右侧搜索
        $('.mxx-form-input').bind({
            search: function () {
                //搜索方法
                account.getListAjax(1,null,-1);
            }
        }).find('input').on('keydown',function (e) {
            if(e.keyCode === 13) {
                $(this).parent().trigger('search');
            }
        }).parent().find('i').on('click',function () {
            $(this).parent().trigger('search');
        });

        $('.private-category').on('click',function () {
            $(this).siblings('.private-tree-box').toggle();
        });
    },

    addFormInit : function(obj){

        var dom = this.formInsertDom();
        JY.Model.edit(dom,"添加操作",
            function (layero) {
                //绑定角色事件
                account.initRoleTree(layero);
                account.initDeptTree(layero);
                $(layero).each(function () {
                    $(this).find("input[name='roleName']").off("click");
                    $(this).find("input[name='roleName']").on("click",function () {
                        //调用方法
                        JY.Model.showHidden($(layero).find(".role-tree-div-id"));
                    });
                    $(this).find("input[name='deptName']").off("click");
                    $(this).find("input[name='deptName']").on("click",function () {
                        //调用方法
                        JY.Model.showHidden($(layero).find(".dept-tree-div-id"));
                    });
                });
                $(layero).find("div.isValid").remove();
                window.top.index.form.render();
            },
            function (index,layero) {
                var _this=index;
                if(!JY.Validate.form($(layero).find("form"))){
                    return;
                }
                // var theUrl = adminPath+"/account/insert/account";
                var url = adminPath+"/account/add";
                JY.Ajax.doPost($(layero).find("form"),url, null,function (data) {
                    window.top.index.layer.close(_this);
                    JY.Model.info(data.mes,function () {
                        account.getListAjax();
                    });
                });
            },null,null,'600px');
    },

    getPasswordInit:function (m,obj) {
        $("#password-form-id input[name='id']").val(m.id);
        var dom = [];
        dom.push('<div style="width: 200px;height: 90px;">');
        dom.push(' <form  onsubmit="return false">');
        dom.push('<div style="width: 280px;height: 100px">');
        dom.push('<label style="float:left;margin: 33px 0px 0px 20px;">密码：</label>');
        dom.push('<input type="text" style="float: left; margin: 27px 20px 0px 6px;height: 27px;"  name="password" placeholder="请输入密码"/>');
        dom.push('<input type="hidden"    name="id" value="'+m.id+'" placeholder="请输入密码"/>');
        dom.push('</div>');
        dom.push('</form>')
        dom.push('</div>');
        JY.Model.edit(dom.join(""),"密码重置", null,function (index,layero) {
            var _this=index;
            var url = adminPath+$(obj).attr("res-url");
            JY.Ajax.doPost($(layero).find("form"),url,null,function (data) {
                window.top.index.layer.close(_this);
                JY.Model.info(data.mes,function () {
                    account.getListAjax();
                });
            },"malert");
        },null,'300px','200px');
    },

    updateFormInit : function(m,obj){
        var dom = this.formInsertDom();
        JY.Model.edit(dom,"更新操作",
            function (layero) {
                account.formInsertDeal(m,layero);
                $(layero).find("form").find("input[name='loginName']").attr("readonly",true);
            },
            function (index,layero) {
                var _this=index;
                if (!JY.Validate.form($(layero).find("form"))){
                    return;
                }
                JY.Model.confirm("确认更新么？",function () {
                    // var theUrl = adminPath+"/account/set/per/data";
                    var url = adminPath+$(obj).attr("res-url");
                    JY.Ajax.doPost($(layero).find("form"),url,null,function (data) {
                        window.top.index.layer.close(_this);
                        JY.Model.info(data.mes,function () {
                            account.getListAjax();
                        });
                    },"malert");
                });
            },null,null,'650px');

    },

    formDeptDom:function () {
        var dom = [];
        dom.push('<div class="mxx-addEdit-layer">');
        dom.push('<form class="layui-form">');

        dom.push('<div class="layui-form-item">');
        dom.push('<input type="hidden" name="id"  />');
        dom.push('<label class="layui-form-label">部门名称</label>');
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
        dom.push('<input type="hidden"    name="pid" placeholder="">');
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
    bindEvent: function () {
        //左侧"新增"按钮点击
        $('.private-tree-box .private-add-btn').on('click',function () {
            var dom = account.formDeptDom();
            var obj=this;
            //表单弹层
            JY.Model.edit(dom,"新增部门",
                function(layero){
                    $(layero).find(".tree-div").hide();    //隐藏树显示的盒子
                    //绑定一个单击事件用于显示父级菜单（树）
                    $(layero).find("form").each(function () {
                        $(this).find("input[name = 'parentName']").off("click");
                        $(this).find("input[name = 'parentName']").click(function () {
                            //显示账户树
                            JY.Model.showHidden($(layero).find(".tree-div"));
                        });
                    });
                    account.initParentDeptTree(null,layero);
                },
                function (index,layero) {
                    if (!JY.Validate.form($(layero).find("form"))){
                        return;
                    }
                    var url=adminPath+$(obj).attr("res-url");
                    var _this=index;
                    JY.Ajax.doPost($(layero).find("form"),url, null,  function (data) {
                        window.top.index.layer.close(_this);
                        JY.Model.info(data.mes,function () {
                            account.initTree();
                        });
                    },"malert");
                });
        });

        //左侧“修改”按钮
        $('.private-tree-box .private-edit-btn').on('click',function () {
            account.updateDeptTree(this);
        });
        // 删除
        $('.private-tree-box .private-del-btn').on('click',function () {
            // var url=adminPath+"/dept/delDept?id="+account.beClickNode.id;
            if(!JY.Object.notNull(account.beClickNode.id)){
                return;
            }
            var url=adminPath+$(this).attr("res-url");
            JY.Model.confirm("确认删除？",function () {
                JY.Ajax.doGet(null,url,{id:account.beClickNode.id}, function (data) {
                    JY.Model.info(data.mes,function () {
                        account.initTree();
                    });
                },"malert");
            });

        });
    },
    initParentDeptTree:function (m,dom) {
        $(dom).find(".tree-div").hide();
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode) {
                    if (treeNode==null){
                        return;
                    }
                    var id = treeNode.id;
                    var pid = treeNode.pId;

                    if (JY.Object.notNull(m)&&(m.id == id||m.id==pid)){
                        return;
                    }
                    var node = treeNode.getPath();
                    var path="/";
                    for (var i=0;i<node.length;i++){
                        path+=node[i].name+"/";
                    }
                    $(dom).find("form").each(function () {
                        $(this).find("input[name='parentName']").val(path);
                        $(this).find("input[name='pid']").val(id);
                    });
                    $(dom).find(".tree-div").hide();
                }
            },
            data:{simpleData:{enable:true}}
        };
        var url=adminPath+"/dept/get/tree";
        JY.Ajax.doGet(null,url, null, function (data) {
            var treeObj = $.fn.zTree.init($(dom).find(".ztree"), setting, data.model);
            //显示数据库中的父级菜单数据（用于修改某个节点时弹框里获取几点的当前地址）
            var node =  treeObj.getNodeByParam("id", account.beClickNode.id, null);   //获取节点
            if (JY.Object.notNull(m)){
                node =  treeObj.getNodeByParam("id", m.pId, null);   //获取节点
            }
            var nodes;
            var path="/";
            if (node !=null){  //如果节点不为null
                nodes = node.getPath();  //返回的是定义时的路径，可能是相对路径，也可能是绝对路径，这个取决于定义时用的是相对路径还是绝对路径。
                for (var i=0;i<nodes.length;i++){
                    path+=nodes[i].name+"/";       //（被选中的节点的地址）
                }
            }
            $(dom).find("form").each(function () {
                $(this).find("input[name='parentName']").val(path);  //val() 方法返回或设置被选元素的值
                //其余数据是从缓存中所取
                if (JY.Object.notNull(m)){
                    $(this).find("input[name='id']").val(m.id);
                    $(this).find("input[name='title']").val(m.name);
                    $(this).find("textarea[name='descn']").val(m.other);
                    $(this).find("input[name='pid']").val(m.pId);
                }else{
                    $(this).find("input[name='pid']").val(account.beClickNode.id);
                }
            });
            /*  $(dom).find(".clear-all").off("click");
             $(dom).find(".clear-all").on("click",function () {
             account.clearParnetId(dom);
             });*/
        },"mmes");
    },
    clearParnetId:function (dom) {
        $(dom).each(function () {
            $(this).find(".tree-div").hide();
            $(this).find("input[name='parentName']").val("");
            $(this).find("input[name='pid']").val(0);
        });
    },
    updateDeptTree:function (obj) {
        if (this.beClickNode.id==null){
            return;
        }
        //表单弹层
        var dom = this.formDeptDom();
        JY.Model.edit(dom,"修改部门",
            function (layero) {
                account.initParentDeptTree(account.beClickNode,layero);
                //绑定一个单击事件用于显示父级菜单
                $(layero).find("form").each(function () {
                    $(this).find("input[name = 'parentName']").off("click");
                    $(this).find("input[name = 'parentName']").on("click",function () {
                        JY.Model.showHidden($(layero).find(".tree-div"));
                    });
                });
            },
            function (index,layero) {
                var url = adminPath + $(obj).attr("res-url");
                var _this=index;
                JY.Ajax.doPost($(dom).find("form"),url,null, function (data) {
                    window.top.index.layer.close(_this);
                    JY.Model.info(data.mes,function () {
                        account.initTree();
                    });
                },"malert");
            });
    },
};
//自定义方法
