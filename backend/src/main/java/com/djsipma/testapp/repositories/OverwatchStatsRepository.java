package com.djsipma.testapp.repositories;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.djsipma.testapp.models.OverwatchStats;

@Repository
public interface OverwatchStatsRepository extends MongoRepository<OverwatchStats, String> {

	Optional<OverwatchStats> findByUserId(ObjectId id);

}
