/**
 * Created by Administrator on 2017/11/21.
 */
var adminPath = "http://127.0.0.1:9801/";
var filePath = "http://file.test.aviptcare.com/";
// var jypath = "http://test.aviptcare.com:11151/";
// var adminPath = "http://test.aviptcare.com:9801/";


/*
 * JY工具组件
 */
//var JY = JY || {Object:{},Dict:{},Page:{},Tags:{},Model:{},Validate:{},Date:{},Url:{},Ajax:{},File:{}};
var JY = JY || {};
$(function () {
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        JY.init(laypage);
    });
    //开启失去焦点校验
    JY.triggerBlur();
});
JY = {

    init: function (laypage) {
        this.laypage = laypage;
        // this.saveZxxData("accountId", 1);
    },
    Object: {
        notNull: function (obj) { //判断某对象不为空..返回true 否则 false

            if (obj === null) return false;
            else if (obj === undefined) return false;
            else if (obj === "undefined") return false;
            else if (obj === "") return false;
            else if (obj === "[]") return false;
            else if (obj === "{}") return false;
            else return true;
        },
        notEmpty: function (obj, str) { //判断某对象不为空..返回obj 否则 ""
            str = str || "";
            if (obj === null) return str;
            else if (obj === undefined) return str;
            else if (obj === "undefined") return str;
            else if (obj === "") return str;
            else if (obj === "[]") return str;
            else if (obj === "{}") return str;
            else return obj;
        },
        serialize: function (form) {
            var o = {};
            $.each(form.serializeArray(), function (index) {
                if (o[this['name']]) {
                    o[this['name']] = o[this['name']] + "," + this['value'];
                } else {
                    o[this['name']] = this['value'];
                }
            });
            return o;
        },
        //组合变量传递keys,values,types形式// 转换JSON为字符串
        comVar: function (variables) {
            var keys = "",
                values = "",
                types = "",
                vars = {};
            if (variables) {
                $.each(variables, function () {
                    if (keys != "") {
                        keys += ",";
                        values += ",";
                        types += ",";
                    }
                    keys += this.key;
                    values += this.value;
                    types += this.type;
                });
            }
            vars = {
                keys: keys,
                values: values,
                types: types
            };
            return vars;
        },
        formUrlSerialize: function (form) {
            //name=张三&care=2
            //简单表单数据序列化
            var data;
            $(form).each(function () {
                //提前一些处理

                data = $(this).serialize();
                // data +='&json={"key":"value"}'
                // console.log(data);
            });
            return data;
        },

        formJsonSerialize: function (form) {
            //复杂表单数据序列化
            var datajson = {};
            $(form).each(function () {
                //提前一些处理
                $(this).find("input,select,textarea").each(function () {
                    var name = $(this).attr("name");
                    var val = $(this).val();
                    if (!(name == null || name == "" || name == "undefined")) {
                        datajson[name] = val;
                    }

                });
                //到这一步时  datajson是什么样子
                //{"title":"name1","care":2}
                //复杂处理
                // datajson +='&json={"key":"value"}'
            });
            return JSON.stringify(datajson);
        }
    },
    /**
     * 缓存到localStorage
     * @param {Object} key
     * @param {Object} value
     */
    saveZxxData: function (key, value) {
        if (window.localStorage) {
            if (typeof value == "object") {
                value.jsonType = "json";
                value = JSON.stringify(value);
            } else if (typeof value != "string") {
                value = new String(value);
            }
            window.localStorage.setItem(key, value + "");
        }
    },

    /**
     * 获取缓存localStorage数据
     * @param {Object} key
     */
    getZxxData: function (key) {
        if (key.lastIndexOf("accountId") > -1) {
            return 1;
        }
        var v = window.localStorage.getItem(key);
        if (v) {
            if (v.lastIndexOf("}") > -1 && v.indexOf("jsonType") > -1) {
                v = JSON.parse(v);
            }
        }
        return v;
    },

    getAccountId: function () {
        var account = this.getZxxData("account");
        if (this.Object.notNull(account)) {
            return account.id;
        } else {
            window.top.location.href = "/zxx/html/login/login.html";
        }
    },
    /**
     * 删除缓存localStorage数据
     * @param {Object} key
     */
    delZxxData: function (key) {
        return window.localStorage.removeItem(key);
    },
    Pageing: function (id, page, callback) {
        this.laypage.render({
            elem: id,
            count: page.totalCount,
            limit: page.pageSize,
            curr: page.pageNo,
            // curr: location.hash.replace('#!fenye=', ""), //获取hash值为fenye的当前页
            // hash: "fenye", //自定义hash值
            first: '首页',
            last: '尾页',
            theme: '#4DA1FF',
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                //首次不执行
                if (!first) {
                    //do something
                    callback.call(this, obj.curr, obj.limit);
                }
            }
            // layout:['limits','skip']
        });
    },
    Dict: { //ids 对应id值(多个逗号分隔).keys 对应key值(多个逗号分隔).type(可选)1.请选择，2.自定义数组。默认不填.dfstr (可选)自定义数组
        setSelect: function (ids, keys, type, dfstr) {
            $.ajax({
                type: 'POST',
                url: jypath + '/backstage/dataDict/getDictSelect',
                data: {
                    ids: ids,
                    keys: keys
                },
                dataType: 'json',
                success: function (data, textStatus) {
                    if (data.res == 1) {
                        var map = data.obj;
                        var idss = ids.split(",");
                        var opts = "",
                            name = "";
                        if (type == 1) {
                            for (var i = 0; i < idss.length; i++) {
                                name = map[idss[i]].name;
                                opts = "<option value=''>请选择</option>";
                                $.each(map[idss[i]].items, function (n, v) {
                                    opts += "<option value='" + v.value + "'>" + v.name + "</option>";
                                });
                                $("#" + idss[i] + " select").append(opts);
                                $("#" + idss[i]).trigger("liszt:updated");
                            }
                            ;
                        } else if (type == 2) {
                            var dfstrs = dfstr.split(",");
                            for (var i = 0; i < idss.length; i++) {
                                name = map[idss[i]].name;
                                $("#" + idss[i] + " label").html(name);
                                opts = "<option value=''>" + dfstrs + "</option>";
                                $.each(map[idss[i]].items, function (n, v) {
                                    opts += "<option value='" + v.value + "'>" + v.name + "</option>";
                                });
                                $("#" + idss[i] + " select").append(opts);
                            }
                            ;
                        } else {
                            for (var i = 0; i < idss.length; i++) {
                                var name = map[idss[i]].name;
                                $("#" + idss[i] + " label").html(name);
                                opts = "";
                                $.each(map[idss[i]].items, function (n, v) {
                                    opts += "<option value='" + v.value + "'>" + v.name + "</option>";
                                });
                                $("#" + idss[i] + " select").append(opts);
                            }
                        }
                    }
                    //适应手机
                    if ("ontouchend" in document) {
                        $(".chosen-select").removeClass("chosen-select");
                    }
                    //下拉框样式
                    else {
                        $(".chosen-select").chosen();
                        $(".chosen-select-deselect").chosen({
                            allow_single_deselect: true
                        });
                    }
                }
            });
        }
    },

    Tags: { //设置按钮用的方法,id 这行的id,pBtn 按钮组
        cleanForm: function (dom) {
            $(dom).each(function () {
                $(this).find("input,textarae,select").val("");
            });
        },

        disableForm: function (dom) {
            $(dom).each(function () {
                $(this).find("input,select,textarea").attr("readonly", true);
            });
        },

        removeDisable: function (dom) {
            $(dom).each(function () {
                $(this).find("input,select,textarea").removeAttr("readonly")
            });
        },
        setFunction: function (id, html, pBtn) {

            if (pBtn != null && pBtn.length > 0) {

                for (var i = 0; i < pBtn.length; i++) {
                    html.push('<span class="' + JY.Object.notEmpty(pBtn[i].icon) + ' ' + pBtn[i].btnType + '"  data-value="' + id + '" res-url="' + JY.Object.notEmpty(pBtn[i].resUrl) + '">' + pBtn[i].name + '</span>');
                }
            }
        },
        initButton: function ($dom, funBtn) {
            // console.log(JSON.stringify(funBtn));
            $dom.html("");
            var html = [];
            if (funBtn != null && funBtn.length > 0) {

                for (var i = 0; i < funBtn.length; i++) {
                    html.push('<span class="' + JY.Object.notEmpty(funBtn[i].icon) + ' ' + funBtn[i].btnType + '"  res-url="' + JY.Object.notEmpty(funBtn[i].resUrl) + '"><i></i><span>' + funBtn[i].name + '</span></span>');
                }
            }
            $dom.append(html.join(""));
        },
        /*class是isValidCheckbox的选择框Yes或No，value设为1或0
         *formId form的Id
         */
        isValid: function (formId, val) {
            $("#" + formId + " .isValidCheckbox [hi-isValid]").val(val);
            if (val == 1) {
                $("#" + formId + " .isValidCheckbox [sh-isValid]").prop("checked", true);
            } else {
                $("#" + formId + " .isValidCheckbox [sh-isValid]").prop("checked", false);
            }
        }
    },
    Model: {
        showHidden: function (dom) {
            if ($(dom).is(":hidden")) {
                $(dom).show();
            } else {
                $(dom).hide();
            }
        },
        //loading框
        loading: function () {
            JY.index = window.top.index.layer.load(1, {
                time: 10 * 1000
            });
            // $("#jyLoading").dialog();
        },
        //关闭loading框
        loadingClose: function () {
            window.top.index.layer.close(JY.index)
        },
        //Str 询问语句可以是html格式,fn  方法
        confirm: function (str, fn) {
            str = str || "确认？";
            window.top.index.layer.confirm(str, {
                title: '询问'
            }, function (index) {
                if (typeof(fn) == "function") {
                    fn.call(this, index);
                }
                window.top.index.layer.close(index);
            });
        },
        info: function (Str, fn) {
            if (JY.Object.notNull(Str)) {
                window.top.index.layer.msg(Str, {
                    icon: 6
                }, function (index) {
                    if (typeof(fn) == "function") {
                        fn.call(this, index);
                    }
                    window.top.index.layer.close(index);
                });
            }
        },
        //Str 语句可以是html格式（如：<span>保存成功</span>）,fn 方法
        error: function (Str) {
            window.top.index.layer.msg(Str);
        },
        //divId,fn 方法
        check: function (dom, title, successfn, fn, w, h) {
            if (!JY.Object.notNull(w)) {
                w = "600px";
            }
            if (!JY.Object.notNull(h)) {
                h = '400px';
            }
            title = title || "查看";
            window.top.index.layer.open({
                title: title,
                type: 1,
                area: [w, h],
                content: dom,
                btn: "返回",
                success: function (layero, index) {
                    if (typeof(successfn) == 'function') {
                        successfn.call(this, layero, index);
                    }
                },
                yes: function (index, layero) {
                    if (typeof(fn) == 'function') {
                        fn.call(this, layero);
                    }
                    window.top.index.layer.close(index);
                }
            });

        },
        edit: function (dom, title, successfn, savefn, cancelfn, w, h) {
            if (!JY.Object.notNull(w)) {
                w = "441px";
            }
            if (!JY.Object.notNull(h)) {
                h = '500px';
            }
            if (parseInt(w.replace('px', '')) > 441) {
                w = '441px';
            }
            if (parseInt(h.replace('px', '')) > 500) {
                h = '500px';
            }
            window.top.index.layer.open({
                title: title,
                type: 1,
                area: [w, h],
                content: dom,
                success: function (layero, index) {
                    if (typeof(successfn) == 'function') {
                        successfn.call(this, layero, index);
                    }
                },
                btn: ["确认", "取消"],
                yes: function (index, layero) {
                    if (typeof(savefn) == 'function') {
                        savefn.call(this, index, layero);
                    }
                    // JY.layer.close(index);
                },
                btn2: function (index) {
                    if (typeof(cancelfn) == 'function') {
                        cancelfn.call(this, index);
                    }
                    window.top.index.layer.close(index);
                }
            });

        }
    },
    Validate: {
        isNum: function (str) {
            if (/^[0-9]+\.{0,1}[0-9]*$/.test(str)) return true;
            return false;
        },
        //判断是否是英文数字,是返回true，不是返回false
        isEnNum: function (str) {
            if (/^[0-9a-zA-Z]+$/.test(str)) return true;
            return false;
        },
        //判断是否是英文,是返回true，不是返回false
        isEn: function (str) {
            if (/^[A-Za-z]+$/.test(str)) return true;
            return false;
        },
        //判断是否是电子邮箱,是返回true，不是返回false
        isEmail: function (email) {
            if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) return true;
            return false;
        },
        //判断是否是日期,是返回true，不是返回false
        isDate: function (date) {
            if (date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)) return true;
            return false;
        },
        //判断是否是日期时间,是返回true，不是返回false
        isDatetime: function (datetime) {
            if (datetime.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/)) return true;
            return false;
        },
        //判断是否为合法http(s)
        isUrl: function (str) {
            if (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(str)) return true;
            return false;
        },
        //判断数值是否在范围内(不包含临界):min 最少值,max 最大值,是返回true，不是返回false
        numrange: function (v, min, max) {
            v = parseInt(v);
            min = parseInt(min);
            max = parseInt(max);
            if ((min < v) && (v < max)) return true;
            return false;
        },
        //判断数值是否在范围内(包含临界),min 最少值,max 最大值,是返回true，不是返回false
        numrangeth: function (v, min, max) {
            v = parseInt(v);
            min = parseInt(min);
            max = parseInt(max);
            if ((min <= v) && (v <= max)) return true;
            return false;
        },
        //表单验证fromId,使用方法 在表单必须使用jyValidate属性
        form: function (dom, side) {
            var res = true;
            side = JY.Object.notNull(side) ? side : 1;
            $(dom).find("input[jyValidate]").each(function () {
                if (res == false) return;
                var that = $(this);
                var jyValidate = $(this).attr("jyValidate").split(",");
                $.each(jyValidate, function (n, v) {
                    if (!JY.pintuerCheck(n, v.split(":")[0], that.val())) {
                        res = false;
                        window.top.index.layer.tips(v.split(":")[1], that, {
                            tips: [1, '#F00']
                        });
                        // that.tips({side:side,msg:v.split(":")[1],bg :'#FF2D2D',time:1});
                        that.select();
                        return;
                    }
                });
            });
            return res;
        }
    },
    DataValidate: {
        form: function (dom) {

            $(dom).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
            var numError = $(dom).find('.check-error').length;
            if (numError) {
                $(dom).find('.check-error').first().find('input[data-validate],textarea[data-validate],select[data-validate]').first().focus().select();
                return false;
            } else {
                return true;
            }

        }
    },
    Date: { //时间格式化(默认),time 时间
        Default: function (time) {
            return JY.Object.notNull(time) ? (new Date(time).Format("yyyy-MM-dd  hh:mm:ss")) : " ";
        },
        //时间格式化,time 时间,fmt 格式
        Format: function (time, fmt) {
            return JY.Object.notNull(time) ? (new Date(time).Format(fmt)) : "";
        }
    },
    Url: { //获取url中的参数,name 参数名,当不存在返回空字符串
        getParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ""; //返回参数值
        }
    },
    Ajax: { //异步请求, form表单ID,url请求路径,param参数对象,如：{a:'test',b:2},fn回调函数
        doPost: function (form, url, param, fn, type) {
            var params = form || $.extend({}, param, {
                    accountId: JY.Object.notEmpty(JY.getAccountId())
                });
            // console.log(typeof form)
            if (form != null) {
                params = $.extend(param || {}, JY.Object.serialize(form), {
                    accountId: JY.Object.notEmpty(JY.getAccountId())
                });
            }
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(params),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data, textStatus) {
                    if (data.result == 1 || data.result == 200) {
                        if (typeof(fn) == 'function') {
                            fn.call(this, data);
                        }
                    } else if (data.result == -1) {
                        //跳转到登录页面
                        // JY.Model.confirm(data.mes);
                        window.top.location.href = "/zxx/html/login/login.html";
                    } else {
                        if (JY.Object.notNull(data.mes))
                            if (type == "malert") {
                                $.malert(data.mes);
                            }
                        if (type == "mmes") {
                            $.mmes(data.mes);
                        }
                        // JY.Model.loadingClose();
                    }
                },
                error: function () {
                    if (type == "malert") {
                        $.malert();
                    }
                    if (type == "mmes") {
                        $.mmes();
                    }
                    // console.log(url + "--"+JSON.stringify(params))
                    return;
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },

        doGet: function (form, url, param, fn,type) {
            var params = $.param($.extend({}, param, {
                accountId: JY.Object.notEmpty(JY.getAccountId())
            }));
            if (form != null) {
                params = "" + JY.Object.formUrlSerialize(form) + "&accountId=" + JY.getAccountId();
            }
            // console.log(params);
            $.ajax({
                type: 'GET',
                url: url,
                data: params,
                dataType: 'json',
                success: function (data, textStatus) {
                    if (data.result == 1 || data.result == 200) {
                        if (typeof(fn) == 'function') {
                            fn.call(this, data);
                        }
                    } else if (data.result == -1) {
                        //跳转到登录页面
                        // JY.Model.confirm(data.mes);
                        window.top.location.href = "/zxx/html/login/login.html";
                    } else {
                        if (JY.Object.notNull(data.mes))
                            if (type == "malert") {
                                $.malert(data.mes);
                            }
                            if (type == "mmes") {
                                $.mmes(data.mes);
                            }
                        // JY.Model.loadingClose();
                    }
                },
                error: function () {
                    if (type =="malert"){
                        $.malert();
                    }
                    if (type =="mmes"){
                        $.mmes();
                    }
                    // console.log(url + "--"+JSON.stringify(params))
                    return;
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
    },
    File: {
        //obj:对象传this, aFmats:允许格式,用"|"分隔
        fileType: function (obj, aFmats) {
            if (JY.Object.notNull(aFmats)) {
                var fileType = obj.value.substr(obj.value.lastIndexOf(".") + 1).toLowerCase(); //获得文件后缀名
                var aFmat = aFmats.split("|");
                for (f in aFmat) {
                    if (aFmat[f] == fileType) {
                        return;
                    }
                }
                $(obj).tips({
                    side: 3,
                    msg: '请上传' + aFmats + '格式的文件',
                    bg: '#FF2D2D',
                    time: 3
                });
                $(obj).val('');
            }
        }
    },

    triggerBlur: function () {
        $('textarea, input, select').blur(function () {
            var e = $(this);
            if (e.attr("data-validate")) {
                var $checkdata = e.attr("data-validate").split(',');
                var $checkvalue = e.val();
                var $checkstate = true;
                var $checktext = "";
                if ($checkvalue != "" || e.attr("data-validate").indexOf("required") >= 0) {
                    for (var i = 0; i < $checkdata.length; i++) {
                        var $checktype = $checkdata[i].split(':');
                        if (!JY.pintuerCheck(e, $checktype[0], $checkvalue)) {
                            $checkstate = false;
                            $checktext = $checktype[1];
                            JY.layer.tips($checktext, e, {
                                tips: [1, '#F00']
                            });
                            // e.focus();
                            e.addClass("check-error");
                            return;
                        } else {
                            e.removeClass("check-error");
                        }
                    }
                }
                ;
            }
        });
    },
    pintuerCheck: function (element, type, value) {
        var $pintu = value.replace(/(^\s*)|(\s*$)/g, "");
        if ($pintu == "" || $pintu == null) {
            if (type == "required") {
                return false;
            } else {
                return true;
            }
        } else {
            switch (type) {
                case "required":
                    return /[^(^\s*)|(\s*$)]/.test($pintu);
                    break;
                case "chinese":
                    return /^[\u0391-\uFFE5]+$/.test($pintu);
                    break;
                case "number":
                    return /^\d+$/.test($pintu);
                    break;
                case "integer":
                    return /^[-\+]?\d+$/.test($pintu);
                    break;
                case "plusinteger":
                    return /^[+]?\d+$/.test($pintu);
                    break;
                case "double":
                    return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
                    break;
                case "plusdouble":
                    return /^[+]?\d+(\.\d+)?$/.test($pintu);
                    break;
                case "english":
                    return /^[A-Za-z]+$/.test($pintu);
                    break;
                case "username":
                    return /^[a-z]\w{3,}$/i.test($pintu);
                    break;
                case "mobile":
                    return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu);
                    break;
                case "phone":
                    return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                    break;
                case "tel":
                    return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                    break;
                case "email":
                    return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
                    break;
                case "url":
                    return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
                    break;
                case "ip":
                    return /^[\d\.]{7,15}$/.test($pintu);
                    break;
                case "qq":
                    return /^[1-9]\d{4,10}$/.test($pintu);
                    break;
                case "currency":
                    return /^\d+(\.\d+)?$/.test($pintu);
                    break;
                case "zip":
                    return /^[1-9]\d{5}$/.test($pintu);
                    break;
                case "radio":
                    var radio = element.closest('form').find('input[name="' + element.attr("name") + '"]:checked').length;
                    return eval(radio == 1);
                    break;
                case "date":
                    return JY.Object.notNull($pintu) && JY.Validate.isDate($pintu);
                    break;
                case "idcard":
                    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test($pintu) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test($pintu);
                    break;
                //extend
                default:
                    var $test = type.split('#');
                    if ($test.length > 1) {
                        switch ($test[0]) {
                            case "compare":
                                return eval(Number($pintu) + $test[1]);
                                break;
                            case "regexp":
                                return new RegExp($test[1], "gi").test($pintu);
                                break;
                            case "length":
                                var $length;
                                if (element.attr("type") == "checkbox") {
                                    $length = element.closest('form').find('input[name="' + element.attr("name") + '"]:checked').length;
                                } else {
                                    $length = $pintu.replace(/[\u4e00-\u9fa5]/g, "***").length;
                                    // $test[1]= $test[1].replace("lt","<").replace("gt",">");
                                    $length = $pintu.length;
                                }
                                return eval($length + $test[1]);
                                break;
                            case "ajax": //因涉及到设置ajax全局设置同步请求，会降低效率，不建议使用，建议使用后台判断
                                var $getdata = false;
                                var $url = $test[1] + $pintu;
                                // $.ajaxSetup({async: false});
                                $.ajax({
                                    async: false,
                                    url: $url,
                                    type: 'get',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data.obj == "true") {
                                            $getdata = true;
                                        }
                                    }
                                });
                                return $getdata;
                                break;
                            case "repeat":
                                return $pintu == jQuery('input[name="' + $test[1] + '"]').eq(0).val();
                                break;
                            default:
                                return true;
                                break;
                        }
                        break;
                    } else {
                        return true;
                    }
            }
        }
    },

    cutPic: function (src, imgPath, fn) {
        // point初始化选择框 [x,y,x1,y1] (框左上角和右下角)
        var point = point || null;
        var src = src;

        function html() {
            var html = [];
            html.push('<div class="mxx-cut">');

            html.push('<img src="' + src + '" img-path="' + imgPath + '" alt="图片加载失败" id="target">');

            html.push('<div class="mxx-target-box">');
            html.push('<div class="mxx-target">');
            html.push('<img src="' + src + '" alt="图片加载失败" />');
            html.push('</div>');
            html.push('</div>');

            html.push('<p>当前裁剪比例16:9</p>');
            html.push('</div>');
            return html.join('');
        }

        // console.log(window.top.index);
        layer.open({
            type: 1,
            title: '剪裁图片',
            content: html(),
            btn: ['保存', '取消'],
            area: ['700px', '500px'],
            success: function (layero, index) {
                window.setTimeout(function () {
                    var $source = $(layero).find('#target');
                    var $sourceSize = {
                        width: $source.width(),
                        height: $source.height()
                    }
                    var $target = $source.css({
                        minWidth: "300px",
                        maxWidth: "400px"
                    })
                    var $targetSize = {
                        width: $target.width(),
                        height: $target.height()
                    }
                    var renderbound = ($targetSize.width / $sourceSize.width).toFixed(2);
                    var jcrop_api;
                    var boundx;
                    var boundy;
                    var $box = $('.mxx-target-box');
                    var $picbox = $('.mxx-target-box .mxx-target');
                    var $pimg = $('.mxx-target-box .mxx-target img');
                    var xsize = $picbox.width();
                    var ysize = $picbox.height();
                    $(layero).find('#target').Jcrop({
//						onChange: updatePreview,
                        onSelect: updatePreview,
                        aspectRatio: xsize / ysize
                        //					setSelect: point
                    }, function () {
                        $pimg.attr('renderbound', renderbound);
                        var bounds = this.getBounds();
                        boundx = bounds[0];
                        boundy = bounds[1];
                        jcrop_api = this;
                    });

                    function updatePreview(c) {
                        console.log(c);
                        $pimg.attr({
                            'data-w': c.w.toFixed(2),
                            'data-h': c.h.toFixed(2),
                            'data-x': c.x,
                            'data-y': c.y
                        })
                        if (parseInt(c.w) > 0) {
                            var rx = xsize / c.w;
                            var ry = ysize / c.h;
                            $pimg.css({
                                width: Math.round(rx * boundx) + 'px',
                                height: Math.round(ry * boundy) + 'px',
                                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                                marginTop: '-' + Math.round(ry * c.y) + 'px'
                            });
                        }
                    };
                }, 1000)
            },
            yes: function (index, layero) {
                var b = $(layero).find('.mxx-target-box .mxx-target img').attr('renderbound');
                var w = $(layero).find('.mxx-target-box .mxx-target img').attr('data-w');
                var h = $(layero).find('.mxx-target-box .mxx-target img').attr('data-h');
                var x = $(layero).find('.mxx-target-box .mxx-target img').attr('data-x');
                var y = $(layero).find('.mxx-target-box .mxx-target img').attr('data-y');
                var pw = $(layero).find('.mxx-target-box .mxx-target img').css('width');
                var ph = $(layero).find('.mxx-target-box .mxx-target img').css('height');
                var px = $(layero).find('.mxx-target-box .mxx-target img').css('marginLeft');
                var py = $(layero).find('.mxx-target-box .mxx-target img').css('marginTop');
                var imgInfo = {};
                imgInfo.imgPath = $(layero).find('#target').attr('img-path');
                imgInfo.imgX = x;
                imgInfo.imgY = y;
                imgInfo.imgW = w;
                imgInfo.imgH = h;
                imgInfo.renderBound = b;
                imgInfo.type = 0;

                imgInfo.imgPH = ph;
                imgInfo.imgPW = pw;
                imgInfo.imgPX = px;
                imgInfo.imgPY = py;
                console.log(JSON.stringify(imgInfo));
                layer.close(index);
                if (fn) fn.call(this, imgInfo);
            }
        })
    }
};
/*
 * 对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
};
