package com.admin.pm.resource;

/**
 * Title: ButtonParam
 * Description: 
 * @author zz
 * @date 2017/12/22 15:51
 */

public class ButtonParam {

    private Long accountId;

    private Long type;

    private String resUrl;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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
}
