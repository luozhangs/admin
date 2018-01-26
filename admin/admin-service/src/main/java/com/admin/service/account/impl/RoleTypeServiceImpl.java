package com.admin.service.account.impl;

import com.admin.dao.account.RoleTypeDao;
import com.admin.dao.account.RolesDao;
import com.admin.model.account.RoleType;
import com.admin.service.account.RolesService;
import com.admin.vm.znode.ZNodes;
import com.admin.service.account.RoleTypeService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Title: RoleTypeServiceImpl
 * Description:
 * @author zz
 * @date 2017/11/23 10:35
 */

@Service("roleTypeSercice")
public class RoleTypeServiceImpl extends BaseServiceMybatisImpl<RoleType,Long> implements RoleTypeService {

    private static Logger logger = LoggerFactory.getLogger(RoleTypeServiceImpl.class);

    @Autowired
    private RoleTypeDao roleTypeDao;
    @Autowired
    private RolesService rolesService;

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> add(Long pid, String title, String descn) {
        Result<Integer> res = new Result<Integer>();

        RoleType type = new RoleType();
        type.setPid(pid);
        type.setTitle(title);
        type.setDescn(descn);
        type.setCreateTime(new Date());
        type.setModifyTime(type.getCreateTime());

        roleTypeDao.save(type);
        res.setResult(1);
        res.setMes("角色类型添加成功");
        return res;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> update(Long id, Long pid, String title, String descn, Integer isValid, Long sort) {
        RoleType type = new RoleType();
        type.setId(id);
        type.setPid(pid);
        type.setTitle(title);
        type.setDescn(descn);
        type.setIsValid(isValid);
        type.setSort(sort);
        type.setModifyTime(new Date());

        Result<Integer> res = new Result<Integer>();
        roleTypeDao.update(type);
        res.setResult(1);
        res.setMes("角色类型更新成功");
        return res;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<List<RoleType>> findList(String keyword,  Long pid, String title, Long status) {
        Result<List<RoleType>> res = new Result<List<RoleType>>();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("pid", pid);
        map.put("title", title);
        map.put("status", status);
        map.put("keyword", keyword);

        List<RoleType> list = roleTypeDao.findList(map);
        res.setModel(list);
        res.setResult(1);
        return res;
    }

    @Override
    @Cacheable(value = "admin")
    public List<ZNodes> findTree(String keyword) {
        return roleTypeDao.findTree(keyword);
    }

    @Override
    @Cacheable(value = "admin")
    public Result<List<ZNodes>> findRoleTree() {
        Result<List<ZNodes>> res = new Result<List<ZNodes>>();
        List<ZNodes> list = roleTypeDao.findRoleTree();
        res.setModel(list);
        res.setResult(1);
        return res;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> delete(Long id) {
        Result<Integer> res = new Result<Integer>();
       
        //判断是否有子节点\
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("pid", id);
        int typeCount = roleTypeDao.findCount(map);
        int roleCount = rolesService.findCount(null, id, null, null, null).getModel();
        if(typeCount!=0||roleCount!=0){
            res.setResult(0);
            res.setMes("请先删除子节点");
        }else{
            roleTypeDao.deleteById(id);
            res.setResult(1);
            res.setMes("物理删除成功");
        }
      
        return res;
    }
    @Override
    protected EntityDao getEntityDao() {
        return roleTypeDao;
    }
}
