package com.admin.service.cache.impl;

import com.admin.service.cache.CacheService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @Title: CacheServiceImpl
 * @Description: 
 * @author lkl
 * @date 2017年11月23日 下午4:18:38
 */
@Transactional
@Service("cacheService")
public class CacheServiceImpl implements CacheService {

	private Logger logger = LoggerFactory.getLogger(CacheServiceImpl.class);
	
	@Override
	@CacheEvict(value = "admin", allEntries = true)
	public void clearBdata() {
		logger.warn("admin");
	}

}
