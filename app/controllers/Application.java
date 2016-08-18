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

import com.google.gson.Gson;

import models.*;

public class Application extends Controller {
	//拦截器1（全局）
	@Before(unless={"auth"})
	public static void checkAuthentification(){
		
		String key="user-agent";
		Map<String, Header> map=request.headers;
		int index=map.get(key).toString().indexOf("MicroMessenger");
		//是否来自微信浏览器
		if (index!=-1) {
			//是否在同个会话中
			if (session.get("user")==null) {
				//不是在会话中
				//获取请求uri
				String url=request.url;
				//跳转授权页面
				String authUrl=Common.getAuthUrl(url);
				redirect(authUrl);
			}
		}
	}
	//首页
    public static void index() {
        render();
    }
    //授权回调action
    public static void auth(String code,String state){
    	
    	String infoUrl=Common.getUserInfoUrl(code);
    	//发送请求取得openid
    	WSRequest wsRequest = WS.url(infoUrl);
		HttpResponse response = wsRequest.get();
//    	System.out.println("resp:"+response.getString());
    	String openid=JsonUtil.getString(response.getString(), "openid");
//    	System.out.println("openid:"+openid);
    	session.put("user", openid);//测试
    	redirect(state);
    }
    //轮播空间数据查询
    public static void getBanner(){
    	
    	//获得数据
    	List<Goods> goodsData=DataforTest.getBannerData();
    	//转化为json字符串
    	String jsonData=new Gson().toJson(goodsData);
    	System.out.println("json:"+jsonData);
//    	String resp="callback("+jsonData+")";
//    	System.out.println("resp:"+resp);
    	renderText(jsonData);
    }

}