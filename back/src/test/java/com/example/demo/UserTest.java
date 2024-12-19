package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.Controller.UserController;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.UserService;

@SpringBootTest
class UserTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  private UserController userController;

  @BeforeEach
  void setup() {
    userController = new UserController(userService);
  }

  @Test
  void getUsername() {

    var userId = 2;

    var mock = new User();
    mock.setUserId(userId);
    mock.setUsername("test_user");

    when(userRepository.findByUserId(any(Integer.class))).thenReturn(mock);

    //
    var response = userController.getUsername(mock);
    var responseUser = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(mock.getUserId(), responseUser.getUserId());
    assertEquals(mock.getUsername(), responseUser.getUsername());

    verify(userRepository).findByUserId(any(Integer.class));
  }

  @Test
  void login() {

    var username = "test_user";
    var password = "test_password";

    var mock = new User();
    mock.setUserId(2);
    mock.setUsername(username);
    mock.setPassword(password);

    when(userRepository.findByUsernameAndPassword(any(String.class), any(String.class))).thenReturn(mock);

    //
    var response = userController.login(mock);
    var responseUser = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(mock.getUserId(), responseUser.getUserId());
    assertEquals(mock.getUsername(), responseUser.getUsername());

    verify(userRepository).findByUsernameAndPassword(any(String.class), any(String.class));
  }

  @Test
  void register() {

    var username = "test_user";
    var password = "test_password";

    var mock = new User();
    mock.setUserId(2);
    mock.setUsername(username);
    mock.setPassword(password);

    when(userRepository.findByUsername(any(String.class))).thenReturn(null);
    when(userRepository.save(any(User.class))).thenReturn(mock);

    //
    var response = userController.register(mock);

    assertEquals(200, response.getStatusCode().value());
    assertEquals(response.getBody(), true);

    verify(userRepository).findByUsername(any(String.class));
    verify(userRepository).save(any(User.class));
  }

}
