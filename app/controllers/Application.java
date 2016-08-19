package controllers;

import play.*;
import play.libs.WS;
import play.libs.WS.HttpResponse;
import play.libs.WS.WSRequest;
import play.mvc.*;
import play.mvc.Http.Header;
import utility.Common;
import utility.DataforTest;
import utility.JsonUtil;

import java.util.*;

import DAO.Data;

import com.google.gson.Gson;

import models.*;

public class Application extends Controller {
	//拦截器1（全局）
	@Before(unless={"auth"})
	public static void checkAuthentification(){
		System.out.println("before");//test
		String key="user-agent";
		Map<String, Header> map=request.headers;
		int index=map.get(key).toString().indexOf("MicroMessenger");
		//来自微信浏览器 
		if (index!=-1) {
			System.out.println("before,user:"+session.get("user"));//test
			//不在同个会话中
			if (session.get("user")==null) {
				System.out.println("comefromwc,no user ");//test
				//不是在会话中
				//获取请求uri
				String url=request.url;
				//跳转授权页面
				String authUrl=Common.getAuthUrl(url);
				redirect(authUrl);
			}
		}
	}
    //授权回调action
    public static void auth(String code,String state){
    	System.out.println("auth");//test
    	
    	String infoUrl=Common.getUserInfoUrl(code);
    	//发送请求取得openid
    	WSRequest wsRequest = WS.url(infoUrl);
		HttpResponse response = wsRequest.get();
    	String openid=JsonUtil.getString(response.getString(), "openid");
    	System.out.println("auth openid:"+openid);//test
    	session.put("user", openid);
    	System.out.println("auth user:"+session.get("user"));//test
    	redirect(state);
    }
	//首页
    public static void index() {
    	System.out.println("index");
    	//检查请求头--开始
    	Map<String, Header> map=request.headers;
    	for(String key:map.keySet()){
    		System.out.println("indexheads:"+map.get(key));
    	}
    	
    	//检查请求头--结束
    	
        render();
    }

    //轮播空间数据查询
    public static void getBanner(){
    	System.out.println("getBanner");//test
    	//检查请求头--开始
    	Map<String, Header> map=request.headers;
    	for(String key:map.keySet()){
    		System.out.println("getBannerheads"+map.get(key));
    	}
    	
    	//检查请求头--结束
    	
    	
    	//获得数据
    	List<BannerGoods> goodsList=Data.getBannerData();
    	//转化为json字符串
    	String jsonData=new Gson().toJson(goodsList);
//    	//处理不同源请求
//    	String resp=params.get("callback")+"("+jsonData+")";
//    	System.out.println("resp:"+resp);//test
    	renderText(jsonData);
    }
    //获得首页商品列表数据
    public static void getGoods(){
    	System.out.println("getGoods");//test
    	//获得数据
    	List<Goods> goodsList=Data.getGoodsData();
    	//转化为json字符串
    	String jsonData=new Gson().toJson(goodsList);
    	renderText(jsonData);
    }

}