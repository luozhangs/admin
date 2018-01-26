package com.admin.controller.base;

import com.admin.model.account.Resources;
import com.admin.service.account.ResourcesService;
import com.alibaba.fastjson.JSONObject;
import com.maxx.base.util.Const;
import com.maxx.base.util.Result;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

/**
 * Title: BaseController
 * Description:
 * @author zz
 * @date 2017/11/28 11:43
 */
public abstract class BaseController {
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ResourcesService resourcesService;
    @Autowired
    private HttpServletRequest request;

    public abstract String getUrl();
    private Long menuId;

//     得到request对象

 /*   public HttpServletRequest getRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return request;
    }*/

    public Long getUserId(){
        String method = request.getMethod();
        String userId = null;
        if("POST".equals(method)){
            BufferedReader br = null;
            StringBuffer sb = null;
            try {
                br = new BufferedReader(new InputStreamReader(request.getInputStream(), "utf-8"));
                sb = new StringBuffer("");
                String temp;
                while ((temp = br.readLine()) != null) {
                    sb.append(temp);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } /*finally {
                try {
                    if(br!=null){br.close();}
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }*/
            JSONObject jsonObject = JSONObject.parseObject(sb.toString());
            if(jsonObject==null){
                return null;
            }
            userId = jsonObject.getString("accountId");
            if(userId!=null&&!"".equals(userId)){
                return Long.valueOf(userId);
            }

        }else{
            userId=request.getParameter("accountId");
            if(userId!=null&&!"".equals(userId)){
                return Long.valueOf(userId);
            }
        }
        return null;
    }


    public String getPath(){
        String servletPath = request.getServletPath();
        servletPath = StringUtils.substringBeforeLast(servletPath,".");// 去掉后面的后缀
//        System.out.println(servletPath);
        return servletPath;
    }

    /**
     * 资源的权限（URl级别）
     * @return
     */
    @SuppressWarnings("unchecked")
    protected boolean doSecurityIntercept(){
        try {
            List<Resources> baseEntity = resourcesService.showAuthorization(getUserId(),getPath());
            if(baseEntity!=null&&baseEntity.size()>0){
                this.menuId = baseEntity.get(0).getId();
                return true;
            }
        } catch (Exception e) {
            logger.error(e.toString(),e);
        }
        return false;
    }

    /**
     * 资源的权限（URl级别,拥有第一级资源权限，这资源才能访问）
     * @param url 第一级资源
     * @return
     */
    @SuppressWarnings("unchecked")
    protected boolean doSecurityIntercept(Long userId,String url){
        try {
//            String userId=AccountShiroUtil.getCurrentUser().getAccountId();
            List<Resources> baseEntity = resourcesService.showAuthorization(userId, url);
            if(baseEntity!=null&&baseEntity.size()>0){
                this.menuId = baseEntity.get(0).getId();
                return true;
            }
        } catch (Exception e) {
            logger.error(e.toString(),e);
        }
        return false;
    }

    /**
     * value 值转为Object类型
     * @return
     */
    @SuppressWarnings("unchecked")
    protected Map<String, Object> getParameterStrToObj() {
        Map<String, Object> mapParameter = new HashMap<String, Object>();
        Iterator<Map.Entry<String, String[]>> itor = request.getParameterMap().entrySet().iterator();
        Map.Entry<String, String[]> entry = null;
        while (itor.hasNext()) {
            entry = itor.next();
            String value = entry.getValue()[0];
            mapParameter.put(entry.getKey(), value == "" ? null : value);
        }
        return mapParameter;
    }




}
