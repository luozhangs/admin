package com.admin.dao.account;

import com.admin.model.account.Account;
import com.admin.vm.account.AccountListVo;
import com.maxx.base.mybatis.BaseMybatisDao;
import com.maxx.base.util.Page;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Title: AccountDao
 * Description: AccountDao
 * @author 张掌
 * @date 2017/11/10 9:12
 */
@Repository("accountDao")
public class AccountDao extends BaseMybatisDao<Account, Long>{

    @Override
    public String getMybatisMapperNamesapce() {
        return "com.admin.mapper.account.AccountMapper";
    }

    /**
     * 通过账户名查询
     * @Title: findPage
     * @author 张掌
     * @date 2017/11/10 10:25
     * @param map
     * @param pageNo
     * @param pageSize
     * @return com.maxx.base.util.Page<com.admin.model.account.Account>
     */
    public Page<AccountListVo> findPage(Map<String, Object> map, Integer pageNo, Integer pageSize){
        Page<AccountListVo> page = new Page<AccountListVo>(pageNo, pageSize);
        return selectPage(page, this.getMybatisMapperNamesapce()+".findList", map);
    }

    /**
     * 条件查询数量
     * @Title: findCount
     * @author 张掌
     * @date 2017/11/10 10:28
     * @param map
     * @return java.lang.Integer
     */
    public Integer findCount(Map<String, Object> map) {
        Integer count = this.getSqlSession().selectOne(this.getMybatisMapperNamesapce()+".findListCount", map);
        return count;
    }

    /**
     * 条件查询
     * @Title: findList
     * @author 张掌
     * @date 2017/11/10 10:28
     * @param map
     * @return java.util.List<com.admin.model.account.Account>
     */
    public List<Account> findList(Map<String, Object> map) {
        return this.getSqlSession().selectList(this.getMybatisMapperNamesapce()+".list", map);
    }

    /**
     * 批量删除
     * @param o
     */
    public void deleteBatchAccount(List<Account> o){
        this.getSqlSession().delete(this.getMybatisMapperNamesapce()+".deleteBatchAccount", o);
    }

}
