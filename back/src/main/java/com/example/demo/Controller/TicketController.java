package com.example.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.TicketService;
import com.example.demo.Service.UserService;
import com.example.demo.Entity.Ticket;
import com.example.demo.Entity.User;

@RestController
@RequestMapping("/ticket")
public class TicketController {

  TicketService ticketService;
  UserService userService;

  // Constructor
  public TicketController(TicketService ticketService, UserService userService) {
    this.ticketService = ticketService;
    this.userService = userService;
  }

  /// Endpoints
  // Create a new ticket
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/submit")
  public ResponseEntity<Ticket> submit(@RequestBody Ticket ticket) {

    // Sanitize input
    var costAmount = ticket.getAmount();
    var description = ticket.getDescription();
    var submittedById = ticket.getSubmittedById();
    if (costAmount == null ||
        description == null ||
        submittedById == null) {
      return ResponseEntity.status(422).body(null);
    }

    // Check valid cost
    if (costAmount <= 0) {
      return ResponseEntity.status(422).body(null);
    }

    // Check valid description
    if (description.trim().length() == 0) {
      return ResponseEntity.status(422).body(null);
    }

    // Check not submitting as system
    if (submittedById <= 1) {
      return ResponseEntity.status(422).body(null);
    }

    // Check user exists
    var existingUser = userService.getById(submittedById);
    if (existingUser == null) {
      return ResponseEntity.status(404).body(null);
    }

    // Insert new ticket
    var newTicket = new Ticket();
    newTicket.setSubmittedById(submittedById);
    newTicket.setAmount(costAmount);
    newTicket.setDescription(description);
    newTicket.setStatus(0);
    newTicket = ticketService.insertTicket(newTicket);

    // Return ok
    return ResponseEntity.ok(newTicket);
  }

  // Set ticket status
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/setStatus")
  public ResponseEntity<Boolean> setStatus(@RequestBody Ticket ticket) {

    // Sanitize input
    var ticketId = ticket.getTicketId();
    var status = ticket.getStatus();
    var processedById = ticket.getProcessedById();
    if (ticketId == null ||
        status == null ||
        processedById == null) {
      return ResponseEntity.status(422).body(false);
    }

    // Check status cost
    if (status < 0 || status > 3) {
      return ResponseEntity.status(422).body(false);
    }

    // Check ticket exists
    var existingTicket = ticketService.get(ticketId);
    if (existingTicket == null) {
      return ResponseEntity.status(404).body(false);
    }

    // Check same status
    if (status == existingTicket.getStatus()) {
      return ResponseEntity.ok(false);
    }

    // Check process user exists
    var existingUser = userService.getById(processedById);
    if (existingUser == null) {
      return ResponseEntity.status(404).body(false);
    }

    // Update ticket status
    ticketService.setStatus(existingTicket, status);

    // Return ok
    return ResponseEntity.ok(true);
  }

  // Get tickets by user
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/getFor")
  public ResponseEntity<List<Ticket>> getFor(@RequestBody User user) {

    // Sanitize input
    var userId = user.getUserId();
    if (userId == null) {
      return ResponseEntity.status(422).body(null);
    }

    var tickets = ticketService.getFor(userId);

    // Return ok
    return ResponseEntity.ok(tickets);
  }

  // Get all unprocessed tickets (for managers)
  @CrossOrigin(origins = "http://localhost:5174")
  @PostMapping("/getUnprocessed")
  public ResponseEntity<List<Ticket>> getUnprocessed() {

    var tickets = ticketService.getUnprocessed();

    // Return ok
    return ResponseEntity.ok(tickets);
  }
}
