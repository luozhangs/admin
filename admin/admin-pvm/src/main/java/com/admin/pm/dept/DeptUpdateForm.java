package com.admin.pm.dept;


import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

public class DeptUpdateForm {
    /**
     * 主键
     */
    @NotNull(message = "部门id不能为空")
    private Long id;

    /**
     * 默认为0，0位父节点
     */
    private Long pid;

    /**
     * 部门名称
     */
    @NotEmpty(message = "部门名称不能为空")
    private String title;

    /**
     * 是否可用  默认为1
     */
    private Integer isValid;

    /**
     * 描述
     */
    private String descn;

    /**
     * 排序所用字段
     */
    private Long sort;



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

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }

    public String getDescn() {
        return descn;
    }

    public void setDescn(String descn) {
        this.descn = descn == null ? null : descn.trim();
    }


    public Long getSort() {
        return sort;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }


}