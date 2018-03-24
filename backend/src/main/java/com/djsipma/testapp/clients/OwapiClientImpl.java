package com.djsipma.testapp.clients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OwapiClientImpl {

	@Autowired
	private RestTemplate restTemplate;
	@Value("${resource.owapi}")
	private String resource;
	@Value("${resource.localapi}")
	private String localResource;

	public String findAll(String username) {

		return restTemplate.getForObject(resource + "/" + username + "/stats", String.class);
	}

}
