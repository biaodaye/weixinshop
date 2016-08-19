package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
public class Goods extends Model{
	public int goodsID;
	public int classID;
	public String goodsName;
	public String imgUrl;
//	public String[] imgListUrl;
	

	
	
	public Goods(int goodsID, int classID, String goodsName,String imgUrl) {
		super();
		this.goodsID = goodsID;
		this.classID = classID;
		this.goodsName = goodsName;
		this.imgUrl=imgUrl;
//		this.imgListUrl = imgListUrl;
	}
	public int getGoodsID() {
		return goodsID;
	}
	public void setGoodsID(int goodsID) {
		this.goodsID = goodsID;
	}
	public int getClassID() {
		return classID;
	}
	public void setClassID(int classID) {
		this.classID = classID;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
//	public String[] getGoodsBenUrl() {
//		return imgListUrl;
//	}
//	public void setGoodsBenUrl(String[] goodsBenUrl) {
//		this.imgListUrl = goodsBenUrl;
//	}
}
