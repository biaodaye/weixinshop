$(function(){
	$(".shoppingCarball").text(storage_getCar().length);
	if(storage_getCar()==0){
		$(".shoppingCarball").text(0);
	}
	window.alert=myalert;
	//点击登录跳转页面
	$(".login").on("click",function(){
			location.href="login.html";
	})
	//注册表单验证
	var flag1=false,flag2=false,flag3=false; 
	$(".username").focus(function(){
		$(".usertext").html("请输入用户名");
	})
	$(".username").blur(function(){
		$(".usertext").html("");
		if(!/^[a-z0-9_-]{1,16}$/.test($(this).val()) || $(this).val()==""){
			$(".usertext").html("用户名必须为1-16位数字字母下划线");
			flag1=false;
		}else{
			flag1=true;
		}
	})
	$(".psd").focus(function(){
		$(".psdtext").html("请输入密码");
	})
	$(".psd").blur(function(){
		$(".psdtext").html("");
		if(!/^[a-z0-9_-]{6,18}$/.test($(this).val()) || $(this).val()==""){
			$(".psdtext").html("密码必须为6-18位数字字母下划线");
			flag2=false;
		}else{
			flag2=true;
		}
	})
	$(".repsd").focus(function(){
		$(".repsdtext").html("请输入确认密码");
	})
	$(".repsd").blur(function(){
		$(".repsdtext").html("");
		if($(this).val()!=$(".psd").val() || $(this).val()==""){
			$(".repsdtext").html("两次密码输入不一致");
			flag3=false;
		}else{
			flag3=true;
		}
	})
	//服务器端验证
		$(".agreeRg").bind("click",function(){
			if(flag1 & flag2 & flag3){
				//alert();
				var user=getUser();
				$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
					status:"register",
					userID:user.userID,
					password:user.password,
				},function(data){
					var str0="此用户名以存在";
					var str1="注册成功";
					var str2;
					alert(data,str0,str1,str2);
				})
			}
		})
	
})









