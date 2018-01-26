package com.admin.controller.account;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.model.account.ResourcesRole;
import com.admin.service.account.ResourcesRefRoleService;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;

/**
 * 权限角色中间表
 * Title: ResourcesRefRoleController
 * Description:
 *
 * @author wkq
 */
@RestController
@RequestMapping("/resources/ref/role/")
public class ResourcesRefRoleController {

    private Logger logger = LoggerFactory.getLogger(ResourcesController.class);
    @Resource
    private ResourcesRefRoleService resourcesRefRoleService;

    /**
     * Title: findPage
     *
     * @param roleId        角色id
     * @param resourcesId   资源id
     * @param status        状态
     * @param pageNo        页码
     * @param pageSize
     * @return Result<Page<ResourcesRole>>
     */
    @RequestMapping("/page")
    public Result<Page<ResourcesRole>> findPage(
            @RequestParam(value = "roleId", required = false) Long roleId,
            @RequestParam(value = "resourcesId", required = false) Long resourcesId,
            @RequestParam(value = "status", required = false) Long status,
            @RequestParam(value = "pageNo", required = false) Integer pageNo,
            @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        Result<Page<ResourcesRole>> res = new Result<Page<ResourcesRole>>();
        res = resourcesRefRoleService.findPage(roleId, resourcesId, status, pageNo, pageSize);
        return res;
    }



    /**
     * Title: getById
     *
     * @param id
     * @return Result<Resources>
     */
    @RequestMapping("/get")
    public Result<ResourcesRole> getById(@RequestParam("id") Long id) {
        Result<ResourcesRole> res = new Result<ResourcesRole>();
        res.setResult(1);
        ResourcesRole re = resourcesRefRoleService.getById(id);
        res.setModel(re);
        return res;
    }

    /**
     * Title: deleteById
     *
     * @param id
     * @return Result<ResourcesRole>
     */
    @RequestMapping("/del")
    public Result<Integer> deleteById(@RequestParam("id") Long id) {
        Result<Integer> res = new Result<Integer>();
        res = resourcesRefRoleService.delete(id);
        return res;
    }
}
