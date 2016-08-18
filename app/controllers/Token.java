package controllers;

import play.*;
import play.mvc.*;
import play.mvc.Http.Header;
import utility.Common;

import java.util.*;

import models.*;

public class Token extends Controller {
	
    public static void index() {
    	String echostr=params.get("echostr");
    	System.out.println(echostr);
        renderText(echostr);
    }

}