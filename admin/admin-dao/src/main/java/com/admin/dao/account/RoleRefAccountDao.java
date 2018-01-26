package com.admin.dao.account;


import com.admin.model.account.RoleRefAccount;
import com.maxx.base.mybatis.BaseMybatisDao;
import com.maxx.base.util.Page;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Title: RolesDao
 * Description: 角色账户中间表dao层
 * @author 张掌
 * @date 2017/11/10 15:04
 */
@Repository("roleRefAccountDao")
public class RoleRefAccountDao extends BaseMybatisDao<RoleRefAccount, Long>{

    @Override
    public String getMybatisMapperNamesapce() {
        return "com.admin.mapper.account.RoleRefAccountMapper";
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
    public Page<RoleRefAccount> findPage(Map<String, Object> map, Integer pageNo, Integer pageSize){
        Page<RoleRefAccount> page = new Page<RoleRefAccount>(pageNo, pageSize);
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
    public List<RoleRefAccount> findList(Map<String, Object> map) {
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".findList", map);
    }

    /**
     * 中间查询对象集合
     * @param map
     * @return
     */
    public List<RoleRefAccount> getChilds(Map<String, Object> map){
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".getChilds", map);
    }
}
