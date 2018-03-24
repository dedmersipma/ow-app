package com.djsipma.testapp.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.djsipma.testapp.clients.OwapiClientImpl;
import com.djsipma.testapp.models.OverwatchStats;
import com.djsipma.testapp.models.User;
import com.djsipma.testapp.repositories.OverwatchStatsRepository;
import com.djsipma.testapp.repositories.UserRepository;
import com.mongodb.BasicDBObject;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository userRepository;

	@Autowired
	OverwatchStatsRepository overwatchStatsRepository;

	@Autowired
	OwapiClientImpl owapiClientImpl;

	@GetMapping("/users")
	public List<User> getAllUsers() {
		Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");

		return userRepository.findAll(sortByCreatedAtDesc);
	}

	@GetMapping(value = "/users/refresh/{username}", produces = "application/json")
	public ResponseEntity<OverwatchStats> getFreshStats(@PathVariable("username") String username) {
		JSONObject jsonObj;

		try {
			logger.error("username is: {}", username);
			String id = userRepository.findByUserName(username.replaceAll("-", "#")).getId();

			jsonObj = new JSONObject(owapiClientImpl.findAll(username));
			return getStatsByUserId(id).map(stats -> {

				BasicDBObject quickplay = BasicDBObject.parse(
						jsonObj.getJSONObject("eu").getJSONObject("stats").getJSONObject("quickplay").toString());
				BasicDBObject competitive = BasicDBObject.parse(
						jsonObj.getJSONObject("eu").getJSONObject("stats").getJSONObject("competitive").toString());

				stats.setQuickplay(quickplay);
				stats.setCompetitive(competitive);

				return ResponseEntity.ok().body(overwatchStatsRepository.save(stats));
			}).orElse(ResponseEntity.notFound().build());

		} catch (JSONException e) {

			return null;
		}

	}

	@GetMapping(value = "/users/{username}/comprank", produces = "application/json")
	public ResponseEntity<String> getCompRank(@PathVariable("username") String username) {

		try {
			logger.error("username is: {}", username);
			String id = userRepository.findByFirstName(username).getId();

			return getStatsByUserId(id).map(stats -> {
				final JSONObject jsonObj;
				jsonObj = new JSONObject(stats.getCompetitive().toJson());

				return ResponseEntity.ok().body(jsonObj.getJSONObject("overall_stats").toString());
			}).orElse(ResponseEntity.notFound().build());

		} catch (JSONException e) {

			return null;
		}
	}

	@PostMapping("/users")
	public User createUser(@Valid @RequestBody User user) {

		return userRepository.save(user);
	}

	@GetMapping(value = "/users/{id}")
	public ResponseEntity<User> getuserById(@PathVariable("id") String id) {

		return userRepository.findById(id).map(user -> ResponseEntity.ok().body(user))
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping(value = "/users/{id}/overwatchstats")
	public ResponseEntity<OverwatchStats> findOneByUserId(@PathVariable("id") String id, //
			@RequestParam("type") Optional<String> type) {

		return getStatsByUserId(id).map(stats -> ResponseEntity.ok().body(stats))
				.orElse(ResponseEntity.notFound().build());
	}

	@PatchMapping(value = "/users/{id}/overwatchstats")
	public ResponseEntity<OverwatchStats> putOverwatchStats(@PathVariable("id") String id, //
			@RequestBody OverwatchStats overwatchStats) {

		return getStatsByUserId(id).map(stats -> {
			stats.setQuickplay(overwatchStats.getQuickplay());
			stats.setCompetitive(overwatchStats.getCompetitive());
			return ResponseEntity.ok().body(overwatchStatsRepository.save(stats));
		}).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping(value = "/users/{id}/overwatchstats")
	public ResponseEntity<OverwatchStats> postOverwatchStats(@PathVariable("id") String id, //
			@RequestBody OverwatchStats overwatchStats) {

		return userRepository.findById(id).map(userData -> {
			overwatchStats.setUser(userData);
			return ResponseEntity.ok().body(overwatchStatsRepository.save(overwatchStats));
		}).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping(value = "/users/{id}")
	public ResponseEntity<User> updateuser(@PathVariable("id") String id, @Valid @RequestBody User user) {
		return userRepository.findById(id).map(userData -> {
			userData.setUserName(user.getUserName());
			return ResponseEntity.ok().body(userRepository.save(userData));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping(value = "/users/{id}")
	public ResponseEntity<Object> deleteuser(@PathVariable("id") String id) {
		return userRepository.findById(id).map(user -> {
			userRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}

	private Optional<OverwatchStats> getStatsByUserId(String userId) {
		ObjectId objectId = new ObjectId(userId);
		return overwatchStatsRepository.findByUserId(objectId);

	}

}
