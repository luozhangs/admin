package com.admin.dao.account;

import com.admin.model.account.RoleType;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseMybatisDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Title: RoleTypeDao
 * Description:
 * @author zz
 * @date 2017/11/23 10:35
 */

@Repository("roleTypeDao")
public class RoleTypeDao extends BaseMybatisDao<RoleType,Long>{
    @Override
    public String getMybatisMapperNamesapce() {
        return "com.admin.mapper.account.RoleTypeMapper";
    }

    /**
     * 列表查询
     * @param map
     * @return
     */
    public List<RoleType> findList(Map<String, Object> map){
        return this.getSqlSession().selectList(getMybatisMapperNamesapce()+".findList",map);
    }
    /**
     * 类型树查询
     * @param
     * @return
     */
    public List<ZNodes> findTree(String keyword){
        return this.getSqlSession().selectList(getMybatisMapperNamesapce()+".findTree",keyword);
    }

    /**
     * 查询所有角色树
     * @return
     */
    public List<ZNodes> findRoleTree(){
        return this.getSqlSession().selectList(getMybatisMapperNamesapce()+".findRoleTree");
    }

    /**
     * 查询总数
     * @return
     */
    public Integer findCount(Map<String, Object> map){
        return this.getSqlSession().selectOne(getMybatisMapperNamesapce()+".findListCount", map);
    }
}
