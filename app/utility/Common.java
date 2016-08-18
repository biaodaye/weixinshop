package utility;

import java.util.List;

public class Common {
	//
	public static final String APPID="wx6d678318e5f99e1e";//测试
	public static final String SECRET="27e562ca6bf7f42e66c49cd12d6d106e";//测试
	public static final String AUTH_URI_STR="https://open.weixin.qq.com/connect/oauth2/authorize";//需要“http://”？
	public static final String REDIRECT_URI="http://hao1a5ttsc.proxy.qqbrowser.cc/auth";//未填入
	public static final String SCOPE="snsapi_base";
	
	public static final String GET_OPENID_URI="https://api.weixin.qq.com/sns/oauth2/access_token";//?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
	public static String getAuthUrl(String url) {
		// TODO Auto-generated method stub
		
		String authUrl=AUTH_URI_STR+"?"+"appid="+APPID+"&redirect_uri="+REDIRECT_URI+"&response_type=code&scope="+SCOPE+"&state="+url+"#wechat_redirect";
		return authUrl;
	}
	public static String getUserInfoUrl(String code){
		String infoUrl=GET_OPENID_URI+"?"+"appid="+APPID+"&secret="+SECRET+"&code="+code+"&grant_type=authorization_code";
		return infoUrl;
	}
	
	public static String list2json(List<String> list){
		
		return null;
	}
}
