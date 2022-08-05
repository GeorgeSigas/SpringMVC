package com.webDev.controller;



import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.google.gson.Gson;
import com.webDev.dao.UserDaoImpl;
import com.webDev.model.*;

@Controller
public class MyController {
	private static int ID=-1;
	UserDaoImpl UD=new UserDaoImpl();
	
	@RequestMapping(value="/signup",method=RequestMethod.POST)
	@ResponseBody
	String signup(@RequestParam("fname") String fname,@RequestParam("lname") String lname,@RequestParam("uname") String uname,@RequestParam("psw") String psw) {
		User user=new User(uname,psw,fname,lname);
		int idcheck=UD.CheckUser(user);
		if(idcheck<0) {
			UD.insertUser(user);
			ID=UD.CheckUser(user);
			return"true";
		}
		
		
		return "false";
	}
	
	
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	@ResponseBody
	String login(@RequestParam("uname") String uname,@RequestParam("psw") String psw) {
		User user=new User(uname,psw);
		int idcheck=UD.CheckUser(user);
		if(idcheck>0) {
			ID=idcheck;
			return"true";
		}
		
		
		return "false";
	}
	
	@RequestMapping(value="/loggedIn",method=RequestMethod.GET)
	@ResponseBody
	String loggedIn() {
		
		return UD.FUser(ID);
		
	
	}
	
	@RequestMapping(value="/logOut",method=RequestMethod.GET)
	
	void  logOut() {
		ID=-1;
	}
	
	@RequestMapping(value="/save",method=RequestMethod.GET)
	@ResponseBody
	String save(@RequestParam("id") String id) {
		if(ID<0)return "false";
		Movie movie=new Movie(id,ID);
		
		if(UD.CheckMovie(movie))return "false1";
		UD.insertBookmark(movie);
		
		return"true";
		
	}
	
	@RequestMapping(value="/delete",method=RequestMethod.GET)
	@ResponseBody
	String delete(@RequestParam("id") String id) {
		if(ID<0)return "false";
		Movie movie=new Movie(id,ID);
		UD.deleteBookmark(movie);
		
		
		return "true";
		
	}
	
	@RequestMapping(value="/getbookmarks",method=RequestMethod.GET)
	@ResponseBody
	String Bookmarks() {
		
		List<Movie>  list=new ArrayList<Movie>(UD.GetBookmarks(ID));
		String json=new Gson().toJson(list);
		return json;
		
	
	}
	
}
