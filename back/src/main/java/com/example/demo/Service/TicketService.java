package com.example.demo.Service;

import com.example.demo.Entity.Ticket;
import com.example.demo.Repository.TicketRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TicketService {

  TicketRepository ticketRepository;

  public TicketService(TicketRepository ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  // Insert a new ticket
  public Ticket insertTicket(Ticket ticket) {
    return ticketRepository.save(ticket);
  }

  // Check if user exists
  public Ticket get(int id) {
    var ticket = ticketRepository.findByTicketId(id);
    return ticket;
  }

  public List<Ticket> getFor(int userId) {
    return ticketRepository.findAllBySubmittedById(userId);
  }

  public List<Ticket> getUnprocessed() {
    return ticketRepository.findAllByStatus(0);
  }

  // Update the status of a ticket
  public Ticket setStatus(Ticket ticket, int newStatus) {
    ticket.setStatus(newStatus);

    ticketRepository.save(ticket);

    return ticket;
  }

}
