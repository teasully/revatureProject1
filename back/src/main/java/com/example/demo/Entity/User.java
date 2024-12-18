package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

  // PK
  @Column(name = "user_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer userId;

  // Data
  @Column
  private String username;

  @Column
  private String password;

  // Constructors
  public User() {
  }

  // Getters / Setters
  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
