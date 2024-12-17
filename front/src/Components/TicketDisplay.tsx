import Ticket from "../Entities/Ticket";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { InputGroup } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { TicketPageType } from "../Pages/Tickets";

// Defines the display structure of a ticket- displays differently if creating a ticket or viewing a past ticket
interface TicketListProps {
  ticket: Ticket;

  viewType: TicketPageType
}
export default function TicketDisplay(props: TicketListProps) {

  const ticket = props.ticket;
  const viewType = props.viewType;

  const userContext = useContext(UserContext);

  return (
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
                  <Form.Control plaintext readOnly defaultValue={ticket.id} />
                }
              </Col>
            </Form.Group>
          </Card.Title>

          <Form.Group as={Row} className="mb-3" controlId="submittedBy">
            <Form.Label column sm="4">
              Submitted by
            </Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue={viewType == TicketPageType.CREATE ? userContext.username : ticket.submittedById} />
            </Col>
          </Form.Group>

          <InputGroup className="mb-3">
            <Form.Label column sm="4">
              Amount
            </Form.Label>
            <InputGroup.Text>$</InputGroup.Text>
            {viewType == TicketPageType.CREATE ?
              <Form.Control aria-label="Amount (to the nearest dollar)" placeholder="0.00" />
              :
              <Form.Control disabled aria-label="Amount (to the nearest dollar)" defaultValue="19,300.43" />
            }
          </InputGroup>

          {
            viewType == TicketPageType.CREATE ?
              <Button variant="success">Submit</Button>
              :
              (
                <>
                  <Button variant="success">Approve</Button>
                  <Button variant="danger">Deny</Button>
                </>
              )

          }

        </Form>
      </Card.Body>
    </Card>
  );

}