package models;

import java.util.List;

public class Goods {
	public int goodsID;
	public int classID;
	public String goodsName;
	public String[] goodsBenUrl;
	
	
	public Goods(int goodsID, int classID, String goodsName,
			String[] goodsBenUrl) {
		super();
		this.goodsID = goodsID;
		this.classID = classID;
		this.goodsName = goodsName;
		this.goodsBenUrl = goodsBenUrl;
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
	public String[] getGoodsBenUrl() {
		return goodsBenUrl;
	}
	public void setGoodsBenUrl(String[] goodsBenUrl) {
		this.goodsBenUrl = goodsBenUrl;
	}
}
