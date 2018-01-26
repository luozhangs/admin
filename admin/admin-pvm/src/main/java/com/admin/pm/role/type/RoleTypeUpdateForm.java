package com.admin.pm.role.type;


import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

public class RoleTypeUpdateForm {

    @NotNull(message = "角色类型id不能为空")
    private Long id;

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

    private Integer isValid;

    private Long sort;

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }

    public Long getSort() {
        return sort;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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