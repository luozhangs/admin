package com.admin.dao.account;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.admin.model.account.Resources;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseMybatisDao;
import com.maxx.base.util.Page;
/**
 * 
 * Title: ResourcesDao
 * Description: 
 * @author wkq
 * @date 2017年11月10日 下午2:10:38
 */
@Repository("resourcesDao")
public class ResourcesDao extends BaseMybatisDao<Resources, Long>{

	@Override
	public String getMybatisMapperNamesapce() {
		return "com.admin.mapper.account.ResourcesMapper";
	}
	/**
	 * 分页查询
	 * Title: findPage
	 * @author wkq
	 * @date 2017年11月13日 上午9:15:49
	 * 
	 * @param map
	 * @param pageNo
	 * @param pageSize
	 * @return Page<Resources>
	 */
	public Page<Resources> findPage(Map<String,Object> map,Integer pageNo,Integer pageSize){
		Page<Resources> page = new Page<Resources>(pageNo,pageSize);
		return this.selectPage(page, this.getMybatisMapperNamesapce()+".findList", map);
	}
	/**
	 * 单个查询
	 * Title: findCount
	 * @author wkq
	 * @date 2017年11月13日 上午9:16:03
	 * 
	 * @param map
	 * @return Integer
	 */
	public Integer findCount(Map<String, Object> map) {
		Integer count = this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".findListCount",map);
		return count;
	}
	/**
	 * 菜单树
	 * Title: findMenuTree
	 * @author wkq
	 * @date 2017年11月11日 下午5:14:28
	 * 
	 * @param map
	 * @return List<Resources>
	 */
	public List<Resources> findMenuTree(Map<String,Object> map) {
		return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".findMenu",map);
	}
	/**
	 * 按钮列
	 * Title: findBtn
	 * @author wkq
	 * @date 2017年11月11日 下午5:14:24
	 * 
	 * @param map
	 * @return List<Resources>
	 */
	public List<Resources> findBtn(Map<String, Object> map) {
		return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".findBtn",map);
	}
	/**
	 * 
	 * Title: listResources
	 * @author wkq
	 * @date 2017年11月13日 下午1:54:10
	 *
	 * @return List<ZNodes>
	 */
	public List<ZNodes> listResources() {
		return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".listResources");
	}
	/**用户权限资源列表
	 * 
	 * Title: resAuthorized
	 * @author wkq
	 * @date 2017年11月13日 下午1:54:15
	 *
	 * @return List<Resources>
	 */
	public List<Resources> resAuthorized(Map<String, Object> map) {
		return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".resAuthorized",map);
	}
	
	/**
	 * 获取子资源数量
	 * Title: childCount
	 * @author wkq
	 * @date 2017年11月13日 下午2:21:51
	 * 
	 * @param resId
	 * @return int
	 */
	public Integer childCount(Long resId) {
		return  this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".childCount",resId);
	}

	/**
	 * 根据资源Id删除所有权限关系
	 * Title: delRoleAuthByResId
	 * @author wkq
	 * @date 2017年11月13日 下午2:43:31
	 * 
	 * @param resId void
	 */
	public void delRoleAuthByResId(Long resId) {
		this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".delRoleAuthByResId",resId);
	}
	/**
	 *
	 * Title: delete
	 * @author wkq
	 * @date 2017年11月13日 下午2:43:35
	 * 
	 * @param o void
	 */
	public void delete(Resources o) {
		this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".delete",o);
	}
	/**
	 *	查询
	 * Title: childBatchCount
	 * @author wkq
	 * @date 2017年11月13日 下午8:00:52
	 * 
	 * @param os
	 * @return Integer
	 */
	public Integer childBatchCount(List<Resources> os) {
		Integer count= this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".childBatchCount",os);
		return count;
	}
	/**
	 * 事务删除资源（批量）
	 * Title: deleteBatch
	 * @author wkq
	 * @date 2017年11月13日 下午8:00:57
	 * 
	 * @param os void
	 */
	public void deleteBatch(List<Resources> os) {
		this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".deleteBatch",os);
		
	}
	/**
	 * 删除组织权限
	 * Title: delBatchOrgAuthByResId
	 * @author wkq
	 * @date 2017年11月13日 下午8:01:00
	 * 
	 * @param os void
	 */
	public void delBatchOrgAuthByResId(List<Resources> os) {
		this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".delBatchOrgAuthByResId",os);
	}
	/**
	 * 删除角色权限
	 * Title: delBatchRoleAuthByResId
	 * @author wkq
	 * @date 2017年11月13日 下午8:01:07
	 * 
	 * @param os void
	 */
	public void delBatchRoleAuthByResId(List<Resources> os) {
		this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".delBatchRoleAuthByResId",os);
		
	}
	/**
	 * 获取资源并包括子资源
	 * Title: findAndson
	 * @author wkq
	 * @date 2017年11月13日 下午8:37:34
	 * 
	 * @param o
	 * @return Resources
	 */
	public List<Resources> findAndson() {
		return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".findAndson");
	}
	/**
	 * 获取资源并包括子资源
	 * Title: updateBatchLayer
	 * @author wkq
	 * @date 2017年11月13日 下午8:38:00
	 * 
	 * @param rs
	 * @param valueOf void
	 */
	public void updateBatchLayer(List<Long> rs, String valueOf) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("rs", rs);
		map.put("valueOf", valueOf);
		
		this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".updateBatchLayer",map);
	}
}