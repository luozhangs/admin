// window.rootPath="http://127.0.0.1:9999";
window.rootPath="http://127.0.0.1:9999";

$(function(){
	$(".private-list").on({
		startLoading : function(){
    		$(this).empty();
        	$(this).append('<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop mxx-list-loading">&#xe63d;</i>')
    	}
	});
})

/**
 * 拓展jQuery正则验证
 * isNumber
 * isNumberZ
 * isDateStr
 * isUrl
 * isCardNo
 * isMoney
 * isSpecialChar
 * isZZNum
 * isLetterNumber
 * isEmpty
 * isTelphone
 * isFax
 * isPhone
 * isEmail
 * isDouble
 * isDoubleCheck
 * isChinese
 * 获取字符串长度 getLength
 * 日期格式化 iFormatDate
 * 消息化日期格式化 iFeedTimeF
 * 深度克隆对象 objectClone
 * 序列化url参数部分 getYKArgs
 * localStroge增删改查 mystorage
 * 分页插件
 * loading
 * 弹框
 */

/**
 * @api {js} jQuery.isNumber(str) isNumber(验证数字格式)
 * @apiName isNumber 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否是有效数字格式
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是有效的数字;false 不是有效的数字
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("12345")){
 *    alert("是有效的数字");
 *  }else{
 *    alert("不是有效的数字");
 *  }
 *  
 */
 jQuery.isNumber = function(str){
  var reg = /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/;
  return reg.test(str+"");
};

/**
 * @api {js} jQuery.isNumber(str) isNumber(验证正整数字格式)
 * @apiName isNumberZ 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否是有效数字格式
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是有效的数字;false 不是有效的数字
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("12345")){
 *    alert("是有效的数字");
 *  }else{
 *    alert("不是有效的数字");
 *  }
 *  
 */
 jQuery.isNumberZ = function(str){
  var reg = /^[1-9]+\d*$/;
  return reg.test(str+"");
};

/**
 * @api {js} jQuery.isDateStr(str) isDateStr(验证日期格式)
 * @apiName isDateStr 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否是有效日期字符串格式
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是有效的日期字符串;false 不是有效的日期字符串
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("2016-01-01")){
 *    alert("是有效的日期字符串");
 *  }else{
 *    alert("不是有效的日期字符串");
 *  }
 *  
 */
 jQuery.isDateStr=function(str){
  var reg = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  return reg.test(str);
};

/**
 * @api {js} jQuery.isUrl(str) isUrl(验证url格式)
 * @apiName isUrl 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否是一个url
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串
 * @apiSuccess {boolean} return true 是一个url;false 不是一个url
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("http://www.baidu.com")){
 *    alert("是一个url");
 *  }else{
 *    alert("不是一个url");
 *  }
 *  
 */
 jQuery.isUrl = function(str){
  var reg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
  return reg.test(str+"");
};


/**
 * @api {js} jQuery.isCardNo(str) isCardNo(验证身份证格式)
 * @apiName isCardNo 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否是符合身份证格式
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串
 * @apiSuccess {boolean} return true 符合身份证格式;false 不符合身份证格式
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("http://www.baidu.com")){
 *    alert("符合身份证格式");
 *  }else{
 *    alert("不符合身份证格式");
 *  }
 *  
 */
 jQuery.isCardNo = function(v) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isMoney(num) isMoney(验证价格格式)
 * @apiName isMoney 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否是符合价格证格式
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} num 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 符合价格格式;false 不符合价格证格式
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber(100)){
 *    alert("符合价格格式");
 *  }else{
 *    alert("不符合价格格式");
 *  }
 *  
 */
 jQuery.isMoney=function(v){
  var reg = /^(([1-9])\d*.[0-9]+|([1-9])\d*)$/;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isSpecialChar(str) isSpecialChar(验证是否含特殊字符)
 * @apiName isSpecialChar 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否含特殊字符
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 含有特殊字符;false 不含有特殊字符
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("http://www.baidu.com")){
 *    alert("含有特殊字符");
 *  }else{
 *    alert("不含有特殊字符");
 *  }
 *  
 */
 jQuery.isSpecialChar = function(v){
  var reg = /[~#^$@%&!*:\,._?？\s/]/gi;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isZZNum(num) isZZNum(非负整数判断)
 * @apiName isZZNum 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否非负整数
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} num 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是非负整数;false 不是非负整数
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("http://www.baidu.com")){
 *    alert("是非负整数");
 *  }else{
 *    alert("不是非负整数");
 *  }
 *  
 */
 jQuery.isZZNum = function(v){
  var reg = /^(([1-9])\d*|0{1})$/;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isLetterNumber(num) isLetterNumber(是否只有字母和数字组成)
 * @apiName isLetterNumber 
 * @apiGroup jQuery-is
 * @apiDescription 验证入参是否只有字母和数字组成
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} num 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是只有字母和数字组成;false 不是只有字母和数字组成
 * @apiExample {js} 示例:
 * 
 *  if($.isLetterNumber("http://www.baidu.com")){
 *    alert("是只有字母和数字组成");
 *  }else{
 *    alert("不是只有字母和数字组成");
 *  }
 *  
 */
 jQuery.isLetterNumber = function(v) {
  var reg = /^[0-9a-zA-Z]+$/;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isEmpty(str) isEmpty(字符串是否为空)
 * @apiName isLetterNumber 
 * @apiGroup jQuery-is
 * @apiDescription 验证字符串v是否为空（null 或者 空字符串——""）
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 空字符串;false 非空字符串
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("http://www.baidu.com")){
 *    alert("是空字符串");
 *  }else{
 *    alert("不空字符串");
 *  }
 *  
 */
 jQuery.isEmpty = function(v) {
  if (v == null || $.trim(v) == "") {
    return true;
  } else {
    return false;
  }
};

/**
 * @api {js} jQuery.isTelphone(str) isTelphone(验证固定电话)
 * @apiName isTelphone 
 * @apiGroup jQuery-is
 * @apiDescription 验证固定电话
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是固定电话;false 不是固定电话
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber(15200005056)){
 *    alert("是固定电话");
 *  }else{
 *    alert("不是固定电话");
 *  }
 *  
 */
 jQuery.isTelphone = function(v){
  //var reg = /^0\d{2,3}-?\d{7,8}$/;
  var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
  return reg.test(v);
};

jQuery.isFax = function(v){
  var reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isPhone(str) isPhone(验证移动电话)
 * @apiName isPhone 
 * @apiGroup jQuery-is
 * @apiDescription 验证移动电话
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是移动电话;false 不是移动电话
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber(15200005056)){
 *    alert("是移动电话");
 *  }else{
 *    alert("不是移动电话");
 *  }
 *  
 */
 jQuery.isPhone = function(v) {
  var reg = /^(12[0-9]|13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
  return reg.test(v);
};

/**
 * @api {js} jQuery.isEmail(str) isEmail(验证邮箱地址)
 * @apiName isEmail 
 * @apiGroup jQuery-is
 * @apiDescription 验证邮箱地址
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要被验证的字符串或者数字
 * @apiSuccess {boolean} return true 是邮箱地址;false 不是邮箱地址
 * @apiExample {js} 示例:
 * 
 *  if($.isNumber("163@163.com")){
 *    alert("是邮箱地址");
 *  }else{
 *    alert("不是邮箱地址");
 *  }
 *  
 */
 jQuery.isEmail = function(v) {
  var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return reg.test(v);
};

/**
 * 百分比验证小于100的两位小数如：30.20%
 */
 jQuery.isDouble = function(str){
  var reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/;
  return reg.test(str+"");
};

/**
 * 验证数字或小数点后面两位小数
 */
 jQuery.isDoubleCheck = function(str){
  var reg = /^((\d*[0-9])|([0-9]+\.\d{1,2}))$/;
  return reg.test(str+"");
};

/**
 * 是否为中文
 */
 jQuery.isChinese = function(str){
  var reg = /^[\u4E00-\u9FA5]+$/;
  return reg.test(str+"");
};


/**
 * @api {js} jQuery.getLength(str) getLength(获取字符串长度)
 * @apiName getLength 
 * @apiGroup jQuery-get
 * @apiDescription 获取字符串长度
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} str 需要获取长度的字符串
 * @apiSuccess {number} return 字符串长度（1个中文字符=2个字节）
 * @apiExample {js} 示例:
 * 
 *  var nlen = $.getLength("需要获取长度字符串");
 *  
 */
 jQuery.getLength = function(v) {
  if ($.isEmpty(v)) {
    return 0;
  } else {
    return v.replace(/[^\x00-\xff]/ig, "**").length;
  }
};


/**
 * @api {js} jQuery.iFormatDate(s) iFormatDate(日期格式化)
 * @apiName iFormatDate 
 * @apiGroup jQuery-format
 * @apiDescription 日期格式化
 * @apiVersion 1.0.0
 * 
 * @apiParam {number} time 时间戳
 * @apiParam {string} pattern 日期格式 缺省值"yyyy-MM-dd hh:mm:ss"
 * 
 * @apiSuccess {string} return 格式化后的日期字符串
 * @apiExample {js} 示例:
 * 
 *  var str = $.iFormatDate({
 *          time:1457600527725,
 *          pattern: "yyyy-MM-dd hh:mm:ss"
 *          });
 *  
 */
 jQuery.iFormatDate = function(s) {
  var d;
  var pattern;
  if (typeof(s) == "number") {
    d = new Date(parseInt(s));
    s = {};
  } else if (typeof(s.time) == "number" || typeof(s.time) == "string") {
    d = new Date(parseInt(s.time));
  } else if (typeof(s.time) == "object") {
    d = new Date(parseInt(s.time.time));
  } else {
    d = new Date();
  }

  pattern = s.pattern || "yyyy-MM-dd hh:mm:ss";

  var y = d.getFullYear();
  var MM = d.getMonth() + 1;
  var dd = d.getDate();
  var hh = d.getHours();
  var mm = d.getMinutes();
  var ss = d.getSeconds();

  return format(y, MM, dd, hh, mm, ss, pattern);

  function format(y, M, d, h, m, s, pattern) {

    var yy = (y + "").substring(2);
    var MM = M;
    var dd = d;
    var hh = h;
    var mm = m;
    var ss = s;

    if (MM < 10) {
      MM = "0" + MM;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }

    pattern = pattern.replace(/[y]{4}/g, y);
    pattern = pattern.replace(/[y]{2}/g, yy);
    pattern = pattern.replace(/[M]{2}/g, MM);
    pattern = pattern.replace(/[M]{1}/g, M);
    pattern = pattern.replace(/[d]{2}/g, dd);
    pattern = pattern.replace(/[d]{1}/g, d);
    pattern = pattern.replace(/[h]{2}/g, hh);
    pattern = pattern.replace(/[h]{1}/g, h);
    pattern = pattern.replace(/[m]{2}/g, mm);
    pattern = pattern.replace(/[m]{1}/g, m);
    pattern = pattern.replace(/[s]{2}/g, ss);
    pattern = pattern.replace(/[s]{1}/g, s);

    return pattern;
  }
};

/**
 * @api {js} jQuery.iFeedTimeF(s) iFeedTimeF(消息化日期格式化)
 * @apiName iFeedTimeF 
 * @apiGroup jQuery-format
 * @apiDescription 日期格式化
 * @apiVersion 1.0.0
 * 
 * @apiParam {number} time 数据时间戳
 * @apiParam {string} pattern 日期格式 缺省值"yyyy-MM-dd hh:mm:ss"
 * @apiParam {number} nowTime 当前服务器时间戳 缺省 则获取当前用户终端（浏览器所在系统）的时间
 * 
 * @apiSuccess {string} return 格式化后的日期字符串
 * @apiExample {js} 示例:
 * 
 *  var str = $.iFeedTimeF({
 *        dtime:1457600527725,
 *        nowTime:1457600527725,
 *        pattern: "yyyy-MM-dd hh:mm:ss"
 *        });
 *  
 */
 jQuery.iFeedTimeF = function(s){
  if(s==null || s.dtime==null){
    return "";
  }
  if($.isEmpty(s.nowTime)){
    s.nowTime = 0;
  }
  s.nowTime = s.nowTime ||new Date().getTime();
  s.time = s.nowTime-s.dtime;
  s.time = parseInt(s.time/1000);
  if(s.time<10){
    return "刚刚";
  }else if(s.time<60){
    return s.time+"秒前";
  }else if(s.time<3600){
    s.time = Math.ceil(s.time/60.0);
    return s.time+"分前";
  }else{
    s.time = Math.round(s.time/3600.0);
    if(s.time<24){
      return s.time+"小时前";
    }else{
      return $.iFormatDate({time:s.dtime,pattern: s.pattern});
    }
    
  }
};

/**
 * 克隆对象o的一个副本
 * @param o 需要被克隆的对象
 * @reutrn 克隆出的副本
 */

/**
 * @api {js} jQuery.objectClone(obj) objectClone(克隆对象)
 * @apiName objectClone 
 * @apiGroup jQuery
 * @apiDescription 克隆对象o的一个副本
 * @apiVersion 1.0.0
 * 
 * @apiParam {object} o 被克隆的对象
 * 
 * @apiSuccess {object} return 克隆生成的对象
 * 
 * @apiExample {js} 示例:
 *  
 *  var o = $.objectClone({name:"1123"});
 *  
 */
 jQuery.objectClone = function(o){
  var o1= {};
  if(o && typeof o == "object"){
    var v;
    for(var k in o){
      v = o[k];
      if(typeof v == "object"){
        v = $.objectClone(v);
      }
      o1[k]=v;
    }
  }
  
  return o1;
};


/**
 * 序列化url参数部分
 * 将参数部分作为json 对象返回
 * 其中 #后面部分 为此json 对象的 _hashO 属性
 */
 jQuery.getYKArgs = function() {
  var args = {};
  var query = location.search.substring(1);
  var pairs = query.split("&");
  var pairstem, pos, argname, argvalue;
  for (var i = 0, len = pairs.length; i < len; i++) {
    pairstem = pairs[i];
    pos = pairstem.indexOf("=");
    if (pos == -1)
      continue;
    argname = pairstem.substring(0, pos);
    argvalue = pairstem.substring(pos + 1);
    argvalue = decodeURIComponent(argvalue);
    if(args[argname]){
      if(args[argname] instanceof Array){
        args[argname].push(argvalue);
      }else{
        args[argname] = [args[argname],argvalue];
      }

    }else{
      args[argname] = argvalue;
    }
    
  }
  var _hashO = {};
  query = location.hash.substring(1);
  pairs = query.split("&");
  for (var i = 0, len = pairs.length; i < len; i++) {
    pairstem = pairs[i];
    pos = pairstem.indexOf("=");
    if (pos == -1)
      continue;
    argname = pairstem.substring(0, pos);
    argvalue = pairstem.substring(pos + 1);
    _hashO[argname] = argvalue;
  }
  args["_hashO"] = _hashO;
  return args;
};


/**
 * 封装对localStorage的增删改查
 * 返回set(key,value)新增/修改 get(key)获取 remover(key)删除 init()初始化 clear()清空 五个方法
 *
 * mystorage.set('tqtest','tqtestcontent')  新增
 * mystorage.set('tqtest1','tqtestcontent1')  新增
 * mystorage.set('tqtest1','newtqtestcontent1') 修改
 * mystorage.get('tqtest')  获取
 * mystorage.remove('tqtest') 删除
 * mystorage.clear()  清空
 */
 var mystorage = (function mystorage(){
  var ms = "mystorage";
  var storage=window.localStorage;
  if(!window.localStorage){
    alert("浏览器不支持localstorage");
    return false;
  }

  var set = function(key,value){
        //存储
        var mydata = storage.getItem(ms);
        if(!mydata){
          this.init();
          mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;

      };

      var get = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
          return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
      };

      var remove = function(key){
        //读取
        var mydata = storage.getItem(ms);
        if(!mydata){
          return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;
      };

      var clear = function(){
        //清除对象
        storage.removeItem(ms);
      };

      var init = function(){
        storage.setItem(ms,'{"data":{}}');
      };

      return {
        set : set,
        get : get,
        remove : remove,
        init : init,
        clear : clear
      };

    })();
/**
 * 分页插件
 * 需传入两个参数
 * element : DOM元素
 * options : 配置对象
 * options.pageNo : 当前页(默认1) 
 * options.totalPage : 总页数
 * options.totalSize : 总数量
 * options.callback(pageNo) : 回调(接收参数当前页)
 *
 *  $("#page").paging({
      pageNo:1,
      totalPage: 20,
      totalSize: 300,
      callback: function(num) {
        console.log(num)  
      }
    })
    */
    (function($, window, document, undefined) {
  //定义分页类
  function Paging(element, options) {
    this.element = element;
    //传入形参
    this.options = {
      pageNo: options.pageNo||1,
      totalPage: options.totalPage,
      totalSize:options.totalSize,
      callback:options.callback
    };
    //根据形参初始化分页html和css代码
    this.init();
  }
  //对Paging的实例对象添加公共的属性和方法
  Paging.prototype = {
    constructor: Paging,
    init: function() {
      this.creatHtml();
      this.bindEvent();
    },
    creatHtml: function() {
      var me = this;
      var content = "";
      var current = me.options.pageNo;
      var total = me.options.totalPage;
      var totalNum = me.options.totalSize;
      content += "<span class='totalSize'> 共<span>"+totalNum+"</span>条记录 </span>";
      content += "<a id='prePage'>上一页</a>";
      //总页数大于6时候
      if(total > 6) {
        //当前页数小于5时显示省略号
        if(current < 5) {
          for(var i = 1; i < 6; i++) {
            if(current == i) {
              content += "<a class='current'>" + i + "</a>";
            } else {
              content += "<a>" + i + "</a>";
            }
          }
          content += "<a id='quickNext'>...</a>";
          content += "<a>"+total+"</a>";
        } else {
           //判断页码在末尾的时候
           if(current < total - 3) {
            content += "<a>1</a>";
            content += "<a id='quickPrev'>...</a>"
            for(var i = current - 2; i < current + 3; i++) {
              if(current == i) {
                content += "<a class='current'>" + i + "</a>";
              } else {
                content += "<a>" + i + "</a>";
              }
            }
            content += "<a id='quickNext'>...</a>";
            content += "<a>"+total+"</a>";
          //页码在中间部分时候 
        } else {
          content += "<a>1</a>";
          content += "<a id='quickPrev'>...</a>";
          for(var i = total - 4; i < total + 1; i++) {
            if(current == i) {
              content += "<a class='current'>" + i + "</a>";
            } else {
              content += "<a>" + i + "</a>";
            }
          }
        }
      }
        //页面总数小于6的时候
      } else {
        for(var i = 1; i < total + 1; i++) {
          if(current == i) {
            content += "<a class='current'>" + i + "</a>";
          } else {
            content += "<a>" + i + "</a>";
          }
        }
      }
      content += "<a id='nextPage'>下一页</a>";
      me.element.html(content);
    },
    //添加页面操作事件
    bindEvent: function() {
      var me = this;
      me.element.off('click', 'a');
      me.element.on('click', 'a', function() {
        var num = $(this).html();
        var id=$(this).attr("id");
        if(id == "prePage") {
          if(me.options.pageNo == 1) {
            me.options.pageNo = 1;
            return;
          } else {
            me.options.pageNo = +me.options.pageNo - 1;
          }
        } else if(id == "nextPage") {
          if(me.options.pageNo == me.options.totalPage) {
            me.options.pageNo = me.options.totalPage;
            return;
          } else {
            me.options.pageNo = +me.options.pageNo + 1;
          }
        } else if(id == "quickPrev") {
          if((me.options.pageNo - 4) < 1) {
            return;
          }else {
            me.options.pageNo -= 4;
          }
        } else if(id == "quickNext") {
          if((me.options.pageNo + 4) > me.options.totalPage) {
            return;
          }else {
            me.options.pageNo += 4;
          }
        }else{
          me.options.pageNo = +num;
        }
        me.creatHtml();
        if(me.options.callback) {
          me.options.callback(me.options.pageNo);
        }
      });
    }
  };
  //通过jQuery对象初始化分页对象
  $.fn.paging = function(options) {
    return new Paging($(this), options);
  }
})(jQuery, window, document);

/*******************************************
* 
* Plug-in:友好的页面加载效果
* Author:sqinyang (sqinyang@sina.com)
* Time:2015/04/20
* Explanation:随着HTML5的流行，页面效果越来越炫，同时也需要加载大量的插件及素材，万恶的网速，特别对于挂在国外服务器的网站，一打开一堆素材缓缓加载，位置错乱不齐，故编写此方法，方便大家使用
*
*********************************************/

jQuery.bootstrapLoading = {
  start: function (options) {
    var defaults = {
      opacity: .9,
      //loading页面透明度
      backgroundColor: "#fff",
      //loading页面背景色
      borderColor: "#bbb",
      //提示边框颜色
      borderWidth: 1,
      //提示边框宽度
      borderStyle: "solid",
      //提示边框样式
      loadingTips: "Loading, please wait...",
      //提示文本
      TipsColor: "#666",
      //提示颜色
      delayTime: 1000,
      //页面加载完成后，加载页面渐出速度
      zindex: 999,
      //loading页面层次
      sleep: 0
      //设置挂起,等于0时则无需挂起

    }
    var options = $.extend(defaults, options);

    //获取页面宽高
    var _PageHeight = document.documentElement.clientHeight,
    _PageWidth = document.documentElement.clientWidth;

    //在页面未加载完毕之前显示的loading Html自定义内容
    var _LoadingHtml = '<div id="loadingPage" style="position:fixed;left:0;top:0;_position: absolute;width:100%;height:' + _PageHeight + 'px;background:' + options.backgroundColor + ';opacity:' + options.opacity + ';filter:alpha(opacity=' + options.opacity * 100 + ');z-index:' + options.zindex + ';"><div id="loadingTips" style="position: absolute; cursor1: wait; width: auto;border-color:' + options.borderColor + ';border-style:' + options.borderStyle + ';border-width:' + options.borderWidth + 'px; height:80px; line-height:80px; padding-left:50px; padding-right: 5px;border-radius:10px;  background: ' + options.backgroundColor + ' url(../../image/loading.gif) no-repeat 5px center; color:' + options.TipsColor + ';font-size:20px;">' + options.loadingTips + '</div></div>';

    //呈现loading效果
    $("body").append(_LoadingHtml);

    //获取loading提示框宽高
    var _LoadingTipsH = document.getElementById("loadingTips").clientHeight,
    _LoadingTipsW = document.getElementById("loadingTips").clientWidth;

    //计算距离，让loading提示框保持在屏幕上下左右居中
    var _LoadingTop = _PageHeight > _LoadingTipsH ? (_PageHeight - _LoadingTipsH) / 2 : 0,
    _LoadingLeft = _PageWidth > _LoadingTipsW ? (_PageWidth - _LoadingTipsW) / 2 : 0;

    $("#loadingTips").css({
      "left": _LoadingLeft + "px",
      "top": _LoadingTop + "px"
    });

    //监听页面加载状态
    document.onreadystatechange = PageLoaded;

    //当页面加载完成后执行
    function PageLoaded() {
      if (document.readyState == "complete") {
        var loadingMask = $('#loadingPage');

        setTimeout(function () {
          loadingMask.animate({
            "opacity": 0
          },
          options.delayTime,
          function () {
            $(this).hide();

          });

        },
        options.sleep);

      }
    }
  },
  end: function () {
    $("#loadingPage").remove();
  }
};

jQuery.openmask = {
  init: function (dom) {
    $('body').append(this.bindModelEvent(dom));
    $('#myModal').modal('show')
    $('#myModal').on('shown.bs.modal', function () {

    })
  },
  bindModelEvent: function (dom) {
    var $model = $(this.createModel());
    $model = $model.find('.modal-body').append($(dom));
    $model.find('#saveAdd').on('click',function () {
      console.log('关闭了');
      $('#myModal').modal('hide')
    })
    return $model;
  },
  createModel: function () {
    return html = ' <div class="modal fade bs-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
    '<div class="modal-dialog modal-sm" role="document">'+
    '<div class="modal-content">'+
    '<div class="modal-header">'+
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    '<h4 class="modal-title" id="myModalLabel">添加分类</h4>'+
    '</div>'+
    '<div class="modal-body">'+
    // 添加内容

    '</div>'+
    '<div class="modal-footer">'+
    '<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>'+
    '<button type="button" class="btn btn-primary" id="saveAdd">保存</button>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
  }
};

jQuery.malert=function(mes,option){
	mes = mes || "服务器繁忙，请稍后尝试！";
	option = option || {icon: 5};
	layer.alert(mes, option);
};

jQuery.mmes=function(mes,option){
	mes = mes || "服务器繁忙，请稍后尝试！";
	option =  option || {icon: 5};
	layer.msg(mes, option);
};

