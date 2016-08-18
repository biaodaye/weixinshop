$(function(){
	//购物车数量
	$(".shoppingCarball").text(storage_getCar().length);
	if(storage_getCar()==0){
		$(".shoppingCarball").text(0);
	}
	$.get("http://datainfo.duapp.com/shopdata/getclass.php",
		function(data){
		if(data){
			var data=JSON.parse(data);
			//console.log(data.length);
			for(var i=0;i<data.length;i++){
				proList();
			}
		var $mainBox=$(".pro_classify").children();
			$.each(data,function(i){
				var $Listmsg=$("<span>"+data[i].className+'</span><img src="img/classes.jpg" />');
				$mainBox.eq(i).append($Listmsg);
				//每一类添加点击事件
				$mainBox.eq(i).bind("click",function(){
					//alert()
					location.href='classDetail.html?classID='+encodeURI(data[i].classID)+'&className='+encodeURI(data[i].className);
				})
			})
		}
	})
	//点击全部
	$("#searAll").bind("click",function(){
		if($("#pro_classify").css("display")=="none"){
			$(this).find("img").css("-webkit-transform","rotate(90deg)");
		}else{
			$(this).find("img").css("-webkit-transform","rotate(0)");
		}
		$("#pro_classify").fadeToggle();
	})
	//搜索
	search()
})
//动态生成li
function proList(){
	var oUL=document.getElementById("pro_classify");
	var oLi=document.createElement("li");
	oUL.appendChild(oLi);
}



