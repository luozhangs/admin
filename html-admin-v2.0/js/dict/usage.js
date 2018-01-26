$(function() {
	layui.use(['laypage', 'layer'], function() {
		var laypage = layui.laypage;
		var layer = layui.layer;
		usage.init(laypage);
	})
})
var usage = {
	init: function(laypage) {
		this.initPaging(laypage);
		this.bindEvent();
	},
	initPaging: function(laypage) {
		laypage.render({
			elem: 'mxxPaging',
			layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
			count: 100
		})
	},
	bindEvent: function() {
		// 新增
		$('.private-add-new').on('click', function() {
			var html = [];
			html.push('<div class="mxx-layer-form">');	
			html.push('<div>');
			html.push('<p>编码：</p>');
			html.push('<p><input placeholder="请输入编码" class="layui-input"></p>')
			html.push('</div>')
			html.push('<div>');
			html.push('<p>名称：</p>');
			html.push('<p><input placeholder="请输入名称" class="layui-input"></p>')
			html.push('</div>')
			html.push('<div>');
			html.push('<p>说明：</p>');
			html.push('<p><textarea class="layui-textarea mxx-textarea"></textarea></p>')
			html.push('</div>')
			html.push('</div>');
			layer.open({
				type: 1,
				title: '新增',
				content: html.join(''),
				area: ['500px', '360px'],
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					console.log(index);
					console.log(layero);
					layer.close(index);
				}
			})
		})
			// 搜索
			$('.private-input-box').on({
				search: function() {
					console.log($(this).find('input').val());
				}
			}).each(function() {
				$(this).find('i').on('click', function() {
					$(this).parent().trigger('search');
				})
				$(this).find('input').on('keypress', function(e) {
					if(e.keyCode == '13') {
						$(this).parent().trigger('search');
					}
				})
			})
			// 查看，修改，删除
			$('.private-button-box').on({
				check: function() {
					var html = [];
					html.push('<div class="mxx-layer-form">');
					html.push('<div class="layui-clear">');
					html.push('<p>编码：</p>');
					html.push('<p>kkk9550</p>');
					html.push('</div>');
					html.push('<div class="layui-clear">');
					html.push('<p>名称：</p>');
					html.push('<p>口干</p>');
					html.push('</div>');
					html.push('<div class="layui-clear">');
					html.push('<p>说明：</p>');
					html.push('<p>该警告颜色显示为橙色，建议可查看相关信息防止出现问题。</p>');
					html.push('</div>');
					html.push('</div>');
					layer.open({
						type: 1,
						title: '查看',
						content: html.join(''),
						btn: ['取消'],
						area: ['500px', '350px'],
						yes: function(index, layero) {
							layer.close(index)
						}
					})
				},
				edit: function() {
					var html = [];
					html.push('<div class="mxx-layer-form">');	
					html.push('<div>');
					html.push('<p>编码：</p>');
					html.push('<p><input placeholder="请输入编码" class="layui-input"></p>')
					html.push('</div>')
					html.push('<div>');
					html.push('<p>名称：</p>');
					html.push('<p><input placeholder="请输入名称" class="layui-input"></p>')
					html.push('</div>')
					html.push('<div>');
					html.push('<p>说明：</p>');
					html.push('<p><textarea class="layui-textarea mxx-textarea"></textarea></p>')
					html.push('</div>')
					html.push('</div>');
					layer.open({
						type: 1,
						title: '查看',
						content: html.join(''),
						btn: ['保存', '取消'],
						area: ['500px', '360px'],
						yes: function(index, layero) {
							layer.close(index)
						}
					})
				},
				del: function() {
					layer.confirm('是否删除当前药品目录?', {
						title: '确认删除'
					}, function(index) {

						layer.close(index);
					});
				}
			}).each(function() {
				$(this).find('span:eq(0)').on('click', function() {
					console.log($(this))
					$(this).parent().trigger('check');
				})
				$(this).find('span:eq(1)').on('click', function() {
					$(this).parent().trigger('edit');
				})
				$(this).find('span:eq(2)').on('click', function() {
					$(this).parent().trigger('del');
				})
			})
		}
	}
