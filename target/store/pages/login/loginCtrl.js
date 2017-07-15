angular.module('myApp.loginModule', [])

.controller('loginCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.credential = {
		phone: '',
		password: ''
	};
	$scope.errMsg = {
		text: '',
		show: false
	}

	$scope.toRegisterHtml = function() {
		$state.go('register');
	};
	
	 //页面初始化
	 $scope.$on('$viewContentLoaded', function() {  
		 //获取保存的用户名密码
		 var loUser = localStorage.getItem("user") || "";
         var loPass = localStorage.getItem("pass") || "";
         var checked = localStorage.getItem("checked");
         $scope.credential.phone = loUser;
         $scope.credential.password = loPass;
         if(checked == "true") 
        	 document.getElementById("checkbox1").checked = true;
         else 
        	 document.getElementById("checkbox1").checked = false;
    }); 
	
	$scope.login = function(credential) {
		//先校验表单信息
		$scope.validate($scope.credential.phone, $scope.credential.password);
		if($scope.errMsg.show) { //有错
			return false;
		} 
		
		$http({
            url: 'user/login',
            method: 'POST',
            data: $scope.credential,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).success(function(data){
           if(data.status == 200) { //去商品页面
        	   //登录成功，如果勾选保存密码，将用户名密码填充到localstorage
        	   if(document.getElementById("checkbox1").checked){
        		   localStorage.setItem("user", $scope.credential.phone);
                   localStorage.setItem("pass", $scope.credential.password);
                   localStorage.setItem("checked", true);
        	   } else {
        		   localStorage.setItem("user", "");
                   localStorage.setItem("pass", "");
                   localStorage.setItem("checked", false);
        	   }
        	   
        	   $state.go("shop");
           }
           if(data.status == 301) {
        	   $scope.errMsg.text = '用户不存在';
	  		   $scope.errMsg.show = true;
	  		   return false;
           } else {
        	   $scope.errMsg.show = false;
           }
           if(data.status == 302) {
        	   $scope.errMsg.text = '密码错误';
	  		   $scope.errMsg.show = true;
	  		   return false;
           } else {
        	   $scope.errMsg.show = false;
           }
           if(data.status == 999) {
        	   $scope.errMsg.text = '您的账号还在审核中，暂时无法查看商品';
	  		   $scope.errMsg.show = true;
	  		   return false;
           } else {
        	   $scope.errMsg.show = false;
           }
           return false;  //未知错误
	           
	    });
	};
	
	$scope.validate = function(phone, password) {
		 var phone = $scope.myTrim(phone);
		 var password = $scope.myTrim(password);
		 if(phone.length == 0) {
			 $scope.errMsg.text = '请填写手机号';
			 $scope.errMsg.show = true;
			 return false;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(!(/^1\d{10}$/.test(phone))){
			 $scope.errMsg.text = '手机号格式错误';
			 $scope.errMsg.show = true;
			 return false;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(password.length == 0) {
			 $scope.errMsg.text = '请输入密码';
			 $scope.errMsg.show = true;
			 return false;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(!(/\d{6}$/.test(password))) {
			 $scope.errMsg.text = '密码格式错误';
			 $scope.errMsg.show = true;
			 return false;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 
	};
	
	 //删除左右两端的空格
	$scope.myTrim = function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
		
}]);

