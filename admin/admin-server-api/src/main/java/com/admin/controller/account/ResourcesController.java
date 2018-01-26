package com.admin.controller.account;

import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.model.account.Resources;
import com.admin.pm.resource.ButtonParam;
import com.admin.pm.resource.ResourcesAddForm;
import com.admin.pm.resource.ResourcesUpdateForm;
import com.admin.service.account.ResourcesService;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.util.Result;

/**
 * 
 * Title: ResourcesController Description:
 * 
 * @author wkq
 * @date 2017年11月10日 上午10:54:37
 */
@RestController
@RequestMapping("/resources/")
public class ResourcesController {

	private Logger logger = LoggerFactory.getLogger(ResourcesController.class);

	@Resource
	private ResourcesService resourcesService;

	/**
	 * 添加
	 * @param form
	 * @return
	 */
	@RequestMapping("/add")
	public Result<Resources> addResources(@RequestBody @Valid ResourcesAddForm form,BindingResult bindingResult){
		Result<Resources> result = new Result<Resources>();
		if (bindingResult.hasErrors()){
			result.setResult(-1);
			result.setMes(bindingResult.getFieldError().getDefaultMessage());
		}else{
			result =  resourcesService.save(null, form.getName(), form.getPid(), form.getType(), form.getResUrl(), form.getBtnType(), form.getIcon(), form.getSort(), form.getDescn(), null);

		}
		return result;
	}

	/**
	 * 修改
	 * @param form
	 * @return
	 */
	@RequestMapping("/update")
	public Result<Resources> updateResources(@RequestBody @Valid ResourcesUpdateForm form,BindingResult bindingResult){
		Result<Resources> res = new Result<Resources>();
		if (bindingResult.hasErrors()){
			res.setResult(-1);
			res.setMes(bindingResult.getFieldError().getDefaultMessage());
		}else{

			res = resourcesService.save(form.getId(), form.getName(), form.getPid(), form.getType(), form.getResUrl(), form.getBtnType(), form.getIcon(), form.getSort(), form.getDescn(), form.getIsValid());

		}
		return res;
	}
	/**
	 * 
	 * Title: getById
	 * @author wkq
	 * @date 2017年11月10日 下午4:24:31
	 * 
	 * @param id
	 * @return Result<Resources>
	 */
	@RequestMapping("/get")
	public Result<Resources> getById(@RequestParam("id") Long id ){
		Result<Resources> res = new Result<Resources>();

		Resources re = resourcesService.getById(id);
		res.setModel(re);

		return res;
	}
	/**
	 * 
	 * Title: deleteById
	 * @author wkq
	 * @date 2017年11月10日 下午6:02:18
	 * 
	 * @param id
	 * @return Result<Resources>
	 */
	@RequestMapping("/del")
	public Result<Integer> deleteById(@RequestParam("id") Long id ){
		Result<Integer> res = new Result<Integer>();

		return  resourcesService.delete(id);
	}

	@RequestMapping(value="/findBtn")
	public Result<List<Resources>> findBtn(@RequestBody  ButtonParam param){
		List<Resources> baseEntity = resourcesService.showAuthorization(param.getAccountId(), param.getResUrl());
		Result<List<Resources>> res = new Result<List<Resources>>();
		if(baseEntity!=null&&baseEntity.size()>0){
			Long menuId = baseEntity.get(0).getId();
			List<Resources> list = resourcesService.findBtn(param.getType(), menuId, param.getAccountId()).getModel();
			res.setModel(list);
		}
		return res;
	}
    /**
     * 资源列表只含菜单不含按钮
     * parentId=0、layer层级是必须条件
     * @return
     */
	@RequestMapping(value="/listResources")
	public Result<List<ZNodes>> listResources(){
		Result<List<ZNodes>> res = new Result<List<ZNodes>>();
		res = resourcesService.listResources();
		return res;
	}
	 /**
     * 用户权限资源列表
     * @param accountId
     * @param type
     * @return
     */
	@RequestMapping(value="/resAuthorized")
	public Result<List<Resources>> resAuthorized(
			@RequestParam("accountId") Long accountId,
			@RequestParam("type") Long type){
		Result<List<Resources>> res = new Result<List<Resources>>();
		List<Resources> list = resourcesService.resAuthorized(accountId, type);
		res.setModel(list);
		return res;
	}


	 /**
     * 事务删除资源（批量）
     * @param os
     * @return
     */
	@RequestMapping(value="/tranDeleteBatch")
	public Result<Integer> tranDeleteBatch(@RequestBody List<Resources> os){
		Result<Integer> res = new Result<Integer>();

		res = resourcesService.tranDeleteBatch(os);
		return res;

	}


	@RequestMapping("/menu/list")
	public Result<List<Resources>> findAndson(){
		Result<List<Resources>> result = new Result<List<Resources>>();
		result.setModel(resourcesService.findAndson());
		return result;
	}

	/**
	 * 暴露接口验证权限
	 * @param userId
	 * @param url
	 * @return
	 */
	@RequestMapping("/check/resource")
	public Boolean checkResource(@RequestParam("userId") Long userId,@RequestParam("url") String url){
		try {
			List<Resources> baseEntity = resourcesService.showAuthorization(userId, url);
			if(baseEntity!=null&&baseEntity.size()>0){
				return true;
			}

		} catch (Exception e) {
			logger.error(e.toString(),e);
		}
		return false;
	}

}
