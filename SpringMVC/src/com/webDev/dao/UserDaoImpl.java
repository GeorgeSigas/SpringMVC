package com.webDev.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.webDev.dao.UserDao;
import com.webDev.model.*;


@Repository
public class UserDaoImpl extends JdbcDaoSupport implements UserDao {
	
	private Connection conn;
	
	public UserDaoImpl() {
		
		Connection connection = null;
        try {
        	String IP = "192.168.1.2";
            String DB = "WebDev";
            String DBUser = "sa";
            String DBPassword = "1998!!!";
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            System.out.println("Connecting....");
            String url = "jdbc:jtds:sqlserver://" + IP + ";databaseName=" + DB + ";user=" + DBUser + ";password=" + DBPassword + "" + ";";
            connection = DriverManager.getConnection(url);
           
    		System.out.println("Got it!");
        }
        catch(SQLException e){
        	System.out.println(e);
        	
        } catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        this.conn=connection;
		
		
	} 
	

	
	@Override
	public void insertUser(User user) {
		Statement stmt=null;
        try {
            stmt = conn.createStatement();
            String sql="Insert into UserTable\r\n" + 
    				"values('"+user.getUsername()+"','"+user.getPassword()+"','"+user.getFname()+"','"+user.getLname()+"') ";
    		stmt.executeUpdate(sql);
    		System.out.println("Got it!");
        }
        catch(SQLException e){
        	System.out.println(e);
        }
	}

	@Override
	public int CheckUser(User user) {
		Statement stmt=null;
		ResultSet rs=null;
		
		try {
            stmt = conn.createStatement();
            String sql="Select * from UserTable \r\n" + 
            		"where username='"+user.getUsername()+"'and password='"+user.getPassword()+"'";
    		rs = stmt.executeQuery(sql);
    		if(rs.next()==false)
    		{
    			return -1;
    		}
    		else {
    			return rs.getInt("Userid");
    		}
        }
        catch(SQLException e){
        	System.out.println(e);
        }
		
		
		return -1;
		
	}





	@Override
	public String FUser(int id) {
		Statement stmt=null;
		ResultSet rs=null;
		
		try {
            stmt = conn.createStatement();
            String sql="Select * from UserTable \r\n" + 
            		"where Userid="+id;
    		rs = stmt.executeQuery(sql);
    		if(rs.next()==true) {
    			return rs.getString("fname");
    		}
    		
        }
        catch(SQLException e){
        	System.out.println(e);
        }
		
		
		return null;
		
	}



	@Override
	public void insertBookmark(Movie movie) {
		Statement stmt=null;
        try {
            stmt = conn.createStatement();
            String sql="Insert into Bookmarks\r\n" + 
    				"values("+movie.getUserid()+",'"+movie.getMovieId()+"') ";
    		stmt.executeUpdate(sql);
    		System.out.println("Got it!");
        }
        catch(SQLException e){
        	System.out.println(e);
        }
		
	}



	@Override
	public void deleteBookmark(Movie movie) {
		Statement stmt=null;
        try {
            stmt = conn.createStatement();
            String sql="Delete from Bookmarks\r\n" + 
    				"where Userid="+movie.getUserid()+" and movie_id='"+movie.getMovieId()+"'";
    		stmt.executeUpdate(sql);
    		System.out.println("Got it!");
        }
        catch(SQLException e){
        	System.out.println(e);
        }
		
	}



	@Override
	public boolean CheckMovie(Movie movie) {
		Statement stmt=null;
		ResultSet rs=null;
		
		try {
            stmt = conn.createStatement();
            String sql="Select * from Bookmarks \r\n" + 
            		"where Userid="+movie.getUserid() +" and movie_id='"+movie.getMovieId()+"'";
    		rs = stmt.executeQuery(sql);
    		return rs.next();
        }
        catch(SQLException e){
        	System.out.println(e);
        }
		
		
		return false;
		
	}



	@Override
	public  ArrayList<Movie> GetBookmarks(int id) {
		
		ArrayList<Movie> result=new ArrayList<Movie>();
		Statement stmt=null;
		ResultSet rs=null;
		
		try {
            stmt = conn.createStatement();
            String sql=("Select * from Bookmarks \r\n" + 
            		"where Userid="+id);
    		rs = stmt.executeQuery((java.lang.String) sql);
    		while(rs.next())
    		{
    			result.add(new Movie(rs.getString("movie_id"),rs.getInt("Userid")));
    		}
    		return result;
        }
        catch(SQLException e){
        	System.out.println(e);
        }
		
		return result;
		
		
		
	}
	

}
