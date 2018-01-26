package com.admin.service.account.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import com.admin.vm.account.AccountListVo;
import com.admin.vm.account.AccountVo;
import com.maxx.base.util.Result;
import com.maxx.base.util.security.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.admin.dao.account.AccountDao;
import com.admin.model.account.Account;
import com.admin.service.account.AccountService;
import com.maxx.base.mybatis.BaseServiceMybatisImpl;
import com.maxx.base.mybatis.EntityDao;
import com.maxx.base.util.Page;

/**
 * Title: AccountServiceImpl
 * Description: 账户实现类
 *
 * @author 张掌
 */

@Service("accountService")
@Transactional
public class AccountServiceImpl extends BaseServiceMybatisImpl<Account, Long> implements AccountService {

    private static Logger logger = LoggerFactory.getLogger(AccountServiceImpl.class);

    @Resource
    private AccountDao accountDao;


    @Override
    @Cacheable(value = "admin")
    public Result<Page<AccountListVo>> findPage(String keyWord, String loginName, String realName, String accountType,  Integer sex, String phone, String email, String identityCard, Integer isValid, Long status,  Long roleId, Long deptId, Integer pageNo, Integer pageSize) {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("loginName", loginName);
        map.put("realName", realName);
        map.put("isValid", isValid);
        map.put("status", status);
        map.put("accountType", accountType);
        map.put("sex", sex);
        map.put("phone", phone);
        map.put("email", email);
        map.put("identityCard", identityCard);
        map.put("roleId", roleId);
        map.put("deptId", deptId);
        map.put("keyword", keyWord);

        Result<Page<AccountListVo>> result = new Result<Page<AccountListVo>>();

        Page<AccountListVo> accountPage = accountDao.findPage(map, pageNo, pageSize);
        result.setModel(accountPage);
        return result;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<List<Account>> findList(String keyWord,  String loginName, String realName, String accountType,  Integer sex, String phone, String email, String identityCard, Integer isValid, Long status, Long roleId, Long deptId) {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("loginName", loginName);
        map.put("realName", realName);
        map.put("isValid", isValid);
        map.put("status", status);
        map.put("accountType", accountType);
        map.put("sex", sex);
        map.put("phone", phone);
        map.put("email", email);
        map.put("identityCard", identityCard);
        map.put("roleId", roleId);
        map.put("deptId", deptId);
        map.put("keyword", keyWord);

        Result<List<Account>> result = new Result<>();

        List<Account> list = accountDao.findList(map);
        result.setModel(list);
        return result;
    }

    @Override
    @Cacheable(value = "admin")
    public Result<Integer> findCount(String keyWord,  String loginName, String realName, String accountType,  Integer sex, String phone, String email, String identityCard, Integer isValid,  Long status,  Long roleId, Long deptId) {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("loginName", loginName);
        map.put("realName", realName);
        map.put("isValid", isValid);
        map.put("status", status);
        map.put("accountType", accountType);
        map.put("sex", sex);
        map.put("phone", phone);
        map.put("email", email);
        map.put("identityCard", identityCard);
        map.put("roleId", roleId);
        map.put("deptId", deptId);
        map.put("keyword", keyWord);

        Result<Integer> result = new Result<Integer>();

        int count = accountDao.findCount(map);
        result.setModel(count);
        return result;

    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> add(String loginName, String realName, String descn, Integer sex, String phone, String email, Long roleId, Long deptId) {
        Result result = new Result();

        Integer count = (Integer) this.findCount(null, loginName,null,null,null,null,null,null,null, null,null,null).getModel();
        //判断添加的账户名称是否存在
        if (loginName != null && count == 0) {

            Account account = new Account();
            account.setLoginName(loginName);
            account.setRealName(realName);
            account.setDescn(descn);
            account.setSex(sex);
            account.setPhone(phone);
            account.setEmail(email);
            account.setRoleId(roleId);
            account.setDeptId(deptId);
            account.setCreateTime(new Date());
            account.setModifyTime(account.getCreateTime());
            String pwrs = "123456";                     //设置初始密码为123456
            account.setSkin("skin-0");                   //默认皮肤
            account.setPassword(MD5Util.encode(pwrs));  //MD5加密
            account.setSalt(loginName+"aviptcare");     //设置一个加密盐

            accountDao.save(account);                   //保存

            result.setResult(1);
            result.setMes("账户添加成功");
        }else{
            result.setResult(0);
            result.setMes("账户已存在");
        }
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> update(Long id, String loginName, String realName, String descn, String picUrl, String skin, Integer sex, String phone, String email, String identityCard, Long sort, Long roleId, Long deptId, Integer isValid) {

        Account account = new Account();
        account.setLoginName(loginName);
        account.setRealName(realName);
        account.setDescn(descn);
        account.setPicUrl(picUrl);
        account.setSkin(skin);
        account.setSex(sex);
        account.setPhone(phone);
        account.setEmail(email);
        account.setIdentityCard(identityCard);
        account.setSort(sort);
        account.setRoleId(roleId);
        account.setDeptId(deptId);
        account.setIsValid(isValid);
        account.setModifyTime(new Date());

        Result result = new Result();

        //根据账户名获取数据
        int count = this.findCount(null, loginName, null, null, null, null, null, null, null,null, null, null).getModel();

        if(id!=null){//id不为null执行修改操作
            Account account1 = accountDao.getById(id);
            if(account1!=null){  //当所修改的账户存在时，判断修改后的账户名是否被占用
                if(!account1.getLoginName().equals(loginName)&&count>0){//当账户名发生变动，并且数据库中存在改账户，不允许修改
                    result.setMes("账户名已存在");
                    result.setResult(-1);
                    return result;
                }else{
                    account.setId(id);
                    accountDao.update(account);
                    result.setMes("更新成功");
                    return result;
                }
            }else{      //数据不存在，说明数据被删除掉了，不允许修改
                result.setResult(0);
                result.setMes("数据不存在");
                return result;
            }
        }else{  //id为null时，执行添加操作
            result = this.add(loginName, realName, descn, sex, phone, email, roleId, deptId);
            return result;
        }
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> delete(Long id) {
        Result<Integer> result = new Result<Integer>();

        Account account = accountDao.getById(id);

        if(account==null){
            result.setResult(-1);
            result.setMes("该数据不存在");
            return result;
        }else{
            Account account1 = new Account();
            account1.setId(id);
            account1.setIsDelete(1);

            accountDao.update(account1);
            result.setMes("逻辑删除成功");
            return result;
        }
    }

    @Override
    @Cacheable(value = "admin")
    public Result<AccountVo> findFormatByLoginName(String loginName) {
        List<Account> accounts = this.findList(null, loginName,null,null,null,null,null,null,null, null,null, null).getModel();
        Result<AccountVo> result = new Result<AccountVo>();
        AccountVo account = null;
        if(accounts.size()>0){
            account = accounts.get(0).model2vo();
        }
        result.setModel(account);
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> setSetting(String skin, Long id) {
        Result<Integer> result = new Result<Integer>();

        Account account = new Account();
        account.setSkin(skin);

        accountDao.update(account);
        result.setMes("皮肤设置成功");
        return result;
    }

    @Override
    public Result<Account> getPerData(Long id) {
        Result<Account> result = new Result<Account>();
        result.setModel(accountDao.getById(id));
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> setHeadpic(Long id, String picUrl) {
        Result result = new Result();

        Account account = new Account();
        account.setId(id);
        account.setPicUrl(picUrl);

        accountDao.update(account);
        result.setMes("头像设置成功");
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> setPerData(Account account) {
        Result result = new Result();

        accountDao.update(account);
        result.setMes("个人信息设置成功");
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> sysResetPwd(Account o) {
        Result result = new Result();

        Long accountId = o.getId();
        if (accountId != null) {
            Account odata = accountDao.getById(accountId);

            //随机密码,以后发邮箱
            String salt = odata.getLoginName()+"aviptcare";
            String pwd = o.getPassword();
            pwd = pwd==null||"".equals(pwd)?"123456":pwd;
            o.setPassword(MD5Util.encode(pwd));
            o.setSalt(salt);

            accountDao.update(o);
            result.setMes("重置密码成功");
            return result;
        } else {
            result.setResult(0);
            result.setMes("重置密码失败");
            return result;
        }
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> preResetPwd(String opwd, String npwd, String qpwd, Long accountId, String loginName) {
        Result result = new Result();

        if (opwd!=null && npwd!=null) {
            if (npwd.endsWith(qpwd)) {
                Account o = new Account();
                o.setId(accountId);
                Account odata = this.getById(accountId);
//                String pwrsMD5 = CipherUtil.generatePassword(opwd);
                String oPwdEncrypt = MD5Util.encode(opwd);
                String odataPwdEncrypt = odata.getPassword();
                if (oPwdEncrypt.equals(odataPwdEncrypt)) {
                    String salt = loginName+"aviptcare";
                    o.setSalt(salt);
                    o.setPassword(odataPwdEncrypt);
                    accountDao.update(o);
                    result.setMes("修改密码成功");
                } else {
                    result.setResult(0);
                    result.setMes("密码不正确");
                }
            } else {
                result.setResult(0);
                result.setMes("两次密码不一致");
            }
        }
        return result;
    }



    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> deleteBatchAccount(String chks) {
        Result result = new Result();

        if (!chks.isEmpty()) {
            String[] chk = chks.split(",");
            List<Account> list = new ArrayList<Account>();

            for (String s : chk) {
                Account sd = new Account();
                sd.setId(Long.parseLong(s));
                list.add(sd);
            }

            accountDao.deleteBatchAccount(list);
             result.setMes("批量删除成功");
        }
        return result;
    }

    @Override
    @CacheEvict(value = "admin", allEntries = true)
    public Result<Integer> updatePwd(Long accountId, String pwd) {
        Result result = new Result();

        Account account = new Account();
        account.setId(accountId);
        account.setPassword(pwd);

        accountDao.update(account);
        result.setMes("密码修改成功");
        return result;
    }


    @Override
    protected EntityDao getEntityDao() {
        return accountDao;
    }

}
