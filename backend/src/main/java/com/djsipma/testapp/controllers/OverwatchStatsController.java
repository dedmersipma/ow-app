package com.djsipma.testapp.controllers;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.djsipma.testapp.models.OverwatchStats;
import com.djsipma.testapp.repositories.OverwatchStatsRepository;
import com.djsipma.testapp.repositories.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OverwatchStatsController {
	@Autowired
	OverwatchStatsRepository overwatchStatsrepository;
	@Autowired
	UserRepository userRepository;

	final static Logger logger = LoggerFactory.getLogger(TodoController.class);

	@PostMapping("/overwatchstats")
	public OverwatchStats createTodo(@Valid @RequestBody OverwatchStats overwatchStats) {

		return overwatchStatsrepository.save(overwatchStats);
	}

	@GetMapping(value = "/overwatchstats/{id}")
	public ResponseEntity<OverwatchStats> getTodoById(@PathVariable("id") String id) {

		return overwatchStatsrepository.findById(id).map(todo -> ResponseEntity.ok().body(todo))
				.orElse(ResponseEntity.notFound().build());
	}

	// @GetMapping(value = "/overwatchstats/{id}/quickplay", produces =
	// "application/json")
	// public String getQuickplay(@PathVariable("id") String id) {
	//
	// return overwatchStatsrepository.findById(id).get().getQuickplay();
	// }

	@PutMapping(value = "/overwatchstats/{id}")
	public ResponseEntity<OverwatchStats> updateTodo(@PathVariable("id") String id,
			@Valid @RequestBody OverwatchStats overwatchStats) {
		return overwatchStatsrepository.findById(id).map(todoData -> {
			OverwatchStats updatedStats = overwatchStatsrepository.save(todoData);
			return ResponseEntity.ok().body(updatedStats);
		}).orElse(ResponseEntity.notFound().build());
	}

}
