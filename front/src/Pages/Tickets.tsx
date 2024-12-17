import { useContext, useState } from "react";
import TicketList from "../Components/TicketList";
import { UserContext } from "../UserContext";
import { UserType } from "../Entities/User";
import Ticket from "../Entities/Ticket";

export enum TicketPageType {
  NONE,

  CREATE,
  PROCESS,
}

function Tickets() {


  const [currentView, setView] = useState(TicketPageType.CREATE);
  const userContext = useContext(UserContext);

  return (
    <>
      <h1>Tickets</h1>
      <p>
        This is where you can submit new reimbursment tickets. If you are a manager, you can process those tickets.
      </p>

      <p>User role: {userContext.role}</p>

      {
        userContext.role == UserType.MANAGER ? (
          <>
            <button onClick={() => { setView(TicketPageType.CREATE) }}>Create Ticket</button>
            <button onClick={() => { setView(TicketPageType.PROCESS) }}>Process Tickets</button>
            <hr />
          </>
        ) : <></>
      }

      <hr />

      <h2>Ticket mode: {currentView == TicketPageType.CREATE ? "Create" : "Process"}</h2>

      {
        currentView == TicketPageType.CREATE ?
          <TicketList tickets={[
            new Ticket(-1)
          ]} viewType={currentView} />
          :
          <TicketList tickets={[
            new Ticket(0),
            new Ticket(1)
          ]} viewType={currentView} />
      }

    </>
  );
}

export default Tickets;