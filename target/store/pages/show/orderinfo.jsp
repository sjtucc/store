<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		<meta charset="utf-8" />
		<title></title>
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		
		<script type="text/javascript" src="/store/asserts/js/dialog/jquery-1.10.1.min.js"></script>

<script type="text/javascript">
   function click1() {
      //首先验证文件格式
      var fileName = $('#uploadfile').val();
      if (fileName === '') {
          alert('请选择文件');
          return false;
      }
      var fileType = (fileName.substring(fileName
              .lastIndexOf(".") + 1, fileName.length))
              .toLowerCase();
      if (fileType !== 'xls' && fileType !== 'xlsx') {
          alert('文件格式不正确，excel文件！');
          return false;
      }
      $("#file_form").submit();

   }
   

</script>
</head>
<body>

	<form action="<%=basePath%>orderinfo/dealExcel" name="file_form" id="file_form" method="post" enctype="multipart/form-data">
		<input type="file" name="uploadfile" id="uploadfile" /> <br/>
		<button type="button" onclick="click1()">文件上传</button>
	</form>
		
	
</body>
</html>