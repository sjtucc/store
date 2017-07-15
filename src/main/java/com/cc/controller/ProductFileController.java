package com.cc.controller;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.cc.pojo.TbOrder;
import com.cc.pojo.TbProduct;
@Controller
@RequestMapping("/orderinfo")
public class ProductFileController {
	/**
	 * @author chenchen
	 * @title 读取excel，存数据库
	 */
	@RequestMapping("/dealExcel")
	public ModelAndView dealExcel(
		HttpServletRequest request,
        @RequestParam("uploadfile") CommonsMultipartFile file) throws Exception{
		
		InputStream fis = file.getInputStream();
		Workbook workbook = WorkbookFactory.create(fis);
		Sheet sheet1 = workbook.getSheetAt(0);/** 得到第一个sheet */
		ArrayList<TbOrder> orderList = new ArrayList<>();

		for(int i=1; i<=sheet1.getLastRowNum(); i++) {
			Row row = sheet1.getRow(i);
			if(row != null){
				TbOrder order = new TbOrder();
				if(row.getCell(0) != null) {
					row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
					order.setAccount((row.getCell(0).getStringCellValue()));
				}
				if(row.getCell(1) != null) {
					row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
					order.setManufactures((row.getCell(1).getStringCellValue()));
					order.setManufactures(new String(order.getManufactures().getBytes("GBK"),"ISO8859_1"));
				}
				if(row.getCell(2) != null) {
					row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
					order.setModel((row.getCell(2).getStringCellValue()));
			        order.setModel(new String(order.getModel().getBytes("GBK"),"ISO8859_1"));
				}
				if(row.getCell(3) != null) {
					row.getCell(3).setCellType(Cell.CELL_TYPE_STRING);
					order.setPerprice((row.getCell(3).getStringCellValue()));
				}
				if(row.getCell(4) != null) {
					row.getCell(4).setCellType(Cell.CELL_TYPE_STRING);
					order.setNum((row.getCell(4).getStringCellValue()));
				}
				if(row.getCell(5) != null) {
					row.getCell(5).setCellType(Cell.CELL_TYPE_STRING);
					order.setAllprice((row.getCell(5).getStringCellValue()));
				}
				if(row.getCell(6) != null) {
					row.getCell(6).setCellType(Cell.CELL_TYPE_STRING);
					order.setOrderdt((row.getCell(6).getStringCellValue()));
				}
				orderList.add(order);
			} else {
				break;
			}
				
		}
		//deleteData(); 订单表不删除数据，追加数据
		
		goToSave(orderList);
		
		
	
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/pages/show/orderinfo.jsp"); 
		return mv;
	}
	


	
	private void goToSave(ArrayList<TbOrder> orderList) throws Exception {
        PreparedStatement pstmt = null;  
        Connection conn = null;
        Class.forName("com.mysql.jdbc.Driver");
        try {
	       conn = DriverManager.getConnection("jdbc:mysql://120.26.136.231:3306/numysql?useUnicode=true&characterEncoding=utf8&characterSetResults=utf8", "wmt", "WMTwmt007");
        	// conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/numysql?useUnicode=true&characterEncoding=utf8&characterSetResults=utf8", "root", "111111");
	        conn.setAutoCommit(false); // 设置手动提交 
	        pstmt = conn.prepareStatement("insert into tb_order(id,account,manufactures,model,perprice,num,allprice,orderdt) VALUES (?,?,?,?,?,?,?,?)");
	        for(int i=0; i<orderList.size(); i++) {
	        	pstmt.setString(1, UUID.randomUUID().toString());
	        	pstmt.setString(2, orderList.get(i).getAccount());
	        	pstmt.setString(3, orderList.get(i).getManufactures());
	        	pstmt.setString(4, orderList.get(i).getModel());
	        	pstmt.setString(5, orderList.get(i).getPerprice());
	        	pstmt.setString(6, orderList.get(i).getNum());
	        	pstmt.setString(7, orderList.get(i).getAllprice());
	        	pstmt.setString(8, orderList.get(i).getOrderdt());
	        	pstmt.addBatch();  // 加入批量处理  
	        }
	        pstmt.executeBatch(); // 执行批量处理
            conn.commit();  // 提交
        }
        catch (SQLException e) {  
            e.printStackTrace();  
        //恢复变量初始值     
        } finally { 
                if(pstmt != null) {  
                    pstmt.close();  
                    pstmt = null;  
                }  
                if(conn != null) {  
                    conn.close();  
                    conn = null;  
                }  

        }
        
	}
	
	
	public void deleteData() throws Exception {
		Connection conn = null;
        Statement statement = null;        
        try {  
            Class.forName("com.mysql.jdbc.Driver");  
            conn = DriverManager.getConnection("jdbc:mysql://120.26.136.231:3306/numysql?useUnicode=true&characterEncoding=utf8&characterSetResults=utf8", "wmt", "WMTwmt007");  
           // conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/numysql?useUnicode=true&characterEncoding=utf8&characterSetResults=utf8", "root", "111111");
            statement = conn.createStatement();
            statement.executeUpdate("delete from tb_product where 1=1");
        } catch (SQLException e) {  
            e.printStackTrace();  
        } finally {   
            if(statement != null) {  
            	statement.close();  
            	statement = null;  
            }  
            if(conn != null) {  
                conn.close();  
                conn = null;  
            }  
        }	
	}
}
