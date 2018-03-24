package com.djsipma.testapp.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.djsipma.testapp.models.User;

@Repository

public interface UserRepository extends MongoRepository<User, String> {

	public User findByFirstName(String firstName);

	public User findByUserName(String userName);

	public List<User> findByLastName(String lastName);
}
