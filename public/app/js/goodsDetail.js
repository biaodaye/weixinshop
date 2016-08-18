$(function(){
	var mySwiper = new Swiper('.swiper-container', {
				//autoplay: 2000,//可选选项，自动滑动
				pagination : '.swiper-pagination',
	})
	tabChange(mySwiper);
	goodsDetail();
	$(".back").bind("click",function(){
		location.href="classDetail.html";
	})
})
function goodsDetail(){
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			data:{goodsID:GetQueryString("goodsID")},
			dataType:"jsonp",
			success:function(data){							
				//console.log(data[0].imgsUrl);
				var $section=$("#section2");
				var data1=data[0].goodsBenUrl;
				var data2=JSON.parse(data1);
				var data3=data[0].imgsUrl;
				var data4=JSON.parse(data3);
				//商品介绍
				var goodsPrice=Number(data[0].price);
				var goodsDiscount=Number(data[0].discount);
				if(goodsDiscount==0){
						oldPrice=goodsPrice;
					}else{
						oldPrice=parseInt(goodsPrice/goodsDiscount*10);
					}
				$(".goodsImg").children("img").attr("src",data[0].goodsListImg);	
				$(".goodsDaBtn").children().eq(0).html("￥"+data[0].price);
				$(".goodsDaBtn").children().eq(1).html(data[0].goodsName);
				$(".goodsPrice").children("span").eq(0).html(data[0].discount+"折");
				$(".goodsPrice").children("span").eq(1).html(data[0].buynumber+"人购买");
				$(".goodsPrice").children("del").eq(0).html("￥"+oldPrice);
				//商品详情
				$.each(data2, function(i) {    
				    var $pImg=$('<p class="goodsDetailImg"><img src="'+data2[i]+'"/></p>');
					$section.append($pImg);
				});
				var $pMsg=$('<p class="goodsMsg">'+data[0].detail+'</p>');
				$section.append($pMsg);
				//商品实拍
				var $slide=$(".swiper-wrapper");
				$.each(data4,function(i){
					var $imgBox=$('<div class="swiper-slide"><img src="'+data4[i]+'"/></div>');
					$slide.append($imgBox);
				})
			}
		})
	}
function tabChange(mySwiper){
	var oFooter=document.getElementsByTagName("footer")[0];
	var oFooterBtn=oFooter.children;
	var oSection=document.getElementsByTagName("section");
	for(var i= 0;i<oFooterBtn.length;i++){
		oFooterBtn[i].index=i;
		oFooterBtn[i].onclick=function(){
				//alert();
			for(var i=0;i<oFooterBtn.length;i++){
				oFooterBtn[i].className="";
			}
			for(var i=0;i<oSection.length;i++){
				oSection[i].style.display="none";
			}
			this.className="active";
			oSection[this.index].style.display="block";
			mySwiper.update();
		}
	}
}
