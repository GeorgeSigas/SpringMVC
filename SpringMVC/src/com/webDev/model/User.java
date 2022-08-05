package com.webDev.model;

public class User {

	private int id;
	private String Password;
	private String Username;
	private String Fname;
	private String Lname;

	public User() {}
	
	public User(String Username,String Password){
		this.Username=Username;
		this.Password=Password;
	}
	
	public User(String Username,String Password,String Fname,String Lname){
		this.Username=Username;
		this.Password=Password;
		this.Fname=Fname;
		this.Lname=Lname;
	}
	
	@Override
	public String toString() {
		return "User [Username=" + Username + ", Password=" + Password + "]";
	}


	public String getPassword() {
		return Password;
	}


	public void setPassword(String password) {
		Password = password;
	}


	public String getUsername() {
		return Username;
	}


	public void setUsername(String username) {
		Username = username;
	}

	public String getFname() {
		return Fname;
	}

	public void setFname(String fname) {
		Fname = fname;
	}

	public String getLname() {
		return Lname;
	}

	public void setLname(String lname) {
		Lname = lname;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
