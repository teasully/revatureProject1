package com.example.demo.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.UserService;
import com.example.demo.Entity.User;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  UserService userService;

  // Constructor
  public UserController(UserService userService) {
    this.userService = userService;
  }

  /// Endpoints
  // Get a user's name by userId
  @PostMapping("/getName")
  public ResponseEntity<User> getUsername(@RequestBody User user) {

    // Sanitize input
    var id = user.getUserId();
    if (id == null) {
      logger.error("getUsername() => Missing userId");
      return ResponseEntity.status(422).body(null);
    }

    // Check user exists with username and password combo
    var existingUser = userService.getById(id);
    if (existingUser == null) {
      logger.error("getUsername() => User already exists: " + user.getUsername());
      return ResponseEntity.status(404).body(null);
    }

    // Return ok
    user.setUsername(existingUser.getUsername());
    logger.info("getUsername() => Returning username: " + user.getUsername());
    return ResponseEntity.ok(user);
  }

  // Check if username/password combo is correct
  @PostMapping("/login")
  public ResponseEntity<User> login(@RequestBody User user) {

    // Sanitize input
    var username = user.getUsername();
    var password = user.getPassword();
    if (username == null || password == null) {
      logger.error("login() => Missing username/password");
      return ResponseEntity.status(422).body(null);
    }
    username = username.trim().toLowerCase();
    password = password.trim();

    // Make sure not logging in as system
    if (username.equals("system")) {
      logger.error("login() => Attempting to login as 'system' user");
      return ResponseEntity.status(401).body(null);
    }

    // Check user exists with username and password combo
    var existingUser = userService.getByUsernameAndPassword(username, password);
    if (existingUser == null) {
      logger.error("login() => Invalid username/password");
      return ResponseEntity.status(401).body(null);
    }

    // Return ok
    existingUser.setPassword(null);
    logger.info("login() => Login success: " + existingUser.getUsername());
    return ResponseEntity.ok(existingUser);
  }

  // Register a new user account using username and password
  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody User user) {

    // Sanitize input
    var username = user.getUsername();
    var password = user.getPassword();
    if (username == null || password == null) {
      logger.error("register() => Missing username/password");
      return ResponseEntity.status(422).body(null);
    }
    username = username.trim().toLowerCase();
    password = password.trim();

    // Check username requirements
    if (username.length() == 0) {
      logger.error("register() => Invalid username length");
      return ResponseEntity.status(400).body(null);
    }

    // Check password requirements
    if (password.length() < 8) {
      logger.error("register() => Invalid password length");
      return ResponseEntity.status(400).body(null);
    }

    // Check user does not exists
    var existingUser = userService.getByUsername(username);
    if (existingUser != null) {
      logger.error("register() => Username already taken: " + username);
      return ResponseEntity.status(409).body(null);
    }

    // Insert new user
    var newUser = new User();
    newUser.setUsername(username);
    newUser.setPassword(password);
    newUser.setRole("employee");

    newUser = userService.insert(newUser);

    // Return ok
    newUser.setPassword(null);

    logger.info("register() => Registered new user: " + newUser.getUsername());
    return ResponseEntity.ok(newUser);
  }
}
