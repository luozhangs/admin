package com.admin.service.account;

import java.util.List;

import com.admin.model.account.Dept;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;
/**
 * 
 * @author wuyy 2017年11月22日 
 *
 */
public interface DeptService extends BaseServiceMybatis<Dept, Long>{
	

	/**
	 * 
	 * @Title: findPage
	 * @author wyy
	 * @date 2017年11月22日 下午8:58:49
	 * @param keyword  关键词
	 * @param pid		父级id
	 * @param title	部门名称
	 * @param status	状态
	 * @param pageNo	页码
	 * @param pageSize	每页大小
	 * @return Page<Dept>
	 */
	public Result<Page<Dept>> findPage(String keyword, Long pid, String title, Long status, Integer pageNo, Integer pageSize);

	/**
	 *
	 * @Title: findCount
	 * @author wyy
	 * @date 2017年11月22日 下午8:58:49
	 * @param keyword  关键词
	 * @param pid		父级id
	 * @param title	部门名称
	 * @param status	状态
	 * @return Result<Integer>
	 */
	public Result<Integer> findCount(String keyword, Long pid, String title, Long status);


	/**
	 * 
	 * @Title: add
	 * @author wyy
	 * @date 2017年11月22日 下午8:59:46
	 * 
	 * @param pid		父级id
	 * @param title	部门名称
	 * @param descn	描述
	 * @return Result<Integer>
	 */
	public Result<Integer> add(Long pid, String title, String descn);


	/**
	 * 
	 * @Title: update
	 * @author wyy
	 * @date 2017年11月22日 下午8:59:51
	 * @param id		主键
	 * @param pid		父级id
	 * @param title	部门名称
	 * @param isValid	是否有效
	 * @param descn	描述
	 * @param sort		排序
	 * @return Result<Integer>
	 */
	public Result<Integer> update(Long id, Long pid, String title, Integer isValid, String descn, Long sort);


    /**
     * 
     * @Title: 逻辑删除
     * @author wyy
     * @date 2017年11月22日 下午9:00:02
     * @param id
     * @return Result<Dept>
     */
	public Result<Integer> delete(Long id);

	
	/**
     * 菜单树
     * @return
     */
    public List<ZNodes> getDept(String keyword);

}
