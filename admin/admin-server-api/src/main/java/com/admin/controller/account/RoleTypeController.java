package com.admin.controller.account;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.model.account.RoleType;
import com.admin.pm.role.type.RoleTypeAddForm;
import com.admin.pm.role.type.RoleTypeUpdateForm;
import com.admin.service.account.RoleTypeService;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.util.Result;

/**
 * Title: RoleTypeController
 * Description:
 * @author zz
 * @date 2017/11/23 14:53
 */

@RestController
@RequestMapping("/role/type")
public class RoleTypeController {

    private Logger logger = LoggerFactory.getLogger(RoleTypeController.class);

    @Autowired
    private RoleTypeService roleTypeService;

    /**
     * 添加
     * @param form
     * @return
     */
    @RequestMapping("/add")
    public Result<Integer> add(@RequestBody @Valid RoleTypeAddForm form, BindingResult bindingResult){
        Result<Integer> res = new Result<Integer>();
        if (bindingResult.hasErrors()){
            res.setResult(-1);
            res.setMes(bindingResult.getFieldError().getDefaultMessage());
        }else{

            return roleTypeService.add(form.getPid(), form.getTitle(), form.getDescn());

        }
        return res;
    }

    /**
     * 更新
     * @param form
     * @return
     */
    @RequestMapping("/update")
    public Result<Integer> update(@RequestBody @Valid RoleTypeUpdateForm form,BindingResult bindingResult){
        Result<Integer> res = new Result<Integer>();
        if (bindingResult.hasErrors()){
            res.setResult(-1);
            res.setMes(bindingResult.getFieldError().getDefaultMessage());
        }else{

            return roleTypeService.update(form.getId(), form.getPid(), form.getTitle(), form.getDescn(), form.getIsValid(), form.getSort());

        }
        return res;
    }

    /**
     * 主键查询
     * @param id
     * @return
     */
    @RequestMapping("/get")
    public Result<RoleType> findByPk(@RequestParam("id") Long id){
        Result<RoleType> res = new Result<RoleType>();
        RoleType type = roleTypeService.getById(id);
        res.setModel(type);
        res.setResult(1);
        return res;
    }

    /**
     * 删除
     * @param id
     * @return
     */
    @RequestMapping("/del")
    public Result<Integer> delete(@RequestParam(value = "id") Long id){
        Result<Integer> res = roleTypeService.delete(id);
        return res;

    }

    /**
     *  查询列表
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @return
     */
    @RequestMapping("/list")
    public Result<List<RoleType>> findList(@RequestParam(value = "keyword", required = false) String keyword,  @RequestParam(value = "pid", required = false) Long pid,
                                           @RequestParam(value = "title", required = false) String title, @RequestParam(value = "status", required = false)Long status){
        return roleTypeService.findList(keyword, pid, title, status);
    }

    /**
     * 模糊查询角色类型树
     * @param keyword
     * @return
     */
    @RequestMapping("/type/tree")
    public Result<List<ZNodes>> findTree(@RequestParam(value = "keyword", required = false) String keyword){
        Result<List<ZNodes>> result = new Result<List<ZNodes>>();
        List<ZNodes> nodes = roleTypeService.findTree(keyword);
        result.setModel(nodes);
        return  result;
    }

    /**
     * 查询全部角色树
     * @return
     */
    @RequestMapping("/role/tree")
    public Result<List<ZNodes>> findRoleTree(){
        return roleTypeService.findRoleTree();
    }
}
