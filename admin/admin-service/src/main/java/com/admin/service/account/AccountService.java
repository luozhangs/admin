package com.admin.service.account;

import com.admin.model.account.Account;
import com.admin.vm.account.AccountListVo;
import com.admin.vm.account.AccountVo;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;

import java.util.List;

/**
 * Title: AccountService
 * Description: 账户数据service接口
 * @author 张掌
 * @date 2017/11/10 10:34
 */

public interface AccountService extends BaseServiceMybatis<Account, Long> {


    /**
     * 分页查询
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
     * @param pageSize      页码大小
     * @return
     */
    public Result<Page<AccountListVo>> findPage(String keyWord,  String loginName, String realName, String accountType,  Integer sex, String phone, String email, String identityCard, Integer isValid,  Long status,  Long roleId, Long deptId, Integer pageNo, Integer pageSize );

    /**
     *  列表查询全部
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
     * @return
     */
    public Result<List<Account>> findList(String keyWord,  String loginName, String realName, String accountType,  Integer sex, String phone, String email, String identityCard, Integer isValid, Long status, Long roleId, Long deptId);

    /**
     * 查询总数
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
     * @return
     */
    public Result<Integer> findCount(String keyWord, String loginName, String realName, String accountType, Integer sex, String phone, String email, String identityCard, Integer isValid, Long status,  Long roleId, Long deptId);

    /**
     * 添加
     * @param loginName     登录名
     * @param realName      真实名字
     * @param descn         描述
     * @param sex           性别
     * @param phone         手机号
     * @param email         邮箱
     * @param roleId        角色id
     * @param deptId        部门id
     * @return
     */
    public Result<Integer> add(String loginName, String realName, String descn, Integer sex, String phone, String email, Long roleId, Long deptId);

    /**
     * 更新
     * @param loginName     登录名
     * @param realName      真实名字
     * @param descn         描述
     * @param picUrl        头像
     * @param skin          皮肤
     * @param sex           性别
     * @param phone         手机号
     * @param email         邮箱
     * @param identityCard  身份证
     * @param sort          排序
     * @param roleId        角色id
     * @param deptId        部门id
     * @return
     */
    public Result<Integer> update(Long id, String loginName, String realName, String descn, String picUrl, String skin, Integer sex, String phone, String email, String identityCard, Long sort, Long roleId, Long deptId, Integer isValid);

    /**
     * 逻辑删除
     * @param id
     * @return
     */
    public Result<Integer> delete(Long id);

    /**
     * 根据登录帐号查找loginName和accountType，正常只有一条数据
     * and a.isDelete='0' and a.account_type='1'需要该条件
     * @param loginName
     * @return
     */
    public Result<AccountVo> findFormatByLoginName(String loginName);
    /**
     * 设置个人化皮肤
     * @param skin 皮肤属性
     * @return
     */
    public Result<Integer> setSetting(String skin, Long id);
    /**
     * 获取个人资料，需要登录状态
     * @return
     */
    public Result<Account> getPerData(Long id);
    /**
     * 设置头像
     * @param
     * @return
     */
    public Result<Integer> setHeadpic(Long id, String picUrl);
    /**
     * 设置个人资料
     * @param account
     * @return
     */
    public Result<Integer> setPerData(Account account);


    /**
     * 系统密码重置
     * @param o
     * @return
     */
    public Result<Integer> sysResetPwd(Account o);
    /**
     * 个人密码重置
     * @return
     */
    public Result<Integer> preResetPwd(String opwd, String npwd, String qpwd, Long accountId, String loginName);

    /**
     * 批量删除人员
     * @param chks 人员id
     * @return
     */
    public Result<Integer> deleteBatchAccount(String chks);


    /**
     * 修改密码
     */
    public Result<Integer> updatePwd(Long accountId, String pwd);


}
