package com.djsipma.testapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.djsipma.testapp.models.Todo;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
 
}
