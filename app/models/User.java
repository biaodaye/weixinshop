package models;

import javax.persistence.Entity;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
@Table(name="user")
public class User extends Model{

	public int userID;
	public String nickName;
	public String headImgUrl;
	public String phone;
	public String address;
}
