package models;

import play.db.jpa.Model;

import javax.persistence.Entity;

/**
 * Created by Administrator on 2016/8/22.
 */
@Entity
public class GoodsDetail extends Model {
    public int goodsID;
//    public int classID;
    public String goodsName;
    public String imgUrl;
    public String imgListUrl;
    public String customImgList;
    public String description;
    public int buyNum;
    public float price;
    public float discount;
}
