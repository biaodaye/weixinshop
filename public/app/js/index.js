$(function(){
	$(".shoppingCarball").text(storage_getCar().length);
	var mySwiper = new Swiper('.swiper-container', {
					autoplay: 2000,//可选选项，自动滑动
					//loop:true,
					pagination : '.swiper-pagination',
				})
	$.ajax({
		url:"http://hao1a5ttsc.proxy.qqbrowser.cc/getBanner",
		dataType:"jsonp",
		success:function(data){
			//console.log(data);
			/*var data=JSON.parse(data[1][3]);
			console.log(data[0]);*/
			//取轮播div
			//alert(data);

			var $div=$(".swiper-slide");
			//console.log($div.length);
			$.each(data,function(i){
				var data1=data[i].imgUrl;
				//var data2=JSON.parse(data1);
				var img=new Image();
				img.src=data1;
				var $imgBox=$("<div>loading......</div>");
				$div.eq(i).append($imgBox);
				img.onload=function(){
					$div.eq(i).html(img);
				}
			})
		}
	})
	classDetail();
	search();
})










