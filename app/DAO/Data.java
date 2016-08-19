package DAO;

import java.util.List;



import javax.persistence.EntityManager;
import javax.persistence.Query;

import play.db.jpa.JPA;
import models.Goods;

public class Data {
	public static List<Goods> getBannerData(){
		//sql语句
		String sql="select goods.goodsID,classID,goodsName,imgUrl,goods.id from goods right join head on goods.goodsID=head.goodsID";
		//数据库查询
		
		Query q=(Query) JPA.em().createNativeQuery(sql, Goods.class);
		
		List<Goods> goodsList=q.getResultList();
//		List<Goods> goodsList=Goods.find("goodsID < ?", 20).fetch();
//		System.out.println("list:"+goodsList.toString());
		return goodsList;
		
	}

}
