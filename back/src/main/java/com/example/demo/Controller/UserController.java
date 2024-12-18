package com.example.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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

  // Endpoints
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/login")
  public ResponseEntity<Boolean> login(@RequestBody User user) {
    var username = user.getUsername().trim().toLowerCase();
    var password = user.getPassword().trim();

    // Make sure not logging in as system
    if (username.equals("system")) {
      return ResponseEntity.status(401).body(false);
    }

    // Check user exists with username and password combo
    var existingUser = userService.GetUser(username, password);
    if (existingUser == null) {
      return ResponseEntity.status(401).body(false);
    }

    // Return ok
    return ResponseEntity.ok(true);
  }

  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/register")
  public ResponseEntity<Boolean> RegisterUser(@RequestParam String username, @RequestParam String password) {
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
    var existingUser = userService.GetUser(username);
    if (existingUser != null) {
      return ResponseEntity.status(409).body(false);
    }

    // Insert new user
    var newUser = new User();
    newUser.setUsername(username);
    newUser.setPassword(password);
    userService.InsertUser(newUser);

    // Return ok
    return ResponseEntity.ok(true);
  }
}
