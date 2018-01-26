package com.admin.service.account;

import com.admin.model.account.Roles;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.mybatis.BaseServiceMybatis;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;

import java.util.List;


/**
 * Title: RolesService
 * Description:角色表service层
 * @author 张掌
 * @date 2017/11/10 15:11
 */

public interface RolesService extends BaseServiceMybatis<Roles, Long>{

    /**
     * 分页查询
     * @Title: findPage
     * @author 张掌
     * @date 2017/11/10 11:07
     * @param keyWord   关键词
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @param pageNo      页码
     * @param pageSize
     * @return com.maxx.base.util.Page<com.admin.model.account.Roles>
     */
    public Result<Page<Roles>> findPage(String keyWord, Long pid, String title,  Long status, Integer isValid,  Integer pageNo, Integer pageSize );

    /**
     *
     * @Title: findList
     * @author 张掌
     * @date 2017/11/10 11:11
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @return java.util.List<com.admin.model.account.Roles>
     */
    public Result<List<Roles>> findList(String keyWord, Long pid, String title, Long status, Integer isValid);

    /**
     *
     * @Title: findCount
     * @author 张掌
     * @date 2017/11/10 11:12
     * @param keyWord   关键词
     * @param pid       父级id
     * @param title     角色类名
     * @param status    状态码
     * @return java.lang.Integer
     */
    public Result<Integer> findCount(String keyWord, Long pid, String title,   Long status,Integer isValid);


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
    public Result<Integer> save(Long id, Long pid, String title, String descn, Integer isValid, Long sort);

    /**
     * 物理删除
     * @param id
     * @return
     */
    public Result<Integer> delete(Long id);

    /**
     * 权限列表包含按钮
     * @param roleId 角色Id
     * @return
     */
    public Result<List<ZNodes>> listAuthorized(Long roleId);
    /**
     * 根据角色Id保存权限列表
     * @param roleId 角色Id
     * @param aus 权限数组
     * @return
     */
    public Result<Integer> saveAuthorized(Long roleId, String aus, Integer layer);

    public Result<Integer>  deleteBatch(List<Roles> roles);

}
