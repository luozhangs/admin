/**
 * Created by Administrator on 2017/12/8.
 * 
 */
menu = {
    initMenu: function (data) {
        var menuList = [];
        $(".private-second-box").empty();
        // 循环数据,将所有数据渲染到页面
        for(var i=0;i<data.length;i++) {
            menuList.push('<dd><a href="javascript:;" data-title="' + data[i].name + '" data-index="' + data[i].id + '" class="private-icon-1"></a></dd>');
            $(".private-second-box").append(this.appendChildMenu(data[i]));
        }
        // 设置当前默认显示
        $("#main-menu").empty().append(menuList.join("")).find('dd').first().addClass('mxx-active');
        $(".private-second-box").find('.mxx-second-nav').first().show();
        // $(".private-second-box").find('.mxx-second-nav').each(function(){
        //     $(this).find('ul li').first().addClass('mxx-active');
        // })
    },
    appendChildMenu: function (m) {
        var childMenu = [];
        childMenu.push('<div class="mxx-second-nav" style="display: none" data-index="' + m.id + '">');
        childMenu.push(' <p class="mxx-nav-title"><span>' + m.name + ':</span></p>');
        childMenu.push('<ul class="mxx-text-nav private-text-nav">');
        for (var i = 0; i < m.nodes.length; i++) {
            var n = m.nodes[i];

            if (n.nodes.length > 0) {
                childMenu.push('<li class="private-has-child">');
                childMenu.push('<a href="javascript:;"><span>' + n.name + '</span><i class="layui-icon fr">&#xe61a;</i></a>');
                //子菜单
                childMenu.push('<dl>');
                for (var j = 0, len = n.nodes.length, o; j < len; j++) {
                    o = n.nodes[j];
                    childMenu.push(' <dd><a href="javascript:;" class="private-addTab" res-url="' + o.resUrl + '" data-id="' + o.id + '"><span>' + o.name + '</span></a></dd>');
                }
                childMenu.push('</dl>');
                childMenu.push('</li>');
            } else {
                childMenu.push(' <li><a href="javascript:;" class="private-addTab"  res-url="' + n.resUrl + '" data-id="' + n.id + '"><span>' + n.name + '</span></a></li>');
            }
        }
        childMenu.push('</ul>');
        childMenu.push('</div>');
        return childMenu.join("");
    }
}