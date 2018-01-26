package com.admin.service.account;

import com.admin.model.account.ResourcesRole;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;

import java.util.List;

/**
 * 
 * Title: ResourcesRefRoleService
 * Description: 
 * @author wkq
 * @date 2017年11月14日 上午9:24:15
 */
public interface ResourcesRefRoleService extends BaseServiceMybatis<ResourcesRole, Long>{

	/**
	 * 
	 * Title: findPage
	 * @author wkq
	 * @date 2017年11月10日 下午8:44:05
	 *
	 * @param roleId			角色ID
	 * @param resourcesId		权限ID
	 * @param status			状态
	 * @param pageNo			总的页数
	 * @param pageSize			每页的数量
	 * @return Page<ResourcesRole>
	 */
	public Result<Page<ResourcesRole>> findPage(Long roleId, Long resourcesId, Long status,  Integer pageNo, Integer pageSize);


	/**
	 *
	 * Title: findCount
	 * @author wkq
	 * @date 2017年11月10日 下午8:51:45
	 *
	 * @param roleId
	 * @param resourcesId
	 * @param status
	 * @return Integer
	 */
	public Result<Integer> findCount(Long roleId, Long resourcesId,  Long status);


	/**
	 * 
	 * Title: add
	 * @author wkq
	 * @date 2017年11月10日 下午8:50:16
	 * 
	 * @param roleId
	 * @param resourcesId
	 * @param status
	 * @return Result<ResourcesRole>
	 */
	public Result<Integer> add(Long roleId, Long resourcesId,  Long status);

	/**
	 * 
	 * Title: update
	 * @author wkq
	 * @date 2017年11月10日 下午8:50:21
	 * 
	 * @param roleId
	 * @param resourcesId
	 * @return Result<ResourcesRole>
	 */
	public Result<Integer> update(Long id,Long roleId, Long resourcesId,  Long sort);

	/**
	 * 
	 * Title: delete
	 * @author wkq
	 * @date 2017年11月10日 下午8:50:29
	 * 
	 * @param id
	 * @return Result<ResourcesRole>
	 */
	public Result<Integer> delete(Long id);


}
