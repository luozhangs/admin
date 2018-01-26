package com.admin.sdk.account;

import com.admin.pm.account.AccountAddForm;
import com.admin.pm.account.AccountUpdateForm;
import com.admin.vm.account.AccountVo;
import com.maxx.base.util.Result;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Title: AccountSDKService
 * Description:
 * @author zz
 * @date 2017/12/23 15:53
 */
@FeignClient("admin-server-api")
public interface AccountSDKService {


    /**
     * 查询单个
     *
     * @param id
     * @return com.maxx.base.util.Result
     */
    @RequestMapping("/account/get")
    public Result<AccountVo> getById(@RequestParam("id") Long id,@RequestParam("accountId") Long accountId);

    /**
     * 登录
     * @param loginName
     * @param password
     * @return
     */
    @RequestMapping("/account/login")
    public Result<AccountVo> login(@RequestParam("loginName") String loginName, @RequestParam("password") String password);
}
