package com.admin.dao.account;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.model.account.Resources;
import com.admin.model.account.ResourcesRole;
import com.maxx.base.mybatis.BaseMybatisDao;
import com.maxx.base.util.Page;
/**
 * 
 * Title: ResourcesRefRoleDao
 * Description: 
 * @author wkq
 * @date 2017年11月14日 上午9:24:42
 */
@Repository("resourcesRefRoleDao")
public class ResourcesRefRoleDao extends BaseMybatisDao<ResourcesRole, Long> {
	
	
	@Override
	public String getMybatisMapperNamesapce() {
		return "com.admin.mapper.account.ResourceRefRoleMapper";
	}
	
	public Page<ResourcesRole> findPage(Map<String, Object> map, Integer pageNo, Integer pageSize) {
		Page<ResourcesRole> page = new Page<ResourcesRole>(pageNo,pageSize);
		return this.selectPage(page, this.getMybatisMapperNamesapce()+".findList", map);
	}

	public Integer findCount(Map<String, Object> map) {
		Integer count = this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".findListCount",map);
		return count;
	}

}