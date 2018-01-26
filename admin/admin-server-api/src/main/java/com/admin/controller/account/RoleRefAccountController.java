package com.admin.controller.account;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.model.account.RoleRefAccount;
import com.admin.service.account.RoleRefAccountService;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;

/**
 * Title: RoleRefAccountController
 * Description: 
 * @author 张掌
 * @date 2017/11/10 15:31
 */
@RestController
@RequestMapping("/role/ref/account")
public class RoleRefAccountController {

    private Logger logger = LoggerFactory.getLogger(RoleRefAccountController.class);
    @Autowired
    private RoleRefAccountService roleRefAccountService;

    /**
     * 添加新的账户信息
     * @Title: insert
     * @author 张掌
     * @date 2017/11/10 13:47
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @param createTime  创建时间
     * @param modifyTime  修改时间
     * @return com.maxx.base.util.Result<com.admin.model.account.RoleRefAccount>
     */
    @RequestMapping("/add")
    public Result insert(@RequestParam(value = "roleId", required = false) Long roleId, @RequestParam(value = "accountId", required = false) Long accountId,
                         @RequestParam(value = "isDelete", required = false) Integer isDelete, @RequestParam(value = "sortWeight", required = false) Long sortWeight,
                         @RequestParam(value = "status", required = false) Long status, @RequestParam(value = "createTime", required = false) Date createTime,
                         @RequestParam(value = "modifyTime", required = false) Date modifyTime){
        Result<RoleRefAccount> res = new Result<RoleRefAccount>();
        res.setResult(1);
        res.setMes("添加成功");
        roleRefAccountService.save(roleId, accountId, isDelete, sortWeight, status, createTime, modifyTime);
        return res;
    }

    /**
     * 更新账户信息
     * @Title: update
     * @author 张掌
     * @date 2017/11/10 13:54
     * @param id 主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @param createTime  创建时间
     * @param modifyTime  修改时间
     * @return com.maxx.base.util.Result<com.admin.model.account.RoleRefAccount>
     */
    @RequestMapping("/update")
    public Result update(@RequestParam(value = "id", required = false) Long id,  @RequestParam(value = "roleId", required = false) Long roleId,
                         @RequestParam(value = "accountId", required = false) Long accountId, @RequestParam(value = "isDelete", required = false) Integer isDelete,
                         @RequestParam(value = "sortWeight", required = false) Long sortWeight, @RequestParam(value = "status", required = false) Long status,
                         @RequestParam(value = "createTime", required = false) Date createTime, @RequestParam(value = "modifyTime", required = false) Date modifyTime){
        Result<RoleRefAccount> res = new Result<RoleRefAccount>();
        res.setResult(1);
        res.setMes("修改成功");
        roleRefAccountService.update(id, roleId, accountId, isDelete, sortWeight, status, createTime, modifyTime);
        return res;
    }

    /**
     * 分页查询
     * @Title: findPage
     * @author 张掌
     * @date 2017/11/10 13:54
     * @param id 主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @param pageNo  页码
     * @param pageSize
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/page")
    public Result findPage(@RequestParam(value = "id", required = false) Long id,  @RequestParam(value = "roleId", required = false) Long roleId,
                           @RequestParam(value = "accountId", required = false) Long accountId, @RequestParam(value = "isDelete", required = false) Integer isDelete,
                           @RequestParam(value = "sortWeight", required = false) Long sortWeight, @RequestParam(value = "status", required = false) Long status,
                           @RequestParam(value = "pageNo", required = false) Integer pageNo, @RequestParam(value = "pageSize", required = false) Integer pageSize){
        Result res = new Result<RoleRefAccount>();
        res.setResult(1);
        Page<RoleRefAccount> page = roleRefAccountService.findPage(id,roleId, accountId, isDelete, sortWeight, status,  pageNo, pageSize);
        res.setModel(page);
        return res;
    }

    /**
     * 查询List
     * @Title: findList
     * @author 张掌
     * @date 2017/11/10 13:54
     * @param id 主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/list")
    public Result findList(@RequestParam(value = "id", required = false) Long id,  @RequestParam(value = "roleId", required = false) Long roleId,
                           @RequestParam(value = "accountId", required = false) Long accountId, @RequestParam(value = "isDelete", required = false) Integer isDelete,
                           @RequestParam(value = "sortWeight", required = false) Long sortWeight, @RequestParam(value = "status", required = false) Long status){
        Result res = new Result<RoleRefAccount>();
        res.setResult(1);
        List<RoleRefAccount> list = roleRefAccountService.findList(id,roleId, accountId, isDelete, sortWeight, status);
        res.setModel(list);
        return res;
    }

    /**
     * 查询单个
     * @Title: getById
     * @author 张掌
     * @date 2017/11/10 13:55
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/get")
    public Result getById(@RequestParam("id") Long id){
        Result res = new Result<RoleRefAccount>();
        res.setResult(1);
        RoleRefAccount RoleRefAccount = roleRefAccountService.getById(id);
        res.setModel(RoleRefAccount);
        return res;
    }

    /**
     * 删除
     * @Title: delete
     * @author 张掌
     * @date 2017/11/10 13:55
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/del")
    public Result delete(@RequestParam("id") Long id){
        Result res = new Result<RoleRefAccount>();
        res.setResult(1);
        res.setMes("删除成功");
        roleRefAccountService.delete(id, 1);
        return res;
    }

    /**
     * 撤销删除
     * @Title: rollback
     * @author 张掌
     * @date 2017/11/10 13:55
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/roll")
    public Result rollback(@RequestParam("id") Long id){
        Result res = new Result<RoleRefAccount>();
        res.setResult(1);
        res.setMes("撤销删除成功");
        roleRefAccountService.delete(id, 0);
        return res;
    }

}
