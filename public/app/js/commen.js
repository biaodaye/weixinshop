//弹框
function myalert(data,str0,str1,str2,str3){
	var oBody=document.getElementsByTagName("body")[0];
	var oDiv=document.createElement("div");
	oBody.appendChild(oDiv);
	oDiv.className="myalert";
	var oSpan=document.createElement("span");
	var oA=document.createElement("a");
	oA.innerHTML="X";
	oDiv.appendChild(oSpan);
	oDiv.appendChild(oA);
	if(data==0){
		oSpan.innerHTML=str0;
	}else if(data==1){
		oSpan.innerHTML=str1;
	}else if(data==2){
		oSpan.innerHTML=str2;
	}else{
		oSpan.innerHTML=str3;
	}
	oA.onclick=function(){
		oBody.removeChild(oDiv);
	}
}
//获取用户
function getUser(){
	var user={
			userID:$(".username").val(),
			password:$(".psd").val()
		}
	return user;
}
//获取地址栏参数
function GetQueryString(name){
	/*定义正则，用于获取相应参数*/
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 /*字符串截取，获取匹配参数值*/
     var r = window.location.search.substr(1).match(reg);
	 /*但会参数值*/
     if(r!=null)return  decodeURI(r[2]); return null;
}
//动态生成商品列表
function goodMsg(){
	var oSection=document.getElementsByTagName("section")[0];
	var oUL=document.createElement("ul");
	oUL.className="pro";
	var oLi1=document.createElement("li");
	oLi1.className="mainImg";
	var oLi2=document.createElement("li");
	oLi2.className="main_detail";
	oUL.appendChild(oLi1);
	oUL.appendChild(oLi2);
	oSection.appendChild(oUL);
}
//购物车更新
function updataCar(opt){
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
			userID:opt.userID,
			goodsID:opt.goodsID,
			number:opt.number
		},function(data){
			//console.log(data);
			this_data=data;
			Ajax_getCar({userID:opt.userID,callback:function(data){
				window.localStorage["car"]=JSON.stringify(data);
				if(opt.callback && typeof(opt.callback)=="function"){
					opt.callback(this_data);
				}
			}})
		})
}
//获取购物车的Ajax方法，参数{userID:"",callback:function(){}}
function Ajax_getCar(opt){
	$.ajax({url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:opt.userID},
		dataType:"jsonp",
		success:function(data){
			if(opt.callback && typeof(opt.callback)=="function"){
				opt.callback(data);
			}
		}
	});
}
//从本地获取购物车函数
function storage_getCar(){
	return window.localStorage["car"] ? JSON.parse(window.localStorage["car"]) : 0;
}
//商品列表后台调用
function classDetail(){
		$.ajax({
			url:"getGoods",
			data:{classID:GetQueryString("classID")},
			dataType:"json",
			success: successfn
				//console.log(data);
			/*	var data1=data[0].goodsListImg;
				$(".mainImg").children(0).children(0).attr("src",data1);*/		
		})
}
//搜索框后台调用
function searchDetail(){
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
			data:{selectText:GetQueryString("selectText")},
			dataType:"jsonp",
			success: successfn
		})
}
//商品列表加载成功后回调函数
function successfn(data){
	//console.log(data);
	for(var i=0;i<data.length;i++){
		goodMsg();
	}
	var $mainImg=$(".mainImg");
	var $detail=$(".main_detail");
	var $oLi2=$(".main_detail");
	var num=Number($(".shoppingCarball").html());
	$.each(data,function(i){
		var goodsPrice=Number(data[i].price);
		var goodsDiscount=Number(data[i].discount);
		var oldPrice;
		if(goodsDiscount==0){
			oldPrice=goodsPrice;
		}else{
			oldPrice=parseInt(goodsPrice/goodsDiscount*10);
		}
		
		var $btn=$("<input class='shoppingCar_btn' type='button'/>")
		$btn[0].goodsID=data[i].goodsID;
		$oLi2.eq(i).append($btn);
		//点击加入购物车
		$btn.bind("click",function(){
			//console.log(this.goodsID);
			this_left=$(".shoppingcar").offset().left+40,
			this_top=$(".shoppingcar").offset().top+40,
			$thisDiv=$(this).parent().parent(),
			$thisImg=$thisDiv.children().children().children(),
			thisImg_left=$thisImg.offset().left,
			thisImg_top=$thisImg.offset().top,
			thisImg_width=$thisImg.width(),
			thisImg_height=$thisImg.height(),
			thisImg_src=$thisImg.attr("src");
			//console.log($thisImg.attr("src"));
		var $thatImg=$("<img src='"+thisImg_src+"' />");
			$thatImg.css({"z-index":"1000","position":"absolute","left":"-5px","top":"-5px","width":parseInt(thisImg_width)+10+"px","height":parseInt(thisImg_height)+10+"px"})
			$thisDiv.append($thatImg)
			$thatImg.animate({"left":this_left,"top":this_top-thisImg_top,"width":"10px","height":"10px"},700,function(){
				$thatImg.remove();
			})
			//判断是否需要登录
			//if(window.localStorage["userID"]){
			//	updataCar({
			//				userID:localStorage["userID"],
			//				goodsID:this.goodsID,
			//				number:1,
			//				callback:function(data){
			//					if(data){
			//						//console.log(storage_getCar().length);
			//						$(".shoppingCarball").html(storage_getCar().length);
			//					}
			//				}
			//			});
			//}else{
			//	location.href="login.html";
			//}
		})
		var $imgBox=$('<a href="goodsDetail?goodsID='+encodeURI(data[i].goodsID)+'"><img src="'+data[i].imgUrl+'"></a>');
		$mainImg.eq(i).append($imgBox);
		var $maincotent=$("<p class='main_content'>"+data[i].goodsName+"</p>");
		$detail.eq(i).append($maincotent);
		var $mainprice=$("<p class='main_price'>￥"+data[i].price+"<del>￥"+oldPrice+"</del></p>");
		var $discount=$("<p class='discount'>"+data[i].discount+"折</p>");
		$detail.eq(i).append($mainprice);
		$detail.eq(i).append($discount);
	})
}
//搜索框点击
function search(){
	$(".search").children("span").bind("click",function(){
		var searchText=$(".search_tex").val();
		location.href='classDetail.html?selectText='+encodeURI(searchText);
	})
}










