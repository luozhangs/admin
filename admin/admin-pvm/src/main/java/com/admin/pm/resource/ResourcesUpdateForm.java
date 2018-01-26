package com.admin.pm.resource;


import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

/**
 * Title: ResourcesAddForm
 * Description:
 * @author zz
 * @date 2017/11/30 21:10
 */

public class ResourcesUpdateForm {

    @NotNull(message = "资源id不能为空")
    private Long id;
    /**
     * 菜单名字
     */
    private String name;

    /**
     * 父Id
     */
    private Long pid;


    /**
     * 资源类型(1:为菜单，2:功能，3:按钮)
     */
    private Long type;

    /**
     * 菜单链接
     */
    private String resUrl;

    private String btnType;

    /**
     * 菜单Icon
     */
    private String icon;

    /**
     * 菜单顺序(由小到大排列)
     */
    private Long sort;

    /**
     * 描述
     */
    private String descn;
    private Integer isValid;
    private Long accountId;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public Long getType() {
        return type;
    }

    public void setType(Long type) {
        this.type = type;
    }

    public String getResUrl() {
        return resUrl;
    }

    public void setResUrl(String resUrl) {
        this.resUrl = resUrl;
    }

    public String getBtnType() {
        return btnType;
    }

    public void setBtnType(String btnType) {
        this.btnType = btnType;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Long getSort() {
        return sort;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }

    public String getDescn() {
        return descn;
    }

    public void setDescn(String descn) {
        this.descn = descn;
    }
}
