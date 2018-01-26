package com.admin.pm.account;


import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class AccountUpdateForm {
    /**
     * 主键
     */
    @NotNull(message = "id不能为空")
    private Long id;

    /**
     * 登录名
     */
    @NotEmpty(message = "账户名不允许为空")
    @Pattern(regexp = "^[0-9a-zA-Z]+$",message = "账户名为数字字母下划线组合")
    private String loginName;

    /**
     * 真实名字
     */
    private String realName;


    /**
     * 描述
     */
    private String descn;

    /**
     * 头像
     */
    private String picUrl;

    /**
     * 皮肤
     */
    private String skin;

    /**
     * 性别
     */
    private Integer sex;

    /**
     * 手机号
     */
    @NotNull(message = "手机号不符合规则")
    private String phone;

    /**
     * 邮箱
     */
    @Email(message = "邮箱不符合规则")
    private String email;

    /**
     * 身份证号
     */
    private String identityCard;

    /**
     * 排序字段， 默认为1
     */
    private Long sort;

    /**
     * 角色id
     */
    private Long roleId;

    /**
     * 部门id
     */
    @NotNull(message = "部门不能为空")
    private Long deptId;
    private Integer isValid;

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName == null ? null : loginName.trim();
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    public String getDescn() {
        return descn;
    }

    public void setDescn(String descn) {
        this.descn = descn == null ? null : descn.trim();
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl == null ? null : picUrl.trim();
    }

    public String getSkin() {
        return skin;
    }

    public void setSkin(String skin) {
        this.skin = skin == null ? null : skin.trim();
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
        String reg = "^((\\(\\d{3}\\))|(\\d{3}\\-))?13[0-9]\\d{8}?$|15[89]\\d{8}?$|170\\d{8}?$|147\\d{8}?$";
        if(this.phone!=null&&!"".equals(this.phone)){
            if(!this.phone.matches(reg)){
                this.phone = null;
            }
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getIdentityCard() {
        return identityCard;
    }

    public void setIdentityCard(String identityCard) {
        this.identityCard = identityCard == null ? null : identityCard.trim();
    }

    public Long getSort() {
        return sort;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }


    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

}