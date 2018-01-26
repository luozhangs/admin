$(function () {
    layui.use(['element', 'layer', 'form'], function () {
        var element = layui.element;
        var layer = layui.layer;
        var form = layui.form;
        index.init(element, layer, form);
    })
});

var index = {
    init: function (element, layer, form) {
        this.element = element;
        this.layer = layer;
        this.form = form;
        this.bindEvent();
        this.initData();
    },

    initData: function () {
        var accountObj = {id: 1, picUrl: ""};
        JY.saveZxxData("account", accountObj);
        var account = JY.getZxxData("account");
        if (!JY.Object.notNull(account)) {
            window.location.href = "/zxx/html/login/login.html";
            return;
        }
        $("#adminPic").attr("src", JY.Object.notEmpty(account.picUrl,"/image/default_user.png"));
        $("#adminPic").attr("title", JY.Object.notEmpty(account.loginName));
        $(".mxx-signout").click(function () {
            JY.delZxxData("account");
            window.location.href = "/zxx/html/login/login.html";
        });
        var url = adminPath + "/resources/resAuthorized?accountId=" + account.id + "&type=1";
        $.ajax({
            url: url,
            success: function (data) {
                if (data.result == 1) {
                    var list = data.model;
                    menu.initMenu(list);
                    index.bindMenuEvent();
                } else {
                    if (JY.Object.notNull(data.mes))
                        JY.Model.error(data.mes);
                }
            },
            error: function (data) {
                JY.Model.error("操作失败");
            }
        });
    },

    bindEvent:function () {
        $(".private-icon-nav").find('.private-switch').on({
            showDl: function () {
                $(this).siblings('dl').attr('data-showdl', true).slideDown(100);
            },
            hideDl: function () {
                $(this).siblings('dl').attr('data-showdl', false).slideUp(100);
            },
            click: function (e) {
                e.preventDefault();
                $(this).siblings('dl').attr('data-showdl') == 'true' ? $(this).trigger('hideDl') : $(this).trigger('showDl')
            }
        });
    },

    bindMenuEvent: function () {
        // 最左侧icon导航事件
        $('.private-icon-nav').each(function () {
            $(this).find('dl dd').on({
                addActive: function () {
                    $(this).addClass('mxx-active').siblings().removeClass('mxx-active')
                },
                showTip: function () {
                    var text = $(this).children('a').attr('data-title');
                    var title = '[data-title=' + text + ']';
                    layer.tips(text, title, {
                        time: 1000
                    });
                },
                click: function (e) {
                    e.preventDefault();
                    $(this).trigger('addActive');
                    //显示隐藏
                    var _this = this;
                    $(".mxx-second-nav").each(function () {
                        if ($(this).attr("data-index") == $(_this).find("a").attr("data-index")) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                    $('.private-second-box').trigger('showTextNav');
                    // $(".mxx-second-nav").attr("data-index")==$(this).find("a").attr("data-index");
                    //   menu.appendChildMenu(index.list[$(this).find("a").attr("data-index")]);
                },
                mouseover: function () {
                    $(this).trigger('showTip');
                }
            })
        })
        // 二级文字导航事件
        $('.private-text-nav').each(function () {
            // 显示隐藏文字导航菜单
            $(this).find('li').each(function () {
                if ($(this).hasClass('private-has-child')) {
                    $(this).children('a').on({
                        showDl: function () {
                            $(this).find('i').html('&#xe61a;');
                            $(this).siblings('dl').attr('data-showdl', true).slideDown(100);
                        },
                        hideDl: function () {
                            $(this).find('i').html('&#xe602;');
                            $(this).siblings('dl').attr('data-showdl', false).slideUp(100);
                        },
                        click: function () {
                            $(this).siblings('dl').attr('data-showdl') == 'true' ? $(this).trigger('hideDl') : $(this).trigger('showDl');
                        }
                    })
                }
            })
            // 文字导航菜单点击变色
            $(this).find('a').on({
                changeColor: function () {
                    var as = $('.private-text-nav').find('a');
                    for (var i = 0, len = as.length; i < len; i++) {
                        $(as[i]).removeClass('mxx-active');
                    }
                    $(this).addClass('mxx-active')
                },
                click: function (e) {
                    e.preventDefault();
                    $(this).trigger('changeColor');
                }
            })
            // 添加tab
            $(this).find('.private-addTab').on({
                addTab: function () {
                    var title = $(this).find('span').text();
                    var id = $(this).attr("data-id");
                    var url = $(this).attr("res-url");
                    if (!JY.Object.notNull(url.split("?")[0])) {
                        return;
                    }
                    index.element.tabAdd('tab', {
                        title: title,
                        content: '<iframe src="' + url + '" frameborder="0"></iframe>',
                        id: id
                    });
                },
                setMargin: function () {
                    var ulWidth = $('.private-tab').width();
                    var boxwidth = $('.layui-tab').width() - 84;
                    if (ulWidth > boxwidth) {
                        var l = ulWidth - boxwidth;
                        $('.private-tab').css({'marginLeft': -l + 'px'});
                    } else {
                        $('.private-tab').css({'marginLeft': '0'});
                    }
                },
                changeSelect: function () {
                    index.element.tabChange('tab', $(this).attr("data-id"));
                },
                click: function (e) {
                    e.preventDefault();
                    var lis = $('.private-tab').find('li');
                    for (var i = 0, len = lis.length; i < len; i++) {
                        if ($(this).attr("data-id") == $(lis[i]).attr('lay-id')) {
                            $(this).trigger('changeSelect').trigger('setMargin');
                            return;
                        }
                    }
                    $(this).trigger('addTab').trigger('changeSelect').trigger('setMargin');
                }
            })
            $(this).find('dd').on({
                changeSelect: function () {
                    var dds = $('.private-text-nav').find('dd');
                    for (var i = 0, len = dds.length; i < len; i++) {
                        $(dds[i]).removeClass('mxx-active');
                    }
                    $(this).addClass('mxx-active')
                },
                click: function () {
                    $(this).trigger('changeSelect')
                }
            })
        })
        // 导航开关事件
        $('.private-second-box').on({
            showTextNav: function () {
                $(this).animate({
                    width: '196px'
                }, 200)
                $(this).siblings('.private-switch-button').animate({
                    left: '231px'
                }, 200)
                $('.mxx-body').animate({
                    left: '239px'
                }, 200)
            },
            hideTextNav: function () {
                $(this).animate({
                    width: '0'
                }, 200)
                $(this).siblings('.private-switch-button').animate({
                    left: '54px'
                }, 200)
                $('.mxx-body').animate({
                    left: '70px'
                }, 200)
            }
        })
        $('.private-switch-button').on('click', function () {
            $(this).css('left') === '231px' ? $(this).siblings('.mxx-second-box').trigger('hideTextNav') : $(this).siblings('.mxx-second-box').trigger('showTextNav');
        })
        // tab按钮事件
        $('.private-left').on('click', function () {
            var boxwidth = $('.layui-tab').width() - 84;
            var ulWidth = $(this).siblings('.private-tab').width();
            if (ulWidth > boxwidth) {
                $(this).siblings('.private-tab').css({'marginLeft': '0'});
            } else {
                index.layer.msg('无需滚动');
            }
        })
        $('.private-right').on('click', function () {
            var boxwidth = $('.layui-tab').width() - 84;
            var ulWidth = $(this).siblings('.private-tab').width();
            var l = ulWidth - boxwidth;
            if (ulWidth > boxwidth) {
                $(this).siblings('.private-tab').css({'marginLeft': -l + 'px'});
            } else {
                index.layer.msg('无需滚动');
            }
        })
    },
    cutPic: function (option) {
        // console.log(option)
        // point初始化选择框 [x,y,x1,y1] (框左上角和右下角)
        if (Object.prototype.toString.call(option) != '[object Object]') {
            layer.msg('需要剪切的图片有误');
            return;
        }
        var a = {
            src: '',
            imgPath: '',
            rate: 160 / 90,
            point: null,
            fn: function () {
            }
        };
        var option = $.extend(a, option);
        var showWidth = 200;
        var showHeight = 200 / option.rate;

        function html() {
            var html = [];
            html.push('<div class="mxx-cut">');

            html.push('<img src="' + option.src + '" img-path="' + option.imgPath + '" alt="图片加载失败" id="target">');

            html.push('<div class="mxx-target-box">');
            html.push('<div class="mxx-target" style="overflow:hidden;width:' + showWidth + 'px;height:' + showHeight + 'px;">');
            html.push('<img src="' + option.src + '" alt="图片加载失败" />');
            html.push('</div>');
            html.push('</div>');

            html.push('<p style="top:' + (showHeight + 50) + 'px;">当前裁剪比例16:9</p>');
            html.push('</div>');
            return html.join('');
        }

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
                        onChange: updatePreview,
                        onSelect: updatePreview,
                        onRelease: release,
                        aspectRatio: xsize / ysize
                    }, function () {
                        if (option.point) this.animateTo(option.point);
                        $pimg.attr('renderbound', renderbound);
                        var bounds = this.getBounds();
                        boundx = bounds[0];
                        boundy = bounds[1];
                        jcrop_api = this;
                    });

                    function updatePreview(c) {
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
                    function release() {
                        $pimg.removeAttr('data-w');
                        $pimg.removeAttr('data-h');
                        $pimg.removeAttr('data-x');
                        $pimg.removeAttr('data-y');
                    }
                }, 1000)
            },
            yes: function (index, layero) {
                var w = $(layero).find('.mxx-target-box .mxx-target img').attr('data-w') || 0;
                var h = $(layero).find('.mxx-target-box .mxx-target img').attr('data-h') || 0;
                var x = $(layero).find('.mxx-target-box .mxx-target img').attr('data-x') || 0;
                var y = $(layero).find('.mxx-target-box .mxx-target img').attr('data-y') || 0;
                if (!w) {
                    layer.msg('请先裁剪图片');
                } else {
                    var b = $(layero).find('.mxx-target-box .mxx-target img').attr('renderbound');
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
                    if (option.fn) option.fn.call(this, imgInfo);
                    layer.close(index);
                }
            }
        })
    },
    getPoint: function (imgInfo) {
        if (typeof(imgInfo) == "string") {
            imgInfo = JSON.parse(imgInfo);
        }
        var point = [];
        point.push(imgInfo.imgX);
        point.push(imgInfo.imgY);
        point.push(imgInfo.imgX + imgInfo.imgW);
        point.push(imgInfo.imgY + imgInfo.imgH);
        return point;
    }
}
