package com.cc.service;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.cc.mapper.BaseoilIndexMapper;
import com.cc.pojo.BaseoilIndex;
import com.cc.pojo.BaseoilIndexExample;
import com.cc.pojo.BaseoilIndexExample.Criteria;
import com.cc.utils.TaotaoResult;

@Service
public class BaseoilIndexServiceImpl implements BaseoilIndexService {
	Logger logger = Logger.getLogger(BaseoilIndexServiceImpl.class);
	
	@Resource
	private  BaseoilIndexMapper baseoilIndexMapper;
	
	/**
	 * 获取商品列表
	 */
	@Override
	public TaotaoResult getItemParamList(String manufacturers, String model) {
		
		logger.debug("查询商品参数列表");
		BaseoilIndexExample example = new BaseoilIndexExample();
		Criteria criteria = example.createCriteria();
		criteria.andManufacturersEqualTo(manufacturers);
		criteria.andModelEqualTo(model);
		List<BaseoilIndex> list = baseoilIndexMapper.selectByExample(example);
		if(list == null || list.size()==0)
			return TaotaoResult.build(600, "没查到数据");
		//创建返回值对象
		return TaotaoResult.build(200, "ok", list.get(0));
		
	}
}
