package com.admin.dao.account;

import com.admin.model.account.Dept;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseMybatisDao;
import com.maxx.base.util.Page;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Title: DeptDao
 * Description: DeptDao
 * @author wuyy
 * @date 2017/11/22 20:12
 */

@Repository("deptDao")
public class DeptDao extends BaseMybatisDao<Dept, Long>{

    @Override
    public String getMybatisMapperNamesapce() {
        return "com.admin.mapper.account.DeptMapper";
    }

    /**
     * 分页查询
     * @Title: findPage
     * @author wuyy
     * @date 2017/11/22 20:25
     * @param map
     * @param pageNo
     * @param pageSize
     */
    public Page<Dept> findPage(Map<String, Object> map, Integer pageNo, Integer pageSize){
        Page<Dept> page = new Page<Dept>(pageNo, pageSize);
        return selectPage(page, this.getMybatisMapperNamesapce()+".findList", map);
    }

    /**
     * 条件查询
     * @Title: findList
     * @author wuyy
     * @date 2017/11/22 20:28
     * @param map
     */
    public List<Dept> findList(Map<String, Object> map) {
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".findList", map);
    }

    public Integer findCount(Map<String, Object> map){
        return this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".findListCount", map);
    }

    /**
     * 批量删除
     * @param o
     */
    public void deleteBatchDept(List<Dept> o){
        this.getSqlSession().delete(this.getMybatisMapperNamesapce()+".deleteBatchDept", o);
    }
    
    /**
     * 菜单查询（tree）
     * @return
     */
    public List<ZNodes> getDept(Map<String, Object> map){
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".getDept", map);
    }
    /**
     * 
     * @Title: 数据删除
     * @author wyy
     * @date 2017年11月24日 下午4:44:46
     * 
     * @param d
     * @return List<Dept>
     */
    public List<Dept> deleteDept(Dept d){
    	return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".delectDept", d);
    }

}
