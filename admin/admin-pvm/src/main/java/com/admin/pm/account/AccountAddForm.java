package com.admin.pm.account;


import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class AccountAddForm {

    /**
     * 登录名
     */
    @NotEmpty(message = "账户名不允许为空")
    @Pattern(regexp = "^[0-9a-zA-Z]+$"  ,message = "账户名为数字字母下划线组合")
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
     * 角色id
     */
    private Long roleId;

    /**
     * 部门id
     */
    @NotNull(message = "账户部门不允许为空")
    private Long deptId;


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