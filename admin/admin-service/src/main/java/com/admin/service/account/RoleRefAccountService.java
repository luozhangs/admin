package com.admin.service.account;

import com.admin.model.account.RoleRefAccount;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Page;

import java.util.Date;
import java.util.List;

/**
 * Title: RolesService
 * Description:
 * @author 张掌
 * @date 2017/11/10 15:11
 */

public interface RoleRefAccountService extends BaseServiceMybatis<RoleRefAccount, Long>{

    /**
     * 分页查询
     * @Title: findPage
     * @author 张掌
     * @date 2017/11/10 11:07
     * @param id 主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @param pageNo  页码
     * @param pageSize
     * @return com.maxx.base.util.Page<com.admin.model.account.RoleRefAccount>
     */
    public Page<RoleRefAccount> findPage(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Integer pageNo, Integer pageSize);

    /**
     *
     * @Title: findList
     * @author 张掌
     * @date 2017/11/10 11:11
     * @param id 主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @return java.util.List<com.admin.model.account.RoleRefAccount>
     */
    public List<RoleRefAccount> findList(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status);

    /**
     *
     * @Title: findCount
     * @author 张掌
     * @date 2017/11/10 11:12
     * @param id 主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @return java.lang.Integer
     */
    public Integer findCount(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status);

    /**
     *
     * @Title: save
     * @author 张掌
     * @date 2017/11/10 11:12
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @param startTimee  开始时间
     * @param endTimee  结束时间
     * @return java.lang.Integer
     */
    public Integer save(Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Date createTime, Date modifyTime);

    /**
     *
     * @Title: update
     * @author 张掌
     * @date 2017/11/10 11:12
     * @param id  主键
     * @param roleId  角色id
     * @param accountId 账户id
     * @param isDelete  逻辑删除状态
     * @param status 状态
     * @param startTimee  开始时间
     * @param endTimee  结束时间
     * @return java.lang.Integer
     */
    public Integer update(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Date createTime, Date modifyTime);

    /**
     * 逻辑删除
     * @param id
     * @param isDelete
     * @return
     */
    public int delete(Long id, Integer isDelete);
}
