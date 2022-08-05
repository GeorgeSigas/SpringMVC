package com.webDev.dao;

import java.util.ArrayList;

import com.webDev.model.*;

public interface UserDao {

		void insertUser(User user);
		int CheckUser(User user);
		void insertBookmark(Movie movie);
		void deleteBookmark(Movie movie);
		String FUser(int id);
		boolean CheckMovie(Movie movie);
		ArrayList<Movie> GetBookmarks(int id);



}
