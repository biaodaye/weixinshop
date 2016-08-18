$(function(){
	$(".shoppingCarball").text(storage_getCar().length);
	if(storage_getCar()==0){
		$(".shoppingCarball").text(0);
	}
	window.alert=myalert;
	//点击注册跳转页面
	$(".login").on("click",function(){
			location.href="register.html";
	})
	//服务器端验证
		$(".agreeRg").bind("click",function(){
				//alert();
				var user=getUser();
				$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
					status:"login",
					userID:user.userID,
					password:user.password,
				},function(data){
					var str0="此用户名不存在";
					var str1;
					var str2="用户名密码不符";
					var str3="登录成功"
					if(data!=0 & data!=2){
					 //var obj = data.parseJSON(); 
						//console.log(data.userID);
						localStorage.setItem("userID",user.userID);
						localStorage.setItem("password",user.password);
						alert(data,str0,str1,str2,str3);
						setTimeout(function(){
							$(".myalert").remove();
							location.href="index.html";
						},1000)
					}else{
						alert(data,str0,str1,str2,str3);
					}
				})
		})
})
