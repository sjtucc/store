angular.module('myApp.registerModule', [])

.controller('registerCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.credential = {
		phone: '',
		password: ''
	};
	$scope.passwordCf = '';
	$scope.errMsg = {
		text: '',
		show: false
	}

	$scope.register = function(credential) {
		//先校验表单信息
		$scope.validate($scope.credential.phone, $scope.credential.password, $scope.passwordCf);
		if($scope.errMsg.show) { //有错
			return false;
		} 
		
		$http({
            url: 'user/register',
            method: 'POST',
            data: $scope.credential,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).success(function(data){
           if(data.status == 200) { //去登录
        	   //弹窗
        	   popTipShow.alert('提示','恭喜您，您已注册成功，快去登录吧！', ['确认'],
    				function(e){
    				  //callback 处理按钮事件		  
    				  var button = $(e.target).attr('class');
    				  if(button == 'ok'){
    					 //按下确定按钮执行的操作
    					 $state.go("login");
    					this.hide();
    				  }	
    				}
    			);
        	   //弹窗
        	   
           }
           if(data.status == 303) {
        	   $scope.errMsg.text = '用户已存在';
	  		   $scope.errMsg.show = true;
	  		   return false;
           } else {
        	   $scope.errMsg.show = false;
           }
           return false;  //未知错误
	           
	    });
	};
	
	$scope.validate = function(phone, password, passwordCf) {
		 var phone = $scope.myTrim(phone);
		 var password = $scope.myTrim(password);
		 var passwordCf = $scope.myTrim(passwordCf);
		 if(phone.length == 0) {
			 $scope.errMsg.text = '请填写手机号';
			 $scope.errMsg.show = true;
			 return;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(!(/^1\d{10}$/.test(phone))){
			 $scope.errMsg.text = '手机号格式错误';
			 $scope.errMsg.show = true;
			 return;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(password.length == 0) {
			 $scope.errMsg.text = '请输入密码';
			 $scope.errMsg.show = true;
			 return;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(!(/\d{6}$/.test(password))) {
			 $scope.errMsg.text = '密码格式错误';
			 $scope.errMsg.show = true;
			 return;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(passwordCf.length == 0) {
			 $scope.errMsg.text = '请再次输入密码';
			 $scope.errMsg.show = true;
			 return;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 if(passwordCf != password) {
			 $scope.errMsg.text = '两次输入密码不一致';
			 $scope.errMsg.show = true;
			 return;
		 } else {
			 $scope.errMsg.show = false;
		 }
		 
	};
	
	 //删除左右两端的空格
	$scope.myTrim = function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	
}]); 

