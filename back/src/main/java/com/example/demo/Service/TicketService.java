package com.example.demo.Service;

import com.example.demo.Entity.Ticket;
import com.example.demo.Repository.TicketRepository;

import org.springframework.stereotype.Service;

@Service
public class TicketService {

  TicketRepository ticketRepository;

  public TicketService(TicketRepository ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  // Insert a new ticket
  public Ticket insertTicket(Ticket ticket){
    return ticketRepository.save(ticket);
  }

}
