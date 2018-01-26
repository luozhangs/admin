package com.admin.interceptor;

import com.admin.model.account.Account;
import com.admin.model.account.Resources;
import com.admin.service.account.AccountService;
import com.admin.service.account.ResourcesService;
import com.admin.wrapper.BodyReaderHttpServletRequestWrapper;
import com.alibaba.fastjson.JSONObject;
import com.maxx.base.util.Const;
import com.maxx.base.util.Result;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Title: AdminInterceptor
 * Description:
 *
 * @author zz
 */

public class AdminInterceptor implements HandlerInterceptor {

    @Autowired
    private  ResourcesService resourcesService;
    @Autowired
    private AccountService accountService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {

        if ("OPTIONS".equals(request.getMethod())) {
            return true;
        }
        Long userId = getUserId(request);
        if(userId==null){
            response.setContentType("application/json;charset=UTF-8");
            Result result = new Result();
            result.setResult(-1);
            result.setMes("请先登录");
            PrintWriter out = response.getWriter();
            out.write(JSONObject.toJSONString(result));
            out.flush();
            out.close();
            return false;
        }else{
            Account account = accountService.getById(userId);
            if(account != null&& account.getRoleId()==1){
                return true;
            }
            String servletPath = request.getServletPath();
            servletPath = StringUtils.substringBeforeLast(servletPath, ".");// 去掉后面的后缀
            List<Resources> baseEntity = resourcesService.showAuthorization(userId, servletPath);
            if (baseEntity != null && baseEntity.size() > 0) {
                return true;
            }else{
                response.setContentType("application/json;charset=UTF-8");
                Result result = new Result();
                result.setResult(0);
                result.setMes(Const.NO_AUTHORIZED_MSG);
                PrintWriter out = response.getWriter();
                out.write(JSONObject.toJSONString(result));
                out.flush();
                out.close();
                return false;
            }
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public Long getUserId(HttpServletRequest request) {
        String method = request.getMethod();
        String userId = null;
        if ("GET".equals(method)) {
            userId = request.getParameter("accountId");
            if (userId != null && !"".equals(userId)) {
                return Long.valueOf(userId);
            }
        } else {
            JSONObject jsonObject = null;
            try {
                jsonObject = JSONObject.parseObject(new BodyReaderHttpServletRequestWrapper(request).getBodyString(request));
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (jsonObject == null) {
                return null;
            }
            userId = jsonObject.getString("accountId");
            if (userId != null && !"".equals(userId)) {
                return Long.valueOf(userId);
            }
        }
        return null;
    }
}
