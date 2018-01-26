package com.admin.controller.catche;

import com.admin.service.cache.CacheService;
import com.alibaba.fastjson.JSONObject;
import com.maxx.base.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/data/cache/")
public class CacheController {
	
	@Autowired
	private CacheService cacheService;
	
	@RequestMapping("/clear")
	public Result<JSONObject> getByCode(){
		Result<JSONObject> res = new Result<JSONObject>();
		res.setResult(1);
		cacheService.clearBdata();
		res.setMes("清除缓存成功");
		return res;
	}

}
