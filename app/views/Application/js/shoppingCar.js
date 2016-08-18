$(function(){
	$(".shoppingCarball").text(storage_getCar().length);
	if(storage_getCar()==0){
		$(".shoppingCarball").text(0);
	}
	$(".goShopping").bind("click",function(){
		location.href="index.html";
	})
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:localStorage.userID},
		dataType:"jsonp",
		success:function(data){
			//console.log(data);
			if(data==0){
				$(".oSection1").show();
				$("#oSection").hide();
				$(".shoppingCar_detail").hide();
			}else{
				$(".oSection1").hide();
				$("#oSection").show();
				$(".shoppingCar_detail").show();
				var $oSection=$("#oSection");
				var AllPrice=0;
				var AllNum=0;
				//var num;
				$.each(data,function(i){
					var $oUL=$("<ul class='pro_detail_1'></ul>");
					$oSection.append($oUL);
					var $oLi1=$("<li class='pro_detail_1_img'><a href='goodsDetail.html?goodsID="+encodeURI(data[i].classID)+"'><img src='"+data[i].goodsListImg+"'/></a></li>");
					var $oLi2=$("<li class='pro_detail_1_msg'></li>");
					$oUL.append($oLi1);
					$oUL.append($oLi2);
					var $p1=$("<p class='proName'><span>"+data[i].goodsName+"</span><span class='proDelete'></span></p>");
					$oLi2.append($p1);
					var $p2=$("<p>"+data[i].className+"</p><p>单价：<span class='per_price'>￥"+data[i].price+"</span><span class='pro_type'>L</span></p>");
					$oLi2.append($p2);
					var $p3=$("<p>数量：<span class='cut'>-</span><input class='pro_detail_num' type='text' value="+data[i].number+"><span class='add'>+</span></p>");
					$oLi2.append($p3);
					   var num=Number($(".pro_detail_num").eq(i).val());
						AllNum+=num;
						AllPrice+=num*Number(data[i].price);
						//加减商品数量
						var storage= storage_getCar();
						$(".add").eq(i).bind("click",function(){
							num+=1;
							AllNum+=1;
							AllPrice+=Number(data[i].price);
							localStorage.setItem("AllNum",AllNum);
							localStorage.setItem("AllPrice",AllPrice);
							$(".pro_detail_num").eq(i).val(num);
							$(".pro_num").html(localStorage.getItem("AllNum"));
							$(".pro_price").html("￥"+localStorage.getItem("AllPrice"));
							storage[i].number=num;
							//console.log(storage);
							window.localStorage["car"]=JSON.stringify(storage);
						})
						$(".cut").eq(i).bind("click",function(){
							if(num==1){
								num=1;
							}else{																																																																																																									
							num-=1;
							AllNum-=1;
							AllPrice-=Number(data[i].price);
							}
							storage[i].number=num;
							window.localStorage["car"]=JSON.stringify(storage);
							$(".pro_detail_num").eq(i).val(num);
							localStorage.setItem("AllNum",AllNum);
							localStorage.setItem("AllPrice",AllPrice);
							$(".pro_num").html(localStorage.getItem("AllNum"));
							$(".pro_price").html("￥"+localStorage.getItem("AllPrice"));
						})
						
						$(".proDelete").eq(i).attr("goodsID",data[i].goodsID);
						//删除商品
						$(".proDelete").eq(i).bind("click",function(){
							$(this).parent().parent().parent().remove();
							AllNum-=num;
							AllPrice-=num*Number(data[i].price);
							//console.log(Number(data[i].price));
							localStorage.setItem("AllNum",AllNum);
							localStorage.setItem("AllPrice",AllPrice);
							$(".pro_num").html(localStorage.getItem("AllNum"));
							$(".pro_price").html("￥"+localStorage.getItem("AllPrice"));
							//更新服务器数据
							updataCar({
								userID:localStorage["userID"],
								goodsID:$(this).attr("goodsID"),
								number:0,
								callback:function(data){
									$(".shoppingCarball").text(storage_getCar().length);
									if(storage_getCar()==0){
										$(".shoppingCarball").text(0);
										$(".oSection1").show();
										$("#oSection").hide();
										$(".shoppingCar_detail").hide();
									}
								}
							});
						})
				})
				//商品总数
				localStorage.setItem("AllPrice",AllPrice);
				$(".pro_num").html(AllNum);
				$(".pro_price").html("￥"+AllPrice);
				
			}
		}
	});

})
//关闭或刷新窗口时更新后台购物车数据
window.onbeforeunload=function(){
	//console.log("关闭窗口")
	var data_=storage_getCar();
	$.each(data_, function(i) {   
		//console.log(data_[i].goodsID);
		updataCar({
			userID:localStorage["userID"],
			goodsID:data_[i].goodsID,			
			number:data_[i].number
		});
	});
}

