package com.djsipma.testapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mongodb.BasicDBObject;

@Document(collection = "overwatchdata")
@JsonIgnoreProperties(value = { "createdAt" }, allowGetters = true)
public class OverwatchStats {
	@Id
	private String id;

	@Indexed(unique = true)
	private User user;

	private BasicDBObject competitive;

	private BasicDBObject quickplay;

	/**
	 * @return the competitive
	 */
	public BasicDBObject getCompetitive() {
		return competitive;
	}

	/**
	 * @param competitive
	 *            the competitive to set
	 */
	public void setCompetitive(BasicDBObject competitive) {
		this.competitive = competitive;
	}

	/**
	 * @return the quickplay
	 */
	public BasicDBObject getQuickplay() {
		return quickplay;
	}

	/**
	 * @param quickplay
	 *            the quickplay to set
	 */
	public void setQuickplay(BasicDBObject quickplay) {
		this.quickplay = quickplay;
	}

	public OverwatchStats() {
		super();
	}

	public OverwatchStats(User user) {
		this.user = user;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
