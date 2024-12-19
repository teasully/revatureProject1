package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table
public class Ticket {

  // PK
  @Column(name = "ticket_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer ticketId;

  // FKs
  @Column(name = "submitted_by_id")
  @JoinColumn(name = "user_id")
  private Integer submittedById;

  @Column(name = "processed_by_id")
  @JoinColumn(name = "user_id")
  private Integer processedById = 1;

  // Data
  @Column
  private Integer status = 0;

  @Column
  private Float amount;

  @Column
  private String description;

  // Constructors
  public Ticket() {
    this.processedById = 1;
  }

  // Getters / Setters
  public Integer getTicketId() {
    return ticketId;
  }

  public void setTicketId(Integer ticketId) {
    this.ticketId = ticketId;
  }

  public Integer getSubmittedById() {
    return submittedById;
  }

  public void setSubmittedById(Integer accountId) {
    this.submittedById = accountId;
  }

  public Integer getProcessedById() {
    return processedById;
  }

  public void setProcessedById(Integer accountId) {
    this.processedById = accountId;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public Float getAmount() {
    return amount;
  }

  public void setAmount(Float amount) {
    this.amount = amount;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
