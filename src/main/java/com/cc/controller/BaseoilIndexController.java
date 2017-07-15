package com.cc.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cc.pojo.BaseoilIndex;
import com.cc.pojo.TbUser;
import com.cc.service.BaseoilIndexService;
import com.cc.utils.TaotaoResult;

@Controller
public class BaseoilIndexController {
	@Resource
	private BaseoilIndexService baseoilIndexService;
	@Resource 
	private HttpSession session;
	
	@RequestMapping("/product/param")
	@ResponseBody
	public TaotaoResult getItemParamList(@RequestBody BaseoilIndex baseoilIndex) {
		//先验证用户信息
		TbUser user = (TbUser)session.getAttribute("userSession");
		if(user==null || user.getPhone()==null || user.getPassword()==null 
				|| user.getPhone().trim().length()!=11 || user.getPassword().length()==0) {
			return TaotaoResult.build(800, "用户不存在，重新登录");
		}
				
		if(baseoilIndex!=null && baseoilIndex.getManufacturers()!=null 
				&& baseoilIndex.getModel()!=null) {
			TaotaoResult result = baseoilIndexService.getItemParamList(baseoilIndex.getManufacturers(), baseoilIndex.getModel());
			return result;
		} else {
			return TaotaoResult.build(601, "查询参数出错");
		}
	}
}
