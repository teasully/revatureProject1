package com.example.demo.Repository;

import com.example.demo.Entity.Ticket;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    // Get account from username
    public Ticket findByTicketId(Integer ticketId);

    public List<Ticket> findAllBySubmittedById(Integer submittedById);
    public List<Ticket> findAllByStatus(Integer status);

  //

}
