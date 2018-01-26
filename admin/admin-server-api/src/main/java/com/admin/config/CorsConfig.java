package com.admin.config;

import com.admin.filter.StreamFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Title: CorsConfig
 * Description: 
 * @author zz
 * @date 2017/11/27 15:05
 */
@Configuration
public class CorsConfig extends WebMvcConfigurerAdapter {
    @Bean
    public StreamFilter streamFilter(){
        return new StreamFilter();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .maxAge(3600);
    }



}
