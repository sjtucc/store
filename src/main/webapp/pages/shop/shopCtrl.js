angular.module('myApp.shopModule', [])

.controller('shopCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.pageInfo = {
		page: 1,  //首页为1
		rows: 6   //默认每页6条数据
	};
	
	$scope.result = {
		total: '', //获取结果总条数
		rows: ''   //获取结果记录列表
	};
	
	$scope.forward = ''; //控制上一页样式
	$scope.next = ''; //控制下一页样式
	
	$scope.totalPage = 1; //总页数
	
	$scope.searchText = ''; //搜索内容
	
	$scope.ifSearch = false;
	
	//页面初始化
	 $scope.$on('$viewContentLoaded', function() {  
		 //获取页面展示商品信息
		 $scope.httpPost();
		 $scope.ifSearch = true;
     });  
	 

	//后端请求数据
	 $scope.httpPost = function() {
		 $http({
	            url: 'product/list',
	            method: 'POST',
	            data: $scope.pageInfo,
	            headers: {
	                'Accept': '*/*',
	                'Content-Type': 'application/json; charset=UTF-8'
	            }
         })
         .success(function(data){
        	 if(data.status == 200) {
        		 $scope.result.total = data.data.total;
        		 $scope.result.rows = data.data.rows;
        		 $scope.ifSearch = false;
        	 } else if(data.status == 800) {
        		 $state.go("login");
        	 }
        	 else {
        		 console.log("查询出错");
        	 }
        	//渲染结果页面
        	 $scope.totalPage = parseInt($scope.result.total/$scope.pageInfo.rows) + 1;
        	 if($scope.pageInfo.page==1) {
    			 $scope.forward = "firstforward";
    		 } else {
    			 $scope.forward = "centerforward";
    		 }
    		 if($scope.pageInfo.page==$scope.totalPage) {
    			 $scope.next = "lastnext";
    		 } else {
    			 $scope.next = "centernext"; 
    		 }
	     }); 
	 }

	 //查询下一页数据
	 $scope.nextPage = function() {
		if($scope.pageInfo.page==$scope.totalPage) //查到最后一页，不执行下一页
			return false;
		$scope.pageInfo.page = $scope.pageInfo.page + 1; //查询当前页
		
		//后端请求数据
		 $http({
	            url: 'product/list',
	            method: 'POST',
	            data: $scope.pageInfo,
	            headers: {
	                'Accept': '*/*',
	                'Content-Type': 'application/json; charset=UTF-8'
	            }
         })
         .success(function(data){
        	 if(data.status == 200) {
        		 $scope.result.total = data.data.total;
        		 $scope.result.rows = data.data.rows;
        	 } else {
        		 console.log("查询出错");
        	 }
        	//渲染结果页面
        	 $scope.totalPage = parseInt($scope.result.total/$scope.pageInfo.rows) + 1;
        	 if($scope.pageInfo.page==1) {
    			 $scope.forward = "firstforward";
    		 } else {
    			 $scope.forward = "centerforward";
    		 }
    		 if($scope.pageInfo.page==$scope.totalPage) {
    			 $scope.next = "lastnext";
    		 } else {
    			 $scope.next = "centernext"; 
    		 }
	     }); 
		 
	 }
	
	//查询上一页数据
	 $scope.forwardPage = function() {
		 if($scope.pageInfo.page==1) //查到第一页，不执行上一页
				return false;
			$scope.pageInfo.page = $scope.pageInfo.page - 1; //查询当前页
			
			//后端请求数据
			 $http({
		            url: 'product/list',
		            method: 'POST',
		            data: $scope.pageInfo,
		            headers: {
		                'Accept': '*/*',
		                'Content-Type': 'application/json; charset=UTF-8'
		            }
	         })
	         .success(function(data){
	        	 if(data.status == 200) {
	        		 $scope.result.total = data.data.total;
	        		 $scope.result.rows = data.data.rows;
	        	 } else {
	        		 console.log("查询出错");
	        	 }
	        	//渲染结果页面
	        	 $scope.totalPage = parseInt($scope.result.total/$scope.pageInfo.rows) + 1;
	        	 if($scope.pageInfo.page==1) {
	    			 $scope.forward = "firstforward";
	    		 } else {
	    			 $scope.forward = "centerforward";
	    		 }
	    		 if($scope.pageInfo.page==$scope.totalPage) {
	    			 $scope.next = "lastnext";
	    		 } else {
	    			 $scope.next = "centernext"; 
	    		 }
		     }); 
			
	 }
	
	 //搜索事件
	$scope.search = function() {
		if($scope.myTrim($scope.searchText).length == 0) {  //请求为空
			$scope.httpPost();  //分页搜索
		} else {   //匹配搜索
			 $http({
		            url: 'product/search',
		            method: 'POST',
		            data: $scope.searchText,
		            headers: {
		                'Accept': '*/*',
		                'Content-Type': 'application/json; charset=UTF-8'
		            }
	        })
	        .success(function(data){
		       	 if(data.status == 200) {
		       		 $scope.result.total = data.data.total;
		       		 $scope.result.rows = data.data.rows;
		       		 //不分页，隐藏相关域
		       		$scope.ifSearch = true;
		       		 
		       	 } else {
		       		 console.log("查询出错");
		       	 }
		    }); 
		}
	}
	
	//回车触发事件
	$scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
        	$scope.search();
        }
    };
	
    //详情
    $scope.queryDetail = function(item) {
    	$state.go("detail", {param: JSON.stringify(item)});
    };
    

	
	 //删除左右两端的空格
	$scope.myTrim = function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	
}]); 

