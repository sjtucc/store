angular.module('myApp.detailModule', [])

.controller('detailCtrl', ['$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
	 $scope.item = { //接收传过来的参数信息
	 	manufactures: '', 
	 	model: '',   
	 	price: '',
	 	address: '',
	 	godate: '',
	 	downdate: ''
	 }
	 
	 $scope.num = 30;
	 $scope.totalPrice = '';
	 
	 $scope.queryInfo = { //查询商品参数json
		 indexId: '',
		 manufacturers: '',
		 model: '',
		 exterior: '',
		 color: '',
		 flashPoint: '',
		 flowPoint: '',
		 sContent: '',
		 wContent: '',
		 viscosity40: '',
		 viscosity100: '',
		 viscosityIndex: '',
	 	 salesPrice: '',
	     createTime: '',
	     updateTime: '',
	     groupId: '',
	     lowdynamicViscosity: '',
	     volatileLoss: '',
	     density: ''
	 }; 

	 $scope.result = '';//商品参数查询结果
	 
	 $scope.createOrderInfo = { //创建订单json
		 id: '',	 
		 account: '',
		 manufactures: '',
		 model: '',
		 perprice: '',
		 num: '',
		 allprice: '',
		 orderdt: ''
	 };
	 
	 $scope.num = 30;

	 
	 //页面初始化
	$scope.$on('$viewContentLoaded', function() {  
		//获取传过来的参数，渲染页面
		var getStr = $stateParams.param;
		$scope.item = JSON.parse(getStr);
		$scope.totalPrice = $scope.item.price * 30;
		
		//去后端获取详细信息
		$scope.queryInfo.manufacturers = $scope.item.manufactures;
		$scope.queryInfo.model = $scope.item.model;
		$scope.httpPost();
     });
	

	//后端请求数据
	 $scope.httpPost = function() {
		 $http({
	            url: 'product/param',
	            method: 'POST',
	            data: $scope.queryInfo,
	            headers: {
	                'Accept': '*/*',
	                'Content-Type': 'application/json; charset=UTF-8'
	            }
        })
        .success(function(data){
	       	 if(data.status == 200) {
	       		 $scope.result = data.data;
	       	 } else if(data.status == 800) {
        		 $state.go("login");
        	 } else {
	       		 console.log("查询出错");
	       	 }
        })
	 };
	 
	//购买数量变化
	$scope.numChange = function() {
		if(!/^[1-9][0-9]*$/.test($scope.num)) {//包含非数字
			$scope.totalPrice = "请输入正确的数量格式！"
		}
		else {
			$scope.totalPrice = $scope.item.price * $scope.num;
		}
	}
	
	//点击下单按钮后确认dialog
	$scope.showConfirm = function() {
		if($scope.totalPrice == "请输入正确的数量格式！") {
			return false;
		}
		
			popTipShow.confirm('提示','请仔细检查相关信息，您确认要提交吗？',['确 定','取 消'],
				function(e){
				  //callback 处理按钮事件
				  var button = $(e.target).attr('class');
				  if(button == 'ok'){ //按下确定按钮执行的操作
					this.hide();
					
					//向后台提交数据
					$scope.createOrderInfo.manufactures = $scope.myTrim($scope.item.manufactures);
					$scope.createOrderInfo.model = $scope.myTrim($scope.item.model);
					$scope.createOrderInfo.perprice = $scope.myTrim($scope.item.price);
					$scope.createOrderInfo.num = $scope.myTrim(''+$scope.num);
					$scope.createOrderInfo.allprice =  $scope.myTrim(''+$scope.totalPrice);
					
					//post start=======
					$http({
						url: 'order/create',
						method: 'POST',
						data: $scope.createOrderInfo,
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/json; charset=UTF-8'
						}
					})
					.success(function(data){
						 if(data.status == 200) {  //成功
							setTimeout(function() {
								webToast("订单提交成功","top", 2000);
							}, 300);
							setTimeout(function() {$state.go("shop");}, 3000);
						 } else if(data.status == 800) { //没登录
							 $state.go("login");
						 } else if(data.status == 300){ //提交参数出错
							 console.log("参数出错");
							 setTimeout(function() {
									webToast("提交参数出错","top", 2000);
							}, 300);
						 } else { //未知错误
							 setTimeout(function() {
									webToast("未知错误","top", 2000);
							}, 300);
						 }
					});
					//post end=======

				  }
				  if(button == 'cancel') {
					this.hide();
				  }
				});
	};
	
	
	 //删除左右两端的空格
	$scope.myTrim = function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	
}]); 

