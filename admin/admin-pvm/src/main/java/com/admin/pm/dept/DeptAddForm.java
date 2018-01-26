package com.admin.pm.dept;


import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

public class DeptAddForm {

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