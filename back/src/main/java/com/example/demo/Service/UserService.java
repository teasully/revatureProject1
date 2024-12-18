package com.example.demo.Service;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

  UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // Insert a new user
  public User InsertUser(User user) {
    return userRepository.save(user);
  }

  // Check if user exists
  public User GetUser(String username) {
    var user = userRepository.findByUsername(username);
    return user;
  }
  public User GetUser(String username, String password) {
    var user = userRepository.findByUsernameAndPassword(username, password);
    return user;
  }


}
