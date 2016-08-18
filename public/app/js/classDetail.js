$(function() {
	//购物车数量
	$(".shoppingCarball").text(storage_getCar().length);
	if(storage_getCar()==0){
		$(".shoppingCarball").text(0);
	}
	search();
	var r = window.location.search.substr(1, 1);
	//console.log(r);
	if (r == "s") {
		searchDetail();
	} else {
		classDetail();
	}

})