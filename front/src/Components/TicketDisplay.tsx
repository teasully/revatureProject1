import Ticket from "../Entities/Ticket";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { InputGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { TicketPageType } from "../Pages/Tickets";
import { SetTicketsContext, TicketsContext } from "./TicketContext";

// Defines the display structure of a ticket- displays differently if creating a ticket or viewing a past ticket
interface TicketListProps {
  ticket: Ticket;

  viewType: TicketPageType
}
export default function TicketDisplay(props: TicketListProps) {

  const ticket = props.ticket;
  const viewType = props.viewType;

  const userContext = useContext(UserContext);

  const [ticketAmount, setTicketAmount] = useState(0);
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketUser, setTicketUser] = useState('');
  const [ticketStatus, setTicketStatus] = useState(ticket.status);

  const ticketsContext = useContext(TicketsContext);
  const setTicketsContext = useContext(SetTicketsContext);

  // Attempt to gather all users tickets
  async function fetchSubmitTicket(onSuccess: Function, onFail: Function) {
    try {
      const response = await fetch('http://localhost:8080/ticket/submit', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submittedById: userContext.userId,
          amount: ticketAmount,
          description: ticketDescription
        })
      });
      if (!response.ok) {
        onFail("Invalid ticket information");
        return;
      }

      const json = await response.json();

      // If got json response, set context
      if (json) {
        onSuccess();

        setTicketsContext?.([json, ...ticketsContext]);
      } else {
        onFail("Invalid ticket information");
      }
    } catch (e) {
      console.log(e);

      onFail("Internal server error");
    }
  }

  async function fetchSetStatus(status: number, onSuccess: Function, onFail: Function) {
    try {
      const response = await fetch('http://localhost:8080/ticket/setStatus', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket.ticketId,
          status: status
        })
      });
      if (!response.ok) {
        onFail("Invalid ticket information");
        return;
      }

      const json = await response.json();

      // If got json response, set context
      if (json) {
        setTicketStatus(status);

        onSuccess();
      } else {
        onFail("Invalid ticket information");
      }
    } catch (e) {
      console.log(e);

      onFail("Internal server error");
    }
  }

  async function fetchUsername(onSuccess: Function, onFail: Function) {

    if (ticket.submittedById == 0)
      return;

    try {
      const response = await fetch('http://localhost:8080/user/getName', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: ticket.submittedById
        })
      });
      if (!response.ok) {
        onFail("Invalid ticket information");
        return;
      }

      const json = await response.json();

      // If got json response, set context
      if (json) {
        setTicketUser(json.username);

        onSuccess();
      } else {
        onFail("Invalid ticket information");
      }
    } catch (e) {
      console.log(e);

      onFail("Internal server error");
    }
  }
  useEffect(() => {
    fetchUsername(() => { }, (message: string) => { });
  }, []);

  return (

    viewType == TicketPageType.PROCESS && ticketStatus != 0 ? <></>
      :
      <Card style={{ width: 400 }}>
        <Card.Body>
          <Form onSubmit={(e: any) => {
            e.preventDefault();

            console.log("Form submitted");
          }}>

            <Card.Title>
              <Form.Group as={Row} className="mb-3" controlId="ticketId">
                <Form.Label column sm="4">
                  Ticket #
                </Form.Label>
                <Col>
                  {viewType == TicketPageType.CREATE ?
                    <Form.Control plaintext readOnly defaultValue="---" />
                    :
                    <Form.Control plaintext readOnly defaultValue={ticket.ticketId} />
                  }
                </Col>
              </Form.Group>
            </Card.Title>

            <Form.Group as={Row} className="mb-3" controlId="submittedBy">
              <Form.Label column sm="4">
                Submitted by
              </Form.Label>
              <Col>
                <Form.Control plaintext readOnly defaultValue={viewType == TicketPageType.CREATE || viewType == TicketPageType.VIEW ? `${userContext.username} (you)` : ticketUser} />
              </Col>
            </Form.Group>

            <InputGroup className="mb-3">
              <Form.Label column sm="4">
                Amount
              </Form.Label>
              <InputGroup.Text>$</InputGroup.Text>
              {viewType == TicketPageType.CREATE ?
                <Form.Control id="createTicketAmount" type='number' aria-label="Amount (to the nearest dollar)" placeholder="0.00" onChange={(e) => { setTicketAmount(parseFloat(e.currentTarget.value)); }} />
                :
                <Form.Control disabled aria-label="Amount (to the nearest dollar)" value={ticket.amount} />
              }
            </InputGroup>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              {viewType == TicketPageType.CREATE ?
                <Form.Control id="createTicketDescription" as="textarea" rows={3} onChange={(e) => { setTicketDescription(e.currentTarget.value); }} />
                :
                <Form.Control as="textarea" rows={3} disabled value={ticket.description} />
              }
            </Form.Group>

            {
              viewType == TicketPageType.CREATE ? (
                <>
                  <Button variant="success" onClick={(e) => {
                    var currentTarget = e.currentTarget;
                    currentTarget.disabled = true;

                    let amountText = (document.getElementById("createTicketAmount") as HTMLInputElement);
                    let descriptionText = (document.getElementById("createTicketDescription") as HTMLInputElement);

                    let submitMessage = (document.getElementById("submitMessage") as HTMLElement);

                    fetchSubmitTicket(
                      () => {
                        currentTarget.disabled = false;

                        amountText.value = descriptionText.value = "";
                        setTicketAmount(0);
                        setTicketDescription("");

                        submitMessage.innerHTML = "Ticket submitted!"
                        submitMessage.style.color = "green";
                      }, (message: string) => {
                        console.error(message);

                        currentTarget.disabled = false;

                        submitMessage.innerHTML = "Error submitting ticket"
                        submitMessage.style.color = "red";
                      });
                  }}>Submit</Button>

                  <hr />
                  <p id='submitMessage'></p>
                </>
              ) : (
                viewType == TicketPageType.PROCESS ?
                  <>
                    <Button variant="success" onClick={() => { fetchSetStatus(1, () => { }, () => { }) }}>Approve</Button>
                    <Button variant="danger" onClick={() => { fetchSetStatus(2, () => { }, () => { }) }}>Deny</Button>
                  </>
                  :
                  <>
                  </>
              )

            }

            {
              viewType == TicketPageType.VIEW ?
                <>
                  <Form.Group as={Row} className="mb-3" controlId="status">
                    <Form.Label column sm="4">
                      Status:
                    </Form.Label>
                    <Col>
                      <Form.Control disabled value={ticketStatus == 0 ? "pending" : (ticketStatus == 1 ? "approved" : "denied")} style={{ color: ticketStatus == 0 ? 'black' : (ticketStatus == 1 ? 'green' : 'red') }} />
                    </Col>
                  </Form.Group>
                </>
                :
                <></>
            }

          </Form>
        </Card.Body>
      </Card>
  );

}