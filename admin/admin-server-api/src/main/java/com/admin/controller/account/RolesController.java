package com.admin.controller.account;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.controller.base.BaseController;
import com.admin.model.account.Roles;
import com.admin.pm.role.RolesAddForm;
import com.admin.pm.role.RolesUpdateForm;
import com.admin.service.account.RolesService;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;

/**
 * Title: RolesController
 * Description: 角色表接口
 *
 * @author 张掌
 */
@RestController
@RequestMapping("/role")
public class RolesController extends BaseController{

    private Logger logger = LoggerFactory.getLogger(RolesController.class);

    private static final String SECURITY_URL="/role/page";
    @Autowired
    private RolesService rolesService;

    @Override
    public String getUrl() {
        return SECURITY_URL;
    }


    @RequestMapping("/add")
    public Result<Integer> add(@RequestBody @Valid RolesAddForm form,BindingResult bindingResult) {
        return  rolesService.save(null, form.getPid(),  form.getTitle(), form.getDescn(),null, form.getSort());
    }

    /**
     * 更新
     * @param form
     * @return
     */
    @RequestMapping("/update")
    public Result<Integer> update(@RequestBody @Valid  RolesUpdateForm form,BindingResult bindingResult) {

        return rolesService.save(form.getId(), form.getPid(),  form.getTitle(), form.getDescn(),form.getIsValid(), form.getSort());

    }

    /**
     * 分页查询
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @param pageNo        页码
     * @param pageSize
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/page")
    public Result<Page<Roles>> findPage(
            @RequestParam(value = "keyWord", required = false) String keyWord, @RequestParam(value = "pid", required = false) Long pid,
            @RequestParam(value = "title", required = false) String title, @RequestParam(value = "status", required = false)Long status,
            @RequestParam(value = "isValid", required = false)Integer isValid,
            @RequestParam(value = "pageNo", required = false) Integer pageNo, @RequestParam(value = "pageSize", required = false) Integer pageSize) {

        Result<Page<Roles>> res = new Result<Page<Roles>>();

        Page<Roles> page = rolesService.findPage(keyWord, pid, title,  status, isValid,  pageNo, pageSize).getModel();
        res.setModel(page);
        return res;
    }

    /**
     * 查询List
     *
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/list")
    public Result<List<Roles>> findList(
            @RequestParam(value = "keyWord", required = false) String keyWord, @RequestParam(value = "pid", required = false) Long pid,
            @RequestParam(value = "title", required = false) String title, @RequestParam(value = "status", required = false)Long status,
            @RequestParam(value = "isValid", required = false)Integer isValid) {
       return  rolesService.findList(keyWord,  pid, title, status, isValid);
    }

    /**
     * 查询单个
     *
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/get")
    public Result<Roles> getById(@RequestParam("id") Long id) {
        Result<Roles> res = new Result<Roles>();

        Roles roles = rolesService.getById(id);
        res.setModel(roles);
        return res;
    }

    /**
     * 删除
     *
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/del")
    public Result<Integer> delete(@RequestParam("id") Long id) {
        Result<Integer> res = new Result<Integer>();
        return rolesService.delete(id);

    }

    /**
     * 权限列表包含按钮
     *
     * @param roleId 角色Id
     * @return
     */
    @RequestMapping(value = "/list/authorized")
    public Result<List<ZNodes>> listAuthorized(@RequestParam(value = "roleId") Long roleId) {
        return rolesService.listAuthorized(roleId);
    }

    /**
     * 根据角色Id保存权限列表
     *
     * @param param(roleId 角色Id auss 权限数组 layer 显示层级)
     * @return
     */
    @RequestMapping(value = "/save/authorized")
    public Result<Integer> saveAuthorized(@RequestBody Map<String, Object> param) {
        String roleid = Objects.toString(param.get("roleId"));
        Long roleId = roleid !=null && !"".equals(roleid)?Long.parseLong(roleid):null;
        String auss = Objects.toString(param.get("auss"));
        Integer layer = (Integer)(param.get("layer"));
        return  rolesService.saveAuthorized(roleId, auss, layer);
    }

    /**
     * 批量删除角色
     * @param roles
     * @return
     */
    @RequestMapping(value = "/delete/batch")
    public Result<Integer> deleteBatch(@RequestBody List<Roles> roles) {
        Result<Integer> res = new Result<Integer>();
        return rolesService.deleteBatch(roles);
    }
}
