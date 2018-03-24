package com.djsipma.testapp.objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.BasicDBObject;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Stats {

	@JsonProperty("$.eu.competitive")
	BasicDBObject competitive;

	@JsonProperty("$.eu.quickplay")
	BasicDBObject quickplay;

	public BasicDBObject getCompetitive() {
		return competitive;
	}

	public void setCompetitive(BasicDBObject competitive) {
		this.competitive = competitive;
	}

	public BasicDBObject getQuickplay() {
		return quickplay;
	}

	public void setQuickplay(BasicDBObject quickplay) {
		this.quickplay = quickplay;
	}

}
