package com.admin.model.account;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Resources {
    /**
     * Id
     */
    private Long id;

    /**
     * 菜单名字
     */
    private String name;

    /**
     * 父Id
     */
    private Long pid;

    private Long layer;

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
     * 是否有效(1:有效,0:无效)
     */
    private Integer isValid;

    /**
     * 描述
     */
    private String descn;

    /**
     * 逻辑删除状态
     */
    private Integer isDelete;

    /**
     * 状态
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

    private List<Resources> nodes = new ArrayList<Resources>();

    public List<Resources> getNodes() {
        return nodes;
    }

    public void setNodes(List<Resources> nodes) {
        this.nodes = nodes;
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
        this.name = name == null ? null : name.trim();
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public Long getLayer() {
        return layer;
    }

    public void setLayer(Long layer) {
        this.layer = layer;
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
        this.resUrl = resUrl == null ? null : resUrl.trim();
    }

    public String getBtnType() {
        return btnType;
    }

    public void setBtnType(String btnType) {
        this.btnType = btnType == null ? null : btnType.trim();
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon == null ? null : icon.trim();
    }

    public Long getSort() {
        return sort;
    }

    public void setSort(Long sort) {
        this.sort = sort;
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

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
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