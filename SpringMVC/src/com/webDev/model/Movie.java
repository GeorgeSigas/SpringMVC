package com.webDev.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Movie {
	private String MovieId;
	private int Userid;
	
	
	
	public Movie(@JsonProperty("Movieid") String MovieId,
				@JsonProperty ("userid")int Userid) {
		this.MovieId=MovieId;
		this.Userid=Userid;
	}
	public String getMovieId() {
		return MovieId;
	}
	public void setMovieId(String movieId) {
		MovieId = movieId;
	}
	public int getUserid() {
		return Userid;
	}
	public void setUserid(int userid) {
		Userid = userid;
	}
}

