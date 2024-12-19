package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.Controller.TicketController;
import com.example.demo.Entity.Ticket;
import com.example.demo.Entity.User;
import com.example.demo.Repository.TicketRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.TicketService;
import com.example.demo.Service.UserService;

@SpringBootTest
class TicketTest {

  @Mock
  private TicketRepository ticketRepository;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private TicketService ticketService;

  @InjectMocks
  private UserService userService;

  private TicketController ticketController;

  @BeforeEach
  void setup() {
    ticketController = new TicketController(ticketService, userService);
  }

  @Test
  void submit() {

    var mock = new Ticket();
    mock.setTicketId(1);
    mock.setAmount(1f);
    mock.setStatus(0);
    mock.setSubmittedById(2);
    mock.setProcessedById(3);
    mock.setDescription("Test description");

    when(userRepository.findByUserId(any(Integer.class))).thenReturn(new User());
    when(ticketRepository.save(any(Ticket.class))).thenReturn(mock);

    //
    var response = ticketController.submit(mock);
    var responseTicket = response.getBody();

    assertEquals(200, response.getStatusCode().value());

    assertEquals(mock.getTicketId(), responseTicket.getTicketId());
    assertEquals(mock.getStatus(), responseTicket.getStatus());
    assertEquals(mock.getAmount(), responseTicket.getAmount());
    assertEquals(mock.getSubmittedById(), responseTicket.getSubmittedById());
    assertEquals(mock.getProcessedById(), responseTicket.getProcessedById());
    assertEquals(mock.getDescription(), responseTicket.getDescription());

    verify(userRepository).findByUserId(any(Integer.class));
    verify(ticketRepository).save(any(Ticket.class));
  }

  @Test
  void submit_nullDescription() {

    var mock = new Ticket();
    mock.setAmount(1f);
    mock.setDescription(null);

    //
    var response = ticketController.submit(mock);
    var responseTicket = response.getBody();

    assertEquals(422, response.getStatusCode().value());
    assertEquals(null, responseTicket);
  }

  @Test
  void submit_zeroAmount() {

    var mock = new Ticket();
    mock.setSubmittedById(2);
    mock.setDescription("Test description");
    mock.setAmount(0f);

    //
    var response = ticketController.submit(mock);
    var responseTicket = response.getBody();

    assertEquals(422, response.getStatusCode().value());
    assertEquals(null, responseTicket);
  }

  @Test
  void submit_emptyDescription() {

    var mock = new Ticket();
    mock.setSubmittedById(2);
    mock.setDescription("");
    mock.setAmount(1f);

    //
    var response = ticketController.submit(mock);
    var responseTicket = response.getBody();

    assertEquals(422, response.getStatusCode().value());
    assertEquals(null, responseTicket);
  }

  @Test
  void submit_bySystem() {

    var mock = new Ticket();
    mock.setSubmittedById(1);
    mock.setDescription("test_description");
    mock.setAmount(1f);

    //
    var response = ticketController.submit(mock);
    var responseTicket = response.getBody();

    assertEquals(422, response.getStatusCode().value());
    assertEquals(null, responseTicket);
  }

  @Test
  void submit_invalidUser() {

    var mock = new Ticket();
    mock.setSubmittedById(5);
    mock.setDescription("test_description");
    mock.setAmount(1f);

    when(userRepository.findByUserId(any(Integer.class))).thenReturn(null);

    //
    var response = ticketController.submit(mock);
    var responseTicket = response.getBody();

    assertEquals(404, response.getStatusCode().value());
    assertEquals(null, responseTicket);

    verify(userRepository).findByUserId(any(Integer.class));
  }

  @Test
  void setStatus() {

    var mock = new Ticket();
    mock.setTicketId(1);
    mock.setAmount(1f);
    mock.setStatus(0);
    mock.setSubmittedById(2);
    mock.setProcessedById(3);
    mock.setDescription("Test description");

    var mockUpdated = new Ticket();
    mockUpdated.setTicketId(1);
    mockUpdated.setAmount(1f);
    mockUpdated.setStatus(1);
    mockUpdated.setSubmittedById(2);
    mockUpdated.setProcessedById(3);
    mockUpdated.setDescription("Test description");

    when(ticketRepository.findByTicketId(any(Integer.class))).thenReturn(mock);
    when(userRepository.findByUserId(any(Integer.class))).thenReturn(new User());
    when(ticketRepository.save(any(Ticket.class))).thenReturn(mockUpdated);

    //
    var response = ticketController.setStatus(mockUpdated);

    assertEquals(200, response.getStatusCode().value());
    assertEquals(response.getBody(), true);

    verify(ticketRepository).findByTicketId(any(Integer.class));
    verify(userRepository).findByUserId(any(Integer.class));
    verify(ticketRepository).save(any(Ticket.class));
  }

  @Test
  void getFor() {

    var mock0 = new Ticket();
    mock0.setTicketId(1);
    mock0.setAmount(1f);
    mock0.setStatus(1);
    mock0.setSubmittedById(2);
    mock0.setProcessedById(4);
    mock0.setDescription("Test description1");
    var mock1 = new Ticket();
    mock1.setTicketId(2);
    mock1.setAmount(10f);
    mock1.setStatus(2);
    mock1.setSubmittedById(2);
    mock1.setProcessedById(3);
    mock1.setDescription("Test description2");

    var mockedList = List.of(mock0, mock1);

    var mockUser = new User();
    mockUser.setUserId(2);

    when(ticketRepository.findAllBySubmittedById(any(Integer.class))).thenReturn(mockedList);

    //
    var response = ticketController.getFor(mockUser);
    var responseTickets = response.getBody();

    assertEquals(200, response.getStatusCode().value());

    assertEquals(mock0.getTicketId(), responseTickets.get(0).getTicketId());
    assertEquals(mock0.getStatus(), responseTickets.get(0).getStatus());
    assertEquals(mock0.getAmount(), responseTickets.get(0).getAmount());
    assertEquals(mock0.getSubmittedById(), responseTickets.get(0).getSubmittedById());
    assertEquals(mock0.getProcessedById(), responseTickets.get(0).getProcessedById());
    assertEquals(mock0.getDescription(), responseTickets.get(0).getDescription());

    assertEquals(mock1.getTicketId(), responseTickets.get(1).getTicketId());
    assertEquals(mock1.getStatus(), responseTickets.get(1).getStatus());
    assertEquals(mock1.getAmount(), responseTickets.get(1).getAmount());
    assertEquals(mock1.getSubmittedById(), responseTickets.get(1).getSubmittedById());
    assertEquals(mock1.getProcessedById(), responseTickets.get(1).getProcessedById());
    assertEquals(mock1.getDescription(), responseTickets.get(1).getDescription());

    verify(ticketRepository).findAllBySubmittedById(any(Integer.class));
  }

  @Test
  void getUnprocessed() {

    var userId = 2;

    var mock0 = new Ticket();
    mock0.setTicketId(1);
    mock0.setAmount(1f);
    mock0.setStatus(1);
    mock0.setSubmittedById(userId);
    mock0.setProcessedById(4);
    mock0.setDescription("Test description1");
    var mock1 = new Ticket();
    mock1.setTicketId(2);
    mock1.setAmount(10f);
    mock1.setStatus(2);
    mock1.setSubmittedById(userId);
    mock1.setProcessedById(3);
    mock1.setDescription("Test description2");

    var mockedList = List.of(mock0, mock1);

    when(ticketRepository.findAllByStatus(any(Integer.class))).thenReturn(mockedList);

    //
    var response = ticketController.getUnprocessed();
    var responseTickets = response.getBody();

    assertEquals(mock0.getTicketId(), responseTickets.get(0).getTicketId());
    assertEquals(mock0.getStatus(), responseTickets.get(0).getStatus());
    assertEquals(mock0.getAmount(), responseTickets.get(0).getAmount());
    assertEquals(mock0.getSubmittedById(), responseTickets.get(0).getSubmittedById());
    assertEquals(mock0.getProcessedById(), responseTickets.get(0).getProcessedById());
    assertEquals(mock0.getDescription(), responseTickets.get(0).getDescription());

    assertEquals(mock1.getTicketId(), responseTickets.get(1).getTicketId());
    assertEquals(mock1.getStatus(), responseTickets.get(1).getStatus());
    assertEquals(mock1.getAmount(), responseTickets.get(1).getAmount());
    assertEquals(mock1.getSubmittedById(), responseTickets.get(1).getSubmittedById());
    assertEquals(mock1.getProcessedById(), responseTickets.get(1).getProcessedById());
    assertEquals(mock1.getDescription(), responseTickets.get(1).getDescription());

    verify(ticketRepository).findAllByStatus(any(Integer.class));
  }

}
