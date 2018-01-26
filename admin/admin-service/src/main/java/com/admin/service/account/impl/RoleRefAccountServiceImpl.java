package com.admin.service.account.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.admin.dao.account.RoleRefAccountDao;
import com.admin.model.account.RoleRefAccount;
import com.admin.service.account.RoleRefAccountService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Page;

/**
 * Title: RolesServiceImpl
 * Description:
 *
 * @author 张掌
 */
@Service("roleRefAccountService")
public class RoleRefAccountServiceImpl extends BaseServiceMybatisImpl<RoleRefAccount, Long> implements RoleRefAccountService {
    private static Logger logger = LoggerFactory.getLogger(RoleRefAccountServiceImpl.class);
    @Autowired
    private RoleRefAccountDao roleRefAccountDao;

    @Override
    @Cacheable(value = "admin")
    public Page<RoleRefAccount> findPage(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Integer pageNo, Integer pageSize) {
        Map<String, Object> map = setMap(id, roleId, accountId, isDelete, sortWeight, status, null, null);
        return roleRefAccountDao.findPage(map, pageNo, pageSize);
    }

    @Override
    @Cacheable(value = "admin")
    public List<RoleRefAccount> findList(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status) {
        Map<String, Object> map = setMap(id, roleId, accountId, isDelete, sortWeight, status, null, null);
        return roleRefAccountDao.findList(map);
    }

    @Override
    @Cacheable(value = "admin")
    public Integer findCount(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status) {
        Map<String, Object> map = setMap(id, roleId, accountId, isDelete, sortWeight, status, null, null);
        return roleRefAccountDao.findCount(map);
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Integer save(Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Date createTime, Date modifyTime) {
        RoleRefAccount roles = setRoles(null, roleId, accountId, isDelete, sortWeight, status, createTime, modifyTime);
        roleRefAccountDao.save(roles);
        return 1;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Integer update(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Date createTime, Date modifyTime) {
        RoleRefAccount roles = setRoles(id, roleId, accountId, isDelete, sortWeight, status, createTime, modifyTime);
        roleRefAccountDao.update(roles);
        return 1;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public int delete(Long id, Integer isDelete) {
        RoleRefAccount roleRefAccount = new RoleRefAccount();
        roleRefAccount.setIsDelete(isDelete);
        roleRefAccount.setId(id);
        roleRefAccountDao.update(roleRefAccount);
        return 1;
    }

    @Override
    protected EntityDao getEntityDao() {
        return roleRefAccountDao;
    }

    Map<String, Object> setMap(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Date createTime, Date modifyTime) {
        Map map = new HashMap();
        map.put("id", id);
        map.put("accountId", accountId);
        map.put("roleId", roleId);
        map.put("isDelete", isDelete);
        map.put("sortWeight", sortWeight);
        map.put("status", status);
        map.put("createTime", createTime);
        map.put("modifyTime", modifyTime);
        return map;
    }

    RoleRefAccount setRoles(Long id, Long roleId, Long accountId, Integer isDelete, Long sortWeight, Long status, Date createTime, Date modifyTime) {
        RoleRefAccount roles = new RoleRefAccount();
        roles.setId(id);
        roles.setRoleId(roleId);
        roles.setAccountId(accountId);
        roles.setIsDelete(isDelete);
        roles.setSortWeight(sortWeight);
        roles.setStatus(status);
        roles.setCreateTime(createTime);
        roles.setModifyTime(modifyTime);
        return roles;
    }
}
