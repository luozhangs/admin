package com.admin.service.account;

import com.admin.model.account.RoleType;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Result;

import java.util.List;

/**
 * Title: RoleTypeService
 * Description: 
 * @author zz
 * @date 2017/11/23 10:25
 */

public interface RoleTypeService extends BaseServiceMybatis<RoleType,Long>{
    /**
     *  添加
     * @param pid       父级id
     * @param title     角色类名
     * @param descn     描述
     * @return
     */
    public Result<Integer> add(Long pid, String title, String descn);
    /**
     *  更新
     * @param id        主键
     * @param pid       父级id
     * @param title     角色类名
     * @param descn     描述
     * @param isValid   是否可用
     * @param sort      排序

     * @return
     */
    public Result<Integer> update(Long id, Long pid, String title, String descn, Integer isValid, Long sort);

    /**
     *  查询列表
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @return
     */
    public Result<List<RoleType>> findList(String keyword,  Long pid, String title,  Long status);

    /**
     * 模糊查询角色类型树
     * @param keyword
     * @return
     */
    public List<ZNodes> findTree(String keyword);

    /**
     * 查询全部角色树
     * @return
     */
    public Result<List<ZNodes>> findRoleTree();

    /**
     * 删除
     * @param id
     * @return
     */
    public Result<Integer> delete(Long id);
}
