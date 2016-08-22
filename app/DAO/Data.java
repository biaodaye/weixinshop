package DAO;

import java.util.List;






import javax.persistence.EntityManager;
import javax.persistence.Query;

import play.db.jpa.JPA;
import models.BannerGoods;
import models.Goods;
import models.User;

public class Data {
	public static List<BannerGoods> getBannerData(){
		//sql语句
		String sql="select goods.goodsID,classID,goodsName,imgUrl,goods.id from goods right join head on goods.goodsID=head.goodsID";
		//数据库查询
		
		Query q=(Query) JPA.em().createNativeQuery(sql, BannerGoods.class);
		
		List<BannerGoods> goodsList=q.getResultList();
//		System.out.println("list:"+goodsList.toString());
		return goodsList;
		
	}

	public static List<Goods> getGoodsData() {
		// TODO Auto-generated method stub
//				List<Goods> goodsList=Goods.find("id < ?", 5).fetch();
		//sql语句
				String sql="select * from goods where id<6";
				//数据库查询

				Query q=(Query) JPA.em().createNativeQuery(sql, Goods.class);
				
				List<Goods> goodsList=q.getResultList();
		
//				System.out.println("list:"+goodsList.toString());
		return goodsList;
	}
	public static User findUser(String userID){
//		//sql语句
//		String sql="select * from user where userID="+userID;
//		//数据库查询
//		
//		Query q=(Query) JPA.em().createNativeQuery(sql, User.class);
//		
//		User user=(User) q.getResultList().get(0);
		User user=User.find("id=?", userID).first();
		
		return user;
		
	}

	public static void insertUser(int userID, String nickName, String headImgUrl,
			String phone, String address) {
		// TODO Auto-generated method stub
		
	}

}
