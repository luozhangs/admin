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

import com.admin.model.account.Dept;
import com.admin.pm.dept.DeptAddForm;
import com.admin.pm.dept.DeptUpdateForm;
import com.admin.service.account.DeptService;
import com.admin.vm.znode.ZNodes;
import com.maxx.base.util.Page;
import com.maxx.base.util.Result;
/**
 * 
 * @author wuyy 2017年11月23日 
 *
 */
@RestController
@RequestMapping("/dept/")
public class DeptController {

	private Logger logger = LoggerFactory.getLogger(DeptController.class);

	@Resource
	private DeptService deptService;



	/**
	 * 
	 * @Title: findPage
	 * @author wyy
	 * @date 2017年11月23日 上午10:31:41
	 * 
	 * @param keyword	关键词
	 * @param pid		父级id
	 * @param title	标题
	 * @param status	状态
	 * @param pageNo	页码
	 * @param pageSize	每页大小
	 * @return Result<Page<Dept>>
	 */
	@RequestMapping("/page")
	public Result<Page<Dept>> findPage(@RequestParam(value = "keyword", required = false) String keyword,
			@RequestParam(value = "pid", required = false)Long pid, 
			@RequestParam(value = "title", required = false)String title,
			@RequestParam(value = "status", required = false)Long status,
			@RequestParam(value = "pageNo", required = false)Integer pageNo,
			@RequestParam(value = "pageSize", required = false)Integer pageSize) {
		Result<Page<Dept>> res = new Result<Page<Dept>>();
		Page<Dept> page = deptService.findPage(keyword,  pid, title,  status, pageNo, pageSize).getModel();
		res.setModel(page);	
		return res;
	}


	@RequestMapping("/add")
	public Result<Integer> addResources(@RequestBody @Valid  DeptAddForm form,BindingResult bindingResult){
		Result<Integer> res = new Result<Integer>();
		if (bindingResult.hasErrors()){
			System.out.println(bindingResult.getFieldError().getDefaultMessage());
			res.setResult(-1);
			res.setMes(bindingResult.getFieldError().getDefaultMessage());
		}else{
			return deptService.add(form.getPid(), form.getTitle(), form.getDescn());
		}
		return res;
	}
	/**
	 * 
	 * @Title: updateDept
	 * @author wyy
	 * @date 2017年11月23日 上午10:31:56

	 * @return Result<Dept>
	 */
	@RequestMapping("/update")
	public Result<Integer> updateDept(@RequestBody @Valid DeptUpdateForm form,BindingResult bindingResult){
		Result<Integer> res = new Result<Integer>();
		if (bindingResult.hasErrors()){
			res.setResult(-1);
			res.setMes(bindingResult.getFieldError().getDefaultMessage());
		}else{
			return deptService.update(form.getId(), form.getPid(), form.getTitle(), form.getIsValid(), form.getDescn(), form.getSort());
		}
		return res;
	}
	/**
	 * 
	 * @Title: getById
	 * @author wyy
	 * @date 2017年11月23日 上午10:32:04
	 * 
	 * @param id
	 * @return Result<Dept>
	 */
	@RequestMapping("/get")
	public Result<Dept> getById(@RequestParam("id") Long id ){
		Result<Dept> res = new Result<Dept>();

		Dept re = deptService.getById(id);
		res.setModel(re);
		return res;


	}
	/**
	 * 
	 * @Title: deleteById
	 * @author wyy
	 * @date 2017年11月23日 上午10:32:12
	 * 
	 * @param id
	 * @return Result<Dept>
	 */
	@RequestMapping("/del")
	public Result<Integer> deleteById(@RequestParam("id") Long id ){
		Result<Integer> res = new Result<Integer>();

		res = deptService.delete(id);
		return res;

	}
	
	/**
     * 查询菜单树
     * @author wyy
     * @return
     */
    @RequestMapping("/get/tree")
    public Result<List<ZNodes>> getDept(String keyword) {
		Result<List<ZNodes>> result = new Result<List<ZNodes>>();
		List<ZNodes> deptList = deptService.getDept(keyword);
		result.setModel(deptList);
		return result;
    }
}
