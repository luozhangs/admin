package com.admin.dao.account;

import com.admin.model.account.ResourcesRole;
import com.admin.model.account.Roles;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseMybatisDao;
import com.maxx.base.util.Page;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Title: RolesDao
 * Description: 角色表的dao层
 * @author 张掌
 * @date 2017/11/10 15:04
 */
@Repository("rolesDao")
public class RolesDao extends BaseMybatisDao<Roles, Long>{

    @Override
    public String getMybatisMapperNamesapce() {
        return "com.admin.mapper.account.RolesMapper";
    }

    /**
     * 分页查询
     * @Title: findPage
     * @author 张掌
     * @date 2017/11/10 10:25
     * @param map
     * @param pageNo
     * @param pageSize
     * @return com.maxx.base.util.Page<com.admin.model.account.Roles>
     */
    public Page<Roles> findPage(Map<String, Object> map, Integer pageNo, Integer pageSize){
        Page<Roles> page = new Page<Roles>(pageNo, pageSize);
        return selectPage(page, this.getMybatisMapperNamesapce()+".findList", map);
    }

    /**
     * 条件查询数量
     * @Title: findCount
     * @author 张掌
     * @date 2017/11/10 10:28
     * @param map
     * @return java.lang.Integer
     */
    public Integer findCount(Map<String, Object> map) {
        Integer count = this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".findListCount", map);
        return count;
    }

    /**
     * 条件查询
     * @Title: findList
     * @author 张掌
     * @date 2017/11/10 10:28
     * @param map
     * @return java.util.List<com.admin.model.account.Roles>
     */
    public List<Roles> findList(Map<String, Object> map) {
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".findList", map);
    }

    /**
     * 权限列表包含按钮
     * @param map
     * @return
     */
    public List<ZNodes> listAuthorized(Map<String, Object> map){
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".listAuthorized", map);
    }
    /**
     * 根据角色Id删除所有权限关系
     * @param roleId 角色Id
     * @return
     */
    public void delAuthorizedByRoleId(Long roleId){
        this.getSqlSession().delete(this.getMybatisMapperNamesapce()+".delAuthorizedByRoleId", roleId);
    }
    /**
     * 根据角色Id和显示层级删除权限关系
     * @param roleId 角色Id
     * @param layer 显示层级
     * @return
     */
    public void delAuthorizedByRoleIdAndLayer(Map<String, Object> map){
        this.getSqlSession().delete(this.getMybatisMapperNamesapce()+".delAuthorizedByRoleIdAndLayer", map);
    }
    /**
     * 根据角色Id删除所有权限关系(批量)
     * @param os 角色Id集合
     * @return
     */
    public void deleteBatchAuthorizedByRoleId(List<Roles> os){
        this.getSqlSession().delete(this.getMybatisMapperNamesapce()+".deleteBatchAuthorizedByRoleId", os);
    }
    /**
     * 通过角色资源对象列表建立权限关系(批量插入)
     * @param  list 角色资源对象列表
     * @return
     */
    public void insertAuthorizedByRoleId(List<ResourcesRole> list){
        this.getSqlSession().insert(this.getMybatisMapperNamesapce()+".insertAuthorizedByRoleId", list);
    }

    /**
     * 批量删除
     * @param os
     * @return
     */
    public int deleteBatch(List<Roles> os){
        this.getSqlSession().delete(this.getMybatisMapperNamesapce()+".deleteBatch", os);
        return 1;
    }

}
