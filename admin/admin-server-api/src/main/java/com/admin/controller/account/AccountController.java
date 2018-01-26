package com.admin.controller.account;

import java.util.List;

import javax.validation.Valid;

import com.admin.vm.account.AccountVo;
import com.alibaba.fastjson.JSONObject;
import com.maxx.base.util.StringUtil;
import com.maxx.base.util.security.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.model.account.Account;
import com.admin.pm.account.AccountAddForm;
import com.admin.pm.account.AccountUpdateForm;
import com.admin.service.account.AccountService;
import com.admin.vm.account.AccountListVo;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;


/**
 * Title: AccountController
 * Description:账户表接口
 *
 * @author 张掌
 */
@RestController
@RequestMapping("/account")
public class AccountController  {

    private Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private AccountService accountService;

    /**
     *
     * @Title: add
     * @author zz
     * @date 2017/12/6 14:03
     * @param form
     * @return com.maxx.base.util.Result<java.lang.Integer>
     */
    @RequestMapping("/add")
    public Result<Integer> add(@RequestBody  @Valid AccountAddForm form, BindingResult bindingResult) {
        Result<Integer> result = new Result<Integer>();
        if (bindingResult.hasErrors()){
            result.setResult(0);
            result.setMes(bindingResult.getFieldError().getDefaultMessage());
        }else{
            result =  accountService.add(form.getLoginName(), form.getRealName(), form.getDescn(), form.getSex(), form.getPhone(), form.getEmail(), form.getRoleId(), form.getDeptId());

        }
        return result;
    }

    /**
     * 更新
     * @param form
     * @return
     */
    @RequestMapping("/update")
    public Result<Integer> update(@RequestBody @Valid AccountUpdateForm form,BindingResult bindingResult) {
        Result<Integer> result = new Result<Integer>();
        if (bindingResult.hasErrors()){
            result.setResult(0);
            result.setMes(bindingResult.getFieldError().getDefaultMessage());
        }else{
            result =  accountService.update(form.getId(), form.getLoginName(), form.getRealName(), form.getDescn(), form.getPicUrl(), form.getSkin(), form.getSex(), form.getPhone(), form.getEmail(), form.getIdentityCard(), form.getSort(), form.getRoleId(), form.getDeptId(), form.getIsValid());
        }
        return result;
    }

    /**
     * 分页查询
     *
     * @param keyWord       关键词
     * @param loginName     登录名
     * @param realName      真实名字
     * @param accountType   账户类型
     * @param sex           性别
     * @param phone         手机号
     * @param email         邮箱
     * @param identityCard  身份证
     * @param status        状态
     * @param roleId        角色id
     * @param deptId        部门id
     * @param pageNo        页码
     * @param pageSize
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/page")
    public Result<Page<AccountListVo>> findPage(
            @RequestParam(value = "keyWord", required = false) String keyWord, @RequestParam(value = "loginName",required = false) String loginName,
            @RequestParam(value = "realName",required = false)String realName, @RequestParam(value = "accountType",required = false)String accountType,
            @RequestParam(value = "sex",required = false)Integer sex, @RequestParam(value = "phone",required = false)String phone,
            @RequestParam(value = "email",required = false)String email, @RequestParam(value = "identityCard",required = false)String identityCard,
            @RequestParam(value = "isValid", required = false) Integer isValid,
            @RequestParam(value = "status", required = false) Long status, @RequestParam(value = "roleId",required = false)Long roleId,
            @RequestParam(value = "deptId",required = false)Long deptId, @RequestParam(value = "pageNo", required = false) Integer pageNo,
            @RequestParam(value = "pageSize", required = false) Integer pageSize) {

        Result<Page<AccountListVo>> result = new Result<Page<AccountListVo>>();
        Page<AccountListVo> page = accountService.findPage(keyWord ,loginName, realName,  accountType,   sex, phone, email,  identityCard, isValid, status,   roleId, deptId, pageNo, pageSize).getModel();
        result.setModel(page);
        return result;
    }

    /**
     * 查询List
     *
     * @param keyWord       关键词
     * @param loginName     登录名
     * @param realName      真实名字
     * @param accountType   账户类型
     * @param sex           性别
     * @param phone         手机号
     * @param email         邮箱
     * @param identityCard  身份证
     * @param status        状态
     * @param roleId        角色id
     * @param deptId        部门id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/list")
    public Result<List<Account>> findList(  @RequestParam(value = "keyWord", required = false) String keyWord, @RequestParam(value = "loginName",required = false) String loginName,
                                            @RequestParam(value = "realName",required = false)String realName, @RequestParam(value = "accountType",required = false)String accountType,
                                            @RequestParam(value = "sex",required = false)Integer sex, @RequestParam(value = "phone",required = false)String phone,
                                            @RequestParam(value = "email",required = false)String email, @RequestParam(value = "identityCard",required = false)String identityCard,
                                            @RequestParam(value = "isValid", required = false) Integer isValid,
                                            @RequestParam(value = "status", required = false) Long status, @RequestParam(value = "roleId",required = false)Long roleId,
                                            @RequestParam(value = "deptId",required = false)Long deptId
                                          ) {

        return accountService.findList(keyWord,  loginName,  realName,accountType,  sex, phone, email,  identityCard, isValid ,  status,   roleId, deptId);
    }

    /**
     * 查询单个
     *
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/get")
    public Result<AccountVo> getById(@RequestParam("id") Long id) {
        Result<AccountVo> res = new Result<AccountVo>();
        res.setResult(1);
        Account account = accountService.getById(id);
        res.setModel(account.model2vo());
        return res;
    }

    /**
     * 删除
     *
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/del")
    public Result delete(@RequestParam("id") Long id) {
        Result result = new Result();
        result =  accountService.delete(id);
        return result;
    }


    /**
     * 设置个人化皮肤
     *
     * @param skin 皮肤属性
     * @return
     */
    @PostMapping("/set/setting")
    public Result<Integer> setSetting(@RequestParam("id") Long id, @RequestParam("skin") String skin) {
        return accountService.setSetting(skin, id);
    }

    /**
     * 获取个人资料，需要登录状态
     *
     * @return
     */
    @RequestMapping(value = "/get/per/data")
    public Result<Account> getPerData(@RequestParam("id") Long id) {
        return accountService.getPerData(id);
    }

    /**
     * 设置头像
     *
     * @return
     */
    @RequestMapping(value = "/set/headpic")
    public Result<Integer> setHeadpic(@RequestParam(value = "id") Long id, @RequestParam(value = "picUrl") String picUrl) {
        return accountService.setHeadpic(id, picUrl);
    }

    /**
     * 设置个人资料
     *
     * @param account
     * @return
     */
    @RequestMapping(value = "/set/per/data")
    public Result<Integer> setPerData(@RequestBody Account account) {
        Result result = new Result();
        result =  accountService.setPerData(account);
        return result;
    }


    /**
     * 系统密码重置
     */
    @RequestMapping(value = "/sys/reset/pwd")
    public Result<Integer> sysResetPwd(@RequestBody Account o) {
        Result result = new Result();
        result =  accountService.sysResetPwd(o);
        return result;
    }

    /**
     * 个人密码重置
     *
     * @param opwd 旧密码
     * @param npwd 新密码
     * @param qpwd 重复密码
     * @param accountId 账户id
     * @param accountName 账户名
     * @return
     */
    @RequestMapping(value = "/pre/reset/pwd")
    public Result<Integer> preResetPwd(@RequestParam("opwd") String opwd,
                              @RequestParam("npwd") String npwd,
                              @RequestParam("qpwd") String qpwd,
                              @RequestParam("accountId") Long accountId,
                              @RequestParam("accountName") String accountName) {
        Result<Integer> result = new Result<Integer>();

        result =  accountService.preResetPwd(opwd, npwd, qpwd, accountId, accountName);
        return result;
    }


    /**
     * 批量删除人员
     *
     * @param chks 人员id
     * @return
     */
    @RequestMapping(value = "/delete/batch/account")
    public Result<Integer> deleteBatchAccount(@RequestParam("chks") String chks) {
        return accountService.deleteBatchAccount(chks);
    }

    /**
     * 登录验证
     * @return
     */
    @RequestMapping(value = "/login")
    public Result<AccountVo> login(@RequestBody JSONObject json){
        Result<AccountVo> result = new Result<AccountVo>();
        AccountVo account  = accountService.findFormatByLoginName(json.getString("loginName")).getModel();
        String password  = json.getString("password");
        if(account==null){
            result.setMes("账户不存在");
            result.setResult(0);
        }else{
            if(StringUtil.empty(password)){
                result.setMes("密码不能为空");
                result.setResult(0);
            }else{
                String validate = MD5Util.encode(password);
                if(!validate.equals(account.getPassword())){
                    result.setMes("密码不正确");
                    result.setResult(0);
                }else{
                    result.setMes("登录成功");
                    result.setResult(1);
                    result.setModel(account);
                }
            }
        }
        return result;
    }

}
