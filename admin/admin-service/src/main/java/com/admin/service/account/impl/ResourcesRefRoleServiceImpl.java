package com.admin.service.account.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.dao.account.ResourcesRefRoleDao;
import com.admin.model.account.ResourcesRole;
import com.admin.service.account.ResourcesRefRoleService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;
/**
 * 
 * Title: ResourcesRefRoleServiceImpl
 * Description: 
 * @author wkq
 * @date 2017年11月14日 上午9:24:28
 */
@Service("resourcesRefRoleService")
@Transactional
public class ResourcesRefRoleServiceImpl extends BaseServiceMybatisImpl<ResourcesRole, Long> implements ResourcesRefRoleService {

    private static Logger logger = LoggerFactory.getLogger(ResourcesRefRoleServiceImpl.class);

    @Resource
    private ResourcesRefRoleDao resourcesRefRoleDao;

    @Override
    protected EntityDao<ResourcesRole, Long> getEntityDao() {
        return resourcesRefRoleDao;
    }

    @Cacheable(value = "admin")
    public Result<Page<ResourcesRole>> findPage(  Long roleId, Long resourcesId, Long status,   Integer pageNo, Integer pageSize) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("roleId", roleId);
        map.put("resourcesId", resourcesId);
        map.put("status", status);

        Result<Page<ResourcesRole>> result = new Result<Page<ResourcesRole>>();
        Page<ResourcesRole> page = resourcesRefRoleDao.findPage(map, pageNo, pageSize);
        result.setModel(page);
        return result;
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> add(Long roleId, Long resourcesId, Long status) {
        ResourcesRole resRole = new ResourcesRole();
        resRole.setRoleId(roleId);
        resRole.setResourcesId(resourcesId);
        resRole.setStatus(status);
        resRole.setCreateTime(new Date());
        resRole.setModifyTime(resRole.getCreateTime());

        Result<Integer> res = new Result<Integer>();

        int cnt = this.findCount(roleId, resourcesId,  null).getModel();
        if (cnt != 0) {
            res.setResult(0);
            res.setMes("代码值已存在");
            return res;
        }
        //添加数据
        resourcesRefRoleDao.save(resRole);
        res.setMes("添加成功");
        return res;
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> update(Long id, Long roleId, Long resourcesId, Long sort) {

        Result<Integer> res = new Result<Integer>();
        //更新对象存在check

        ResourcesRole rce = this.getById(id);
        if (rce == null) {
            res.setResult(0);
            res.setMes("模块不存在");
            return res;
        }

        //变更代码值已存在
        if (!rce.getRoleId().equals(id)) {
            int cnt = this.findCount(roleId, resourcesId,  null).getModel();
            if (cnt != 0) {
                res.setResult(0);
                res.setMes("代码值已存在");
                return res;
            }
        }

        ResourcesRole resRole = new ResourcesRole();
        resRole.setId(id);
        resRole.setRoleId(roleId);
        resRole.setResourcesId(resourcesId);
        resRole.setModifyTime(new Date());

        resourcesRefRoleDao.update(resRole);
        res.setResult(1);
        res.setMes("更新成功");
        return res;
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> delete(Long id) {
        Result res = new Result();

        ResourcesRole resourcesRole = resourcesRefRoleDao.getById(id);
        if (resourcesRole == null) {
            res.setResult(0);
            res.setMes("数据不存在");
            return res;
        } else {
            resourcesRefRoleDao.deleteById(id);
            res.setMes("删除成功！");
            return res;
        }
    }

    @Override
    @Cacheable(value = "admin")
    public Result<Integer> findCount(Long roleId, Long resourcesId,  Long status) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("roleId", roleId);
        map.put("resourcesId", resourcesId);
        map.put("status", status);

        Result<Integer> result = new Result<Integer>();
        int count = resourcesRefRoleDao.findCount(map);
        result.setModel(count);
        return result;
    }
}
