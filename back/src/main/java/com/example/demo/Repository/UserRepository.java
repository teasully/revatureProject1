package com.example.demo.Repository;

import com.example.demo.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  // Get account from username
  public User findByUserId(Integer userId);

  //
  public User findByUsername(String username);
  public User findByUsernameAndPassword(String username, String password);

}
