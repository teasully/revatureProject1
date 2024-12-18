package com.example.demo.Controller;

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
public class UserController {

  UserService userService;

  // Constructor
  public UserController(UserService userService) {
    this.userService = userService;
  }

  /// Endpoints
  // Get a user's name by userId
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/getName")
  public ResponseEntity<String> getUsername(@RequestBody User user) {

    // Sanitize input
    var id = user.getUserId();
    if (id == null) {
      return ResponseEntity.status(422).body("");
    }

    // Check user exists with username and password combo
    var existingUser = userService.getById(id);
    if (existingUser == null) {
      return ResponseEntity.status(404).body("");
    }

    // Return ok
    return ResponseEntity.ok(existingUser.getUsername());
  }

  // Check if username/password combo is correct
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/login")
  public ResponseEntity<Boolean> login(@RequestBody User user) {

    // Sanitize input
    var username = user.getUsername();
    var password = user.getPassword();
    if (username == null || password == null) {
      return ResponseEntity.status(422).body(false);
    }
    username = username.trim().toLowerCase();
    password = password.trim();

    // Make sure not logging in as system
    if (username.equals("system")) {
      return ResponseEntity.status(401).body(false);
    }

    // Check user exists with username and password combo
    var existingUser = userService.getByUsernameAndPassword(username, password);
    if (existingUser == null) {
      return ResponseEntity.status(401).body(false);
    }

    // Return ok
    return ResponseEntity.ok(true);
  }

  // Register a new user account using username and password
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/register")
  public ResponseEntity<Boolean> RegisterUser(@RequestBody User user) {

    // Sanitize input
    var username = user.getUsername();
    var password = user.getPassword();
    if (username == null || password == null) {
      return ResponseEntity.status(422).body(false);
    }
    username = username.trim().toLowerCase();
    password = password.trim();

    // Check username requirements
    if (username.length() == 0) {
      return ResponseEntity.status(400).body(false);
    }

    // Check password requirements
    if (password.length() < 8) {
      return ResponseEntity.status(400).body(false);
    }

    // Check user does not exists
    var existingUser = userService.getByUsername(username);
    if (existingUser != null) {
      return ResponseEntity.status(409).body(false);
    }

    // Insert new user
    var newUser = new User();
    newUser.setUsername(username);
    newUser.setPassword(password);

    userService.insert(newUser);

    // Return ok
    return ResponseEntity.ok(true);
  }
}
