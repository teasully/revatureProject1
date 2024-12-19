import { useContext, useEffect, useState } from "react";
import TicketList from "../Components/TicketList";
import { UserContext } from "../UserContext";
import { UserRole } from "../Entities/User";
import Ticket from "../Entities/Ticket";
import { SetTicketsContext, TicketsContext } from "../Components/TicketContext";
import { Button } from "react-bootstrap";

export const enum TicketPageType {
  NONE,

  CREATE,
  PROCESS,

  VIEW,
}

function Tickets() {

  const userContext = useContext(UserContext);
  const [currentView, setView] = useState(userContext.role == UserRole.EMPLOYEE ? TicketPageType.CREATE : TicketPageType.PROCESS);

  const ticketContext = useContext(TicketsContext);
  const setTicketContext = useContext(SetTicketsContext);

  // Attempt to gather tickets
  async function fetchTicketsFor(onSuccess: Function, onFail: Function) {
    try {
      const response = await fetch('http://localhost:8080/ticket/getFor', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userContext.userId
        })
      });
      if (!response.ok) {
        onFail("Invalid user account");
        return;
      }

      const json = await response.json();

      // If got json response, set context
      if (json) {
        onSuccess();

        setTicketContext?.(json.reverse());
      } else {
        onFail("Invalid user account");
      }
    } catch (e) {
      console.log(e);

      onFail("Internal server error");
    }
  }
  async function fetchTicketsUnprocessed(onSuccess: Function, onFail: Function) {
    try {
      const response = await fetch('http://localhost:8080/ticket/getUnprocessed', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        onFail("Invalid user account");
        return;
      }

      const json = await response.json();

      // If got json response, set context
      if (json) {
        onSuccess();

        setTicketContext?.(json);
      } else {
        onFail("Invalid user account");
      }
    } catch (e) {
      console.log(e);

      onFail("Internal server error");
    }
  }

  // Load current tickets on page load
  useEffect(() => {
    if (userContext.role == UserRole.EMPLOYEE)
      fetchTicketsFor(() => { }, () => { });
    else
      fetchTicketsUnprocessed(() => { }, () => { });
  }, []);

  return (
    <>
      <h1>Tickets</h1>
      <p>
        This page is for the creation and management of reimbursement tickets. If your role is employee, you can submit a new reimbursement ticket to be processed. You can also view you current and past tickets. If your role is manager, you can process unprocessed tickets.
      </p>

      <p><strong>User role:</strong> {userContext.role == 1 ? 'Employee' : 'Manager'}</p>

      {
        userContext.role == UserRole.EMPLOYEE ? (
          <>
            <hr />
            <Button onClick={() => { setView(TicketPageType.CREATE); }}>Create Ticket</Button>
            <Button variant="secondary" onClick={() => { fetchTicketsFor(() => { }, () => { }); setView(TicketPageType.VIEW); }}>View Your Tickets</Button>
          </>) : (
          <>
          //<Button variant="warning" onClick={() => { fetchTicketsUnprocessed(() => { }, () => { }); setView(TicketPageType.PROCESS) }}>Pending Tickets</Button>
          </>
        )
      }
      <hr />

      <h4>Ticket mode: {currentView == TicketPageType.CREATE ? "Create" : (currentView == TicketPageType.PROCESS ? "Pending" : "View")}</h4>

      {currentView == TicketPageType.CREATE ?
        <>
          <p>To submit a ticket, ticket amount must be greater $0 and the description must not be empty</p>
        </> : <></> }

      {
        currentView == TicketPageType.CREATE ?
          <TicketList tickets={[new Ticket(-1)]} viewType={currentView} />
          :
          <TicketList tickets={ticketContext} viewType={currentView} />
      }

    </>
  );
}

export default Tickets;