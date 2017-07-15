package com.cc.service;

import com.cc.pojo.TbProduct;
import com.cc.utils.TaotaoResult;

public interface ProductService {
	public abstract TaotaoResult getItemList(int page, int rows) throws Exception;  //分页查询
	public abstract TaotaoResult getSearchList(String searchText) throws Exception; //搜索
	public abstract TaotaoResult editSave(TbProduct product) throws Exception; //修改保存
	public abstract TaotaoResult delete(String id) throws Exception; //删除
	public abstract TaotaoResult add(TbProduct product) throws Exception; //增加一条
}
