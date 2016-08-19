package models;

import javax.persistence.Entity;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
@Table(name="goods")
public class Goods extends Model{
	public int goodsID;
	public int classID;
	public String goodsName;
	public String imgUrl;
	public float price;
	public float discount;
}
