package com.admin.service.account.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.admin.dao.account.AccountDao;
import com.admin.service.account.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.dao.account.DeptDao;
import com.admin.model.account.Dept;
import com.admin.vm.znode.ZNodes;
import com.admin.service.account.DeptService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;
/**
 * 
 * @author wuyy 2017年11月23日 
 *
 */
@Service("DeptService")
@Transactional
public class DeptServiceImpl extends BaseServiceMybatisImpl<Dept, Long> implements DeptService {

    private static Logger logger = LoggerFactory.getLogger(DeptServiceImpl.class);
    
    @Resource
    private DeptDao deptDao;
    @Autowired
    private AccountService accountService;

    @Override
    protected EntityDao<Dept, Long> getEntityDao() {
        return deptDao;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<Page<Dept>> findPage(String keyword, Long pid, String title, Long status, Integer pageNo, Integer pageSize) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyword", keyword);
        map.put("pid", pid);
        map.put("title", title);
        map.put("status",status);

        Result<Page<Dept>> result = new Result<Page<Dept>>();
        Page<Dept> page = deptDao.findPage(map, pageNo, pageSize);
        result.setModel(page);
        return result;
    }

    @Override
    public Result<Integer> findCount(String keyword, Long pid, String title, Long status) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyword", keyword);
        map.put("pid", pid);
        map.put("title", title);
        map.put("status",status);

        Result<Integer> result = new Result<Integer>();
        int count = deptDao.findCount(map);
        result.setModel(count);
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> add(Long pid, String title, String descn) {
        Result<Integer> res = new Result<Integer>();
        //判断修改的部门名称是否存在
        int count = this.findCount(null, null, title, null).getModel();
        if(count>0){
            res.setResult(0);
            res.setMes("部门名称已存在");
            return res;
        }else{
            Dept dept = new Dept();
            dept.setPid(pid);
            dept.setTitle(title);
            dept.setDescn(descn);
            dept.setCreateTime(new Date());
            dept.setModifyTime(dept.getCreateTime());

            //添加数据
            deptDao.save(dept);
            res.setResult(1);
            res.setMes("添加成功");
            return res;
        }
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> update(Long id, Long pid, String title, Integer isValid, String descn, Long sort) {
        Result<Integer> res = new Result<Integer>();
        //更新对象存在check
        Dept dt = this.getById(id);

        if (dt == null) {
            res.setResult(0);
            res.setMes("数据不存在");
            return res;
        }else{
            //判断修改的部门名称是否存在
            int count = this.findCount(null, null, title, null).getModel();
            if(!dt.getTitle().equals(title)&&count>0){
                res.setResult(0);
                res.setMes("部门名称已存在");
                return res;
            }else{
                Dept dept = new Dept();
                dept.setId(id);
                dept.setPid(pid);
                dept.setTitle(title);
                dept.setIsValid(isValid);
                dept.setDescn(descn);
                dept.setSort(sort);
                dept.setModifyTime(new Date());

                deptDao.update(dept);
                res.setMes("更新成功");
                return res;
            }
        }
    }


    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> delete(Long id) {
        Result<Integer> res = new Result<Integer>();

        Dept dept = deptDao.getById(id);
        if (dept == null) {
            res.setResult(0);
            res.setMes("数据不存在");
            return res;
        } else {
            Integer deptCount = this.findCount(null, id, null, null).getModel();//部门子集
            //账户子集
            Integer accountCount = accountService.findCount(null, null, null, null, null, null, null, null, null,null, null, id).getModel();

            if((deptCount!=null&&deptCount>0)||(accountCount!=null&&accountCount>0)){
                res.setResult(0);
                res.setMes("无法删除含有子集的数据");
                return res;
            }else{
                deptDao.deleteById(id);
                res.setMes("物理删除成功");
                return res;
            }
        }

    }


    @Override
    @Cacheable(value = "admin")
    public List<ZNodes> getDept(String keyword) {
    	Map<String, Object> map = new HashMap<>();
    	map.put("keyword",keyword);
        List<ZNodes>  deptList = deptDao.getDept(map);
        return deptList;
    }

}
