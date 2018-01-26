package com.admin.service.account.impl;


import java.util.*;

import javax.annotation.Resource;

import com.admin.model.account.Account;
import com.admin.model.account.Roles;
import com.admin.service.account.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.admin.dao.account.ResourcesDao;
import com.admin.model.account.Resources;
import com.admin.vm.znode.ZNodes;
import com.admin.service.account.ResourcesService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Result;

/**
 * Title: ResourcesServiceImpl
 * Description:
 *
 * @author wkq
 */
@Service("resourcesService")
@Transactional
public class ResourcesServiceImpl extends BaseServiceMybatisImpl<Resources, Long> implements ResourcesService {

    private Logger logger = LoggerFactory.getLogger(ResourcesServiceImpl.class);

    @Resource
    private ResourcesDao resourcesDao;

    @Autowired
    protected AccountService accountService;

    @Override
    protected EntityDao<Resources, Long> getEntityDao() {
        return resourcesDao;
    }


    /**
     * Title: findCount
     *
     */
    @Override
    @Cacheable(value = "admin")
    public Result<Integer> findCount(String keyWord,  String name, Long pid, Long type, String resUrl, String btnType) {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyWord", keyWord);
        map.put("name", name);
        map.put("pid", pid);
        map.put("resUrl", resUrl);
        map.put("type", type);
        map.put("btnType", btnType);

        Result<Integer> result = new Result<Integer>();
        int count = resourcesDao.findCount(map);
        result.setModel(count);
        return result;
    }

    /**
     * Title: add
     *
     */
    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Resources> save(Long id, String name, Long pid, Long type, String resUrl, String btnType, String icon, Long sort, String descn, Integer isValid) {
        Result<Resources> result = new Result<Resources>();

        Resources resources = new Resources();
        resources.setName(name);
        resources.setPid(pid);
        resources.setType(type);
        resources.setResUrl(resUrl);
        resources.setBtnType(btnType);
        resources.setIcon(icon);
        resources.setSort(sort);
        resources.setDescn(descn);

        if(id==null){//id为null判断为添加操作
            //当资源为目录时，可以不设置路由，不需要判断
            if(pid==null||pid==0||resUrl==null||"".equals(resUrl)){
                resources.setCreateTime(new Date());
                resources.setModifyTime(resources.getCreateTime());

                resourcesDao.save(resources);
                result.setMes("资源添加成功");
            }else{

                int cnt = this.findCount(null, null, null, null, null, resUrl).getModel();

                if(cnt>0){
                    result.setResult(0);
                    result.setMes("资源已存在");
                }else{
                    resourcesDao.save(resources);
                    result.setMes("资源添加成功");
                }
            }
        }else{
            //不为null时判断数据库中是否存在数据,存在时更新操作，不存在执行添加操作
            Resources resources1 = resourcesDao.getById(id);

            if(resources1==null){
                //执行添加操作
                //当资源为目录时，可以不设置路由，不需要判断
                if(pid==null||pid==0||resUrl==null||"".equals(resUrl)){
                    resources.setCreateTime(new Date());
                    resources.setModifyTime(resources.getCreateTime());

                    resourcesDao.save(resources);
                    result.setMes("资源添加成功");
                }else{

                    int cnt = this.findCount(null, null, null, null, null, resUrl).getModel();

                    if(cnt>0){
                        result.setResult(0);
                        result.setMes("资源已存在");
                    }else{
                        resourcesDao.save(resources);
                        result.setMes("资源添加成功");
                    }
                }
            }else{
                //执行更新操作
                resources.setId(id);
                resources.setIsValid(isValid);
                resources.setModifyTime(new Date());

                resourcesDao.update(resources);
                result.setMes("资源更新成功");

            }
        }
        Resources resources1 = this.getById(resources.getId());
        result.setModel(resources1);
        return result;
    }

    /**
     * Title: delete
     *
     */
    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> delete(Long id) {

        Result<Integer> res = new Result<Integer>();

        Resources resources = resourcesDao.getById(id);
        if (resources == null) {
            res.setResult(0);
            res.setMes("数据不存在");
            return res;
        } else {
            Integer count = resourcesDao.childCount(resources.getId());
            if(count>0){
                res.setResult(0);
                res.setMes("该资源包含子资源");
            }else{
                resourcesDao.delRoleAuthByResId(id);//根据资源Id删除所有权限关系
                resourcesDao.deleteById(id);
                res.setMes("删除成功！");
            }
            return res;
        }
    }

    /**
     * 菜单树
     * Title: findMenuTree
     *
     * @param accountId
     * @return
     */
    @Override
    @Cacheable(value = "admin")
    public List<Resources> showAuthorization(Long accountId,   String resUrl) {
        Map<String, Object> map = new HashMap<String, Object>();
        Account account = accountService.getById(accountId);
        if(account != null && account.getRoleId()==1){
            map.put("accountId",1);
        }else{
            map.put("accountId", accountId);
        }
        map.put("resUrl", resUrl);

        List<Resources> list = resourcesDao.findMenuTree(map);

        return list;
    }


    /**
     * 按钮列
     * Title: findBtn
     *
     * @param type
     * @param menuId
     * @param accountId
     * @return
     */
    @Cacheable(value = "admin")
    public Result<List<Resources>> findBtn(Long type, Long menuId, Long accountId) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("type", type);
        map.put("menuId", menuId);
        Account account = accountService.getById(accountId);
        if(account != null && account.getRoleId()==1){
            map.put("accountId",1);
        }else{
            map.put("accountId", accountId);
        }

        Result<List<Resources>> result = new Result<List<Resources>>();
        List<Resources> list = resourcesDao.findBtn(map);
        result.setModel(list);
        return result;
    }


    /**
     * 资源列表只含菜单不含按钮
     * Title: listResources
     */
    @Override
    @Cacheable(value = "admin")
    public Result<List<ZNodes>> listResources() {
        List<ZNodes> zNodesList = resourcesDao.listResources();
        Result<List<ZNodes>> result = new Result<List<ZNodes>>();
        result.setModel(zNodesList);
        return result;
    }


    /**
     * 用户权限资源列表
     * Title: resAuthorized
     *
     */
    @Override
    @Cacheable(value = "admin")
    public List<Resources> resAuthorized(Long accountId, Long type) {
        Map<String, Object> map = new HashMap<String, Object>();
        Account account = accountService.getById(accountId);
        if(account != null && account.getRoleId()==1){
            map.put("accountId",1);
        }else{
            map.put("accountId", accountId);
        }
        map.put("type", type);
        map.put("pid", 0);//初始是根目录

        List<Resources> list = resourcesDao.resAuthorized(map);
        return getResourcesByPid(list, map);
    }


    //递归查询子目录
    public List<Resources> getResourcesByPid(List<Resources> list, Map<String, Object> map) {
        List<Resources> newlist = new ArrayList<Resources>();

        for (Resources r : list) {
            map.put("pid", r.getId());
            List<Resources> rlist = resourcesDao.resAuthorized(map);
            if (rlist.size() > 0) {
                rlist = getResourcesByPid(rlist, map);
            }
            r.setNodes(rlist);
            newlist.add(r);
        }
        return newlist;
    }


    /**
     * 事务删除资源（批量）
     * Title: tranDeleteBatch
     *
     * @see com.admin.service.account.ResourcesService#tranDeleteBatch(java.util.List)
     */
    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> tranDeleteBatch(List<Resources> os) {
        Result<Integer> result = new Result<Integer>();
        Integer childCount = resourcesDao.childBatchCount(os);
        if (childCount == 0) {
            resourcesDao.deleteBatch(os);
            resourcesDao.delBatchOrgAuthByResId(os);//删除组织权限
            resourcesDao.delBatchRoleAuthByResId(os);//删除角色权限
            result.setMes("批量删除成功");
        }
        return result;
    }


    @Override
    @Cacheable(value = "admin")
    public List<Resources> findAndson() {
        return resourcesDao.findAndson();
    }
}
