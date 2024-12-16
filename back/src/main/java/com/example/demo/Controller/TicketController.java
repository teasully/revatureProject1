package com.example.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.TicketService;
import com.example.demo.Entity.Ticket;
import com.example.demo.Entity.User;

@RestController
@RequestMapping("/ticket")
public class TicketController {

  TicketService ticketService;

  // Constructor
  public TicketController(TicketService ticketService) {
    this.ticketService = ticketService;
  }

  // Endpoints
  @GetMapping("/hello")
  public String sayHello() {

    var ticket = new Ticket(new User());
    ticketService.insertTicket(ticket);

    return "Hello, World!";
  }
}
