$(function () {
  layui.use(['layer','form'],function () {
    var layer = layui.layer;
    var form = layui.form;
    dosage.init(form);
  })
})

var dosage = {
  init: function (form) {
    this.form = form;
    this.bindEvent();
  },
  bindEvent: function () {
    // 左侧按钮
    $('.private-buttons-box').each(function () {
      $(this).find('.private-add').on('click',function () {
        layer.open({
          type: 1,
          title: '新增',
          content: '<div class="mxx-layer"><label>名称:</label><input placeholder="请输入名称"></div>',
          btn: ['确认', '取消'],
          area: ['500px','200px'],
          yes: function (index,layero) {
            console.log($(layero));
            layer.close(index);
          }
        })
      })
      $(this).find('.private-edit').on('click',function () {
        layer.open({
          type: 1,
          title: '修改',
          content: '<div class="mxx-layer"><label>名称:</label><input placeholder="请输入名称"></div>',
          btn: ['确认', '取消'],
          area: ['500px','200px'],
          yes: function (index,layero) {
            console.log($(layero));
            layer.close(index);
          }
        })
      })
      $(this).find('.private-del').on('click',function () {
        layer.confirm('是否删除当前分类?', {title:'确认删除'}, function(index){

          layer.close(index);
        });
      })
    })
    // 新增按钮
    $('.private-add-new').on('click',function () {
      var html = [];
      html.push('<form class="layui-form mxx-layer-form" lay-filter="formNew">');
      html.push('<div class="layui-form-item">');
      html.push('<label class="layui-form-label">编码</label>');
      html.push('<div class="layui-input-block">');
      html.push('<input type="text"  placeholder="请输入编码" autocomplete="off" class="layui-input">');
      html.push('</div>');
      html.push('</div>');
      html.push('<div class="layui-form-item">');
      html.push('<label class="layui-form-label">名称</label>');
      html.push('<div class="layui-input-inline">');
      html.push('<input type="text" placeholder="请输入名称" autocomplete="off" class="layui-input">');
      html.push('</div>');
      html.push('</div>');
      html.push('<div class="layui-form-item">');
      html.push('<label class="layui-form-label">分类</label>');
      html.push('<div class="layui-input-block">');
      html.push('<select name="category">');
      html.push('<option value="">消化系统</option>');
      html.push('<option value="0">消化系统</option>');
      html.push('<option value="1">消化系统</option>');
      html.push('<option value="2">消化系统</option>');
      html.push('</select>');
      html.push('</div>');
      html.push('</div>');
      html.push('<div class="layui-form-item layui-form-text">');
      html.push('<label class="layui-form-label">说明</label>');
      html.push('<div class="layui-input-block">');
      html.push('<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>');
      html.push('</div>');
      html.push('</div>');
      html.push('</form>');
      layer.open({
        type: 1,
        title: '新增',
        content: html.join(''),
        btn: ['确认', '取消'],
        area: ['500px','400px'],
        success: function(){
          dosage.form.render('select','formNew');
        },
        yes: function (index,layero) {
          console.log($(layero));
          layer.close(index);
        }
      })
    })
    // 搜索按钮
    $('.private-search-box').on({
      search: function () {
        console.log($(this).find('input').val());
      }
    }).each(function () {
      $(this).find('i').on('click',function () {
        $(this).parent().trigger('search');
      })
      $(this).find('input').on('keypress',function (e) {
        if(e.keyCode == 13) $(this).parent().trigger('search');
      })
    })
    // 列表按钮
    $('.private-button-box').on({
      check: function () {
        var html = [];
        html.push('<div class="mxx-layer-check">');
        html.push('<div class="layui-clear">');
        html.push('<p>编码：</p>');
        html.push('<p>kkk9550</p>');
        html.push('</div>');
        html.push('<div class="layui-clear">');
        html.push('<p>名称：</p>');
        html.push('<p>口干</p>');
        html.push('</div>');
        html.push('<div class="layui-clear">');
        html.push('<p>分类：</p>');
        html.push('<p>消化系统</p>');
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
          area: ['500px','400px'],
          btn: ['取消'],
          success: function (layero,index) {
          },
          yes: function (index,layero) {
            layer.close(index);
          }
        })
      },
      edit: function () {
        var html = [];
        html.push('<form class="layui-form mxx-layer-form" lay-filter="formNew">');
        html.push('<div class="layui-form-item">');
        html.push('<label class="layui-form-label">编码</label>');
        html.push('<div class="layui-input-block">');
        html.push('<input type="text"  placeholder="请输入编码" autocomplete="off" class="layui-input">');
        html.push('</div>');
        html.push('</div>');
        html.push('<div class="layui-form-item">');
        html.push('<label class="layui-form-label">名称</label>');
        html.push('<div class="layui-input-inline">');
        html.push('<input type="text" placeholder="请输入名称" autocomplete="off" class="layui-input">');
        html.push('</div>');
        html.push('</div>');
        html.push('<div class="layui-form-item">');
        html.push('<label class="layui-form-label">分类</label>');
        html.push('<div class="layui-input-block">');
        html.push('<select name="category">');
        html.push('<option value="">消化系统</option>');
        html.push('<option value="0">消化系统</option>');
        html.push('<option value="1">消化系统</option>');
        html.push('<option value="2">消化系统</option>');
        html.push('</select>');
        html.push('</div>');
        html.push('</div>');
        html.push('<div class="layui-form-item layui-form-text">');
        html.push('<label class="layui-form-label">说明</label>');
        html.push('<div class="layui-input-block">');
        html.push('<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>');
        html.push('</div>');
        html.push('</div>');
        html.push('</form>');
        layer.open({
          type: 1,
          title: '查看',
          content: html.join(''),
          area: ['500px','400px'],
          btn: ['取消'],
          success: function (layero,index) {
            dosage.form.render('select','formNew');
          },
          yes: function (index,layero) {
            layer.close(index);
          }
        })
      },
      del: function () {
        layer.confirm('是否删除当前分类?', {title:'确认删除'}, function(index){

          layer.close(index);
        });
      },
    }).each(function () {
      $(this).find('span:eq(0)').on('click',function () {
        $(this).parent().trigger('check');
      })
      $(this).find('span:eq(1)').on('click',function () {
        $(this).parent().trigger('edit');
      })
      $(this).find('span:eq(2)').on('click',function () {
        $(this).parent().trigger('del');
      })
    })
  }
}
