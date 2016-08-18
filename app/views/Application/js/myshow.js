$(function(){
	$(".shoppingCarball").text(storage_getCar().length);
	if(storage_getCar()==0){
		$(".shoppingCarball").text(0);
	}

	$.each($(".myshowList").children(), function(i) {    
		     $(this).bind("click",function(){
		     	$("#oSection1").css("transform","translateX(-100%)");
				$(".back").show();
				$(".registerBtn").css("transform","translateX(-30%) scale(0.6)").css("color","#BCBCBC");
				$(".mycoupon").eq(i).css("-webkit-transform","translateX(0)");
		     	if(i==1){
		     		$("#oSection2").show();
		     	}else{
		     		$("#oSection3").show();
		     	}
		     })
	});
	$(".back").bind("click",function(){
		$("#oSection1").css("-webkit-transform","translateX(0)");
		$("#oSection2").hide();
		$("#oSection3").hide();
		$(".back").hide();
		$(".registerBtn").css("-webkit-transform","translateX(0) scale(1)").css("color","white");
		$.each($(".mycoupon"),function(i){					
			$(".mycoupon").eq(i).css("-webkit-transform","translateX(100%)");
		})
	})
	$(".login").bind("click",function(){
		location.href="login.html";
	})
	$(".register").bind("click",function(){
		location.href="register.html";
	})
	
})
