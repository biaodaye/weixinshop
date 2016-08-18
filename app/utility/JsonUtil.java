package utility;

import net.sf.json.JSONObject;

public class JsonUtil {
	public static String getString(String json,String key){
		JSONObject jsonObject=new JSONObject(json);
		String value=jsonObject.getString(key);
//				
		return value;
		
	}
}
