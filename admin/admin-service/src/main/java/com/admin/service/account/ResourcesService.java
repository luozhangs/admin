package com.admin.service.account;

import java.util.List;

import com.admin.model.account.Resources;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Result;

/**
 * 
 * Title: ResourcesService Description:
 * 
 * @author wkq
 * @date 2017年11月10日 上午11:13:37
 */
public interface ResourcesService extends BaseServiceMybatis<Resources, Long> {

	/**
	 * 添加修改合一
	 * @param id 		主键
	 * @param name		名称
	 * @param pid		父级id
	 * @param type		类型
	 * @param resUrl	路由
	 * @param btnType	按钮类型
	 * @param icon		图标
	 * @param sort		排序
	 * @param descn	描述
	 * @return Result<Resources>
	 */
	public Result<Resources> save(Long id, String name, Long pid, Long type, String resUrl, String btnType, String icon, Long sort, String descn, Integer isValid);


	/**
	 * 查询数量
	 * @param keyWord 关键词
	 * @param name		名称
	 * @param pid		父级id
	 * @param type		类型
	 * @param resUrl	路由
	 * @param btnType	按钮类型
	 * @return
	 */
	public Result<Integer> findCount(String keyWord, String name, Long pid, Long type, String resUrl, String btnType);

	/**
	 * 
	 * Title: delete
	 * @author wkq
	 * @date 2017年11月10日 下午5:38:42
	 * @param id
	 * @return Result<Resources>
	 */
	public Result<Integer> delete(Long id);

	/**
	 * 查询用户权限
	 * @Title:
	 * @author zz
	 * @date 2017/12/5 11:12
	 * @param
	 * @return 
	 */
	 public List<Resources> showAuthorization(Long accountId, String resUrl);

	/**
	 * 查询按钮列
	 * @param type		权限类型
	 * @param menuId	按钮父级id
	 * @param accountId	用户id
	 * @return
	 */
	public Result<List<Resources>> findBtn(Long type, Long menuId, Long accountId);

	/**
	 * 资源列表只含菜单不含按钮（树）
	 * @return
	 */
	public Result<List<ZNodes>> listResources();

	/**
	 * 用户权限资源列表（目录）
	 * @param accountId
	 * @param type
	 * @return
	 */
	public List<Resources> resAuthorized(Long accountId, Long type);



	/**
	 * 事务删除资源（批量）
	 * @param os
	 * @return
	 */
	public Result<Integer> tranDeleteBatch(List<Resources> os);

	 /**
	  * 查看全部资源
	  * @Title:
	  * @author zz
	  * @date 2017/12/5 11:14
	  * @return
	  */
	 public List<Resources> findAndson();
}
