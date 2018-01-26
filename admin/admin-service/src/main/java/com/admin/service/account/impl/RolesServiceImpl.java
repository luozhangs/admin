package com.admin.service.account.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.admin.dao.account.AccountDao;
import com.admin.model.account.*;
import com.admin.service.account.AccountService;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.util.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.admin.dao.account.RolesDao;
import com.admin.service.account.RolesService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Page;
import com.maxx.base.util.StringUtil;

/**
 * Title: RolesServiceImpl
 * Description:
 *
 * @author 张掌
 */
@Service("rolesService")
public class RolesServiceImpl extends BaseServiceMybatisImpl<Roles, Long> implements RolesService {
    
    private static Logger logger = LoggerFactory.getLogger(RolesServiceImpl.class);
    
    @Autowired
    private RolesDao rolesDao;
    @Autowired
    private AccountService accountService;

    @Override
    @Cacheable(value = "admin")
    public Result<Page<Roles>> findPage(String keyWord, Long pid, String title,  Long status, Integer isValid,  Integer pageNo, Integer pageSize){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyWord", keyWord);
        map.put("pid", pid);
        map.put("title", title);
        map.put("status", status);
        map.put("isValid", isValid);

        Result<Page<Roles>> result = new  Result<Page<Roles>>();
        Page<Roles> page = rolesDao.findPage(map, pageNo, pageSize);
        result.setModel(page);
        return result;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<List<Roles>> findList(String keyWord, Long pid, String title,  Long status,Integer isValid){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyWord", keyWord);
        map.put("pid", pid);
        map.put("title", title);
        map.put("status", status);
        map.put("isValid", isValid);
        Result<List<Roles>> res = new Result<>();
        res.setModel(rolesDao.findList(map));
        return res;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<Integer> findCount(String keyWord, Long pid, String title,  Long status,Integer isValid){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyWord", keyWord);
        map.put("pid", pid);
        map.put("title", title);
        map.put("status", status);
        map.put("isValid", isValid);
        Result<Integer> res = new Result<Integer>();
        res.setModel(rolesDao.findCount(map));
        return res;
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> save(Long id, Long pid, String title, String descn, Integer isValid, Long sort) {
        Result<Integer> res = new Result<Integer>();
        //判断为添加操作
        Roles roles = new Roles();
        roles.setPid(pid);
        roles.setTitle(title);
        roles.setDescn(descn);
        roles.setSort(sort);

        if(id==null){
            //添加
            roles.setCreateTime(new Date());
            roles.setModifyTime(roles.getCreateTime());
            //判断角色是否存在
            int count = this.findCount(null, null, title, null, null).getModel();
            if(count>0){
                res.setResult(0);
                res.setMes("角色名已存在");
                return res;
            }else{
                rolesDao.save(roles);
                res.setMes("角色添加成功");
                return res;
            }
        }else{
            Roles roles1 = rolesDao.getById(id);
            if(roles1!=null){
                roles.setId(id);
                roles.setIsValid(isValid);
                roles.setModifyTime(new Date());

                int count = this.findCount(null, null, title, null, null).getModel();
                //判断名称是否被修改，如果没有被修改，则可以更新，如果被修改，判断修改后的名称数据库中是否存在
                if(!roles1.getTitle().equals(title)&&count>0){
                    res.setResult(0);
                    res.setMes("角色名已存在");
                    return res;
                }else{
                    rolesDao.update(roles);
                    res.setMes("角色修改成功");
                    return res;
                }
            }else{
                res.setResult(0);
                res.setMes("数据不存在");
            }
        }
        return res;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> delete(Long id) {
        Result<Integer> res = new Result<Integer>();

        //物理删除
        //判断角色是否被使用
        int count = accountService.findCount(null, null, null, null, null, null, null, null,  null,null, id, null).getModel();
        if(count>0){
            res.setResult(0);
            res.setMes("该角色被使用中不能被物理删除");
        }else{
            rolesDao.deleteById(id);
            rolesDao.delAuthorizedByRoleId(id);
            res.setMes("物理删除成功");
        }

        return res;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<List<ZNodes>> listAuthorized(Long roleId) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("roleId", roleId);

        Result<List<ZNodes>> nodes = new Result<List<ZNodes>>();
        nodes.setModel(rolesDao.listAuthorized(map));
        return nodes;
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> saveAuthorized(Long roleId, String aus, Integer layer) {
        List<ResourcesRole> roleAuth = new ArrayList<ResourcesRole>();
        String[] auss = aus.split(",");
        for (String s : auss) {
            if (!StringUtil.empty(s))
                roleAuth.add(new ResourcesRole(roleId, Long.parseLong(s)));
        }
        rolesDao.delAuthorizedByRoleId(roleId);
        if (roleAuth.size() > 0) rolesDao.insertAuthorizedByRoleId(roleAuth);
        Result<Integer> res = new Result<Integer>();
        res.setMes("授权成功");
        return res;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> deleteBatch(List<Roles> roles) {
        //进行事务删除，删除角色还删除角色资源关系表
        int result = rolesDao.deleteBatch(roles);
        rolesDao.deleteBatchAuthorizedByRoleId(roles);
        Result<Integer> res = new Result<Integer>();
        res.setMes("物理删除成功");
        return res;
    }


    @Override
    protected EntityDao getEntityDao() {
        return rolesDao;
    }


}
