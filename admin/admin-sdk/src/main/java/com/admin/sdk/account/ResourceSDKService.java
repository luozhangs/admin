package com.admin.sdk.account;

import com.admin.model.account.Resources;
import com.admin.pm.resource.ResourcesAddForm;
import com.admin.pm.resource.ResourcesUpdateForm;
import com.maxx.base.util.Result;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Title: ResourceSDKService
 * Description: 
 * @author zz
 * @date 2017/12/23 15:53
 */
@FeignClient("admin-server-api")
public interface ResourceSDKService {

    /**
     * 暴露接口验证权限
     * @param userId
     * @param url
     * @return
     */
    @RequestMapping("/resources/check/resource")
    public Boolean checkResource(@RequestParam("userId") Long userId, @RequestParam("url") String url);

    /**
     * 添加权限
     * @param form
     * @return
     */
    @RequestMapping("/resources/add")
    public Result<Resources> addResources(@RequestBody ResourcesAddForm form);

    /**
     * 修改权限
     * @param form
     * @return
     */
    @RequestMapping("/resources/update")
    public Result<Resources> updateResources(@RequestBody ResourcesUpdateForm form);
}
