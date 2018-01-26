package com.admin.pm.role.type;


import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

public class RoleTypeAddForm {

    /**
     * 父级id
     */
    private Long pid;

    /**
     * 角色类型名称
     */
    @NotEmpty(message = "角色类型名称不能为空")
    private String title;

    /**
     * 描述
     */
    private String descn;


    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getDescn() {
        return descn;
    }

    public void setDescn(String descn) {
        this.descn = descn == null ? null : descn.trim();
    }



}