package com.admin.filter;


import com.admin.wrapper.BodyReaderHttpServletRequestWrapper;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Title: StreamFilter
 * Description: 
 * @author zz
 * @date 2017/12/21 9:28
 */
@WebFilter(urlPatterns = "/**")
public class StreamFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 防止流读取一次后就没有了, 所以需要将流继续写出去
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        ServletRequest requestWrapper = new BodyReaderHttpServletRequestWrapper(httpServletRequest);
        String methodName = httpServletRequest.getMethod();
        if("GET".equals(methodName)||"OPTIONS".equals(methodName)){
            System.out.println("********************过滤器生效*********************");
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }else{
            filterChain.doFilter(requestWrapper, servletResponse);
            return;
        }
    }

    @Override
    public void destroy() {

    }
}
