package com.cc.service;

import com.cc.pojo.TbOrder;
import com.cc.pojo.TbProduct;
import com.cc.utils.TaotaoResult;

public interface OrderService {
	public abstract TaotaoResult createOrder(TbOrder order) throws Exception;
	
	public abstract TaotaoResult getItemList(int page, int rows) throws Exception;  //分页查询
	public abstract TaotaoResult editSave(TbOrder order) throws Exception; //修改保存
	public abstract TaotaoResult delete(String id) throws Exception; //删除
}
