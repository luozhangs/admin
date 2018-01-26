package com.admin.model.account;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class RoleRefAccount {
    private Long id;

    /**
     * 角色id
     */
    private Long roleId;

    /**
     * 账户id
     */
    private Long accountId;

    /**
     * 逻辑删除状态
     */
    private Integer isDelete;

    /**
     * 电子邮箱
     */
    private Long sortWeight;

    /**
     * 状态默认是1
     */
    private Long status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date modifyTime;


    private Roles roles;

    private Account account;

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public Long getSortWeight() {
        return sortWeight;
    }

    public void setSortWeight(Long sortWeight) {
        this.sortWeight = sortWeight;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

}