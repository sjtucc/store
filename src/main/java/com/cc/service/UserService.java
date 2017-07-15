package com.cc.service;

import java.util.List;

import com.cc.pojo.TbProduct;
import com.cc.pojo.TbUser;
import com.cc.utils.TaotaoResult;


public interface UserService {
	public abstract TaotaoResult createUser(TbUser user);
	public abstract List<TbUser> getUserByPhone(String phone); 
	
	public abstract TaotaoResult getItemList(int page, int rows) throws Exception;  //分页查询
	public abstract TaotaoResult editSave(TbUser user) throws Exception; //修改保存
	public abstract TaotaoResult delete(String id) throws Exception; //删除
	public abstract TaotaoResult add(TbUser user) throws Exception; //增加一条
	public abstract void updateLoginTime(TbUser user) throws Exception;//更新登录时间
	
}
