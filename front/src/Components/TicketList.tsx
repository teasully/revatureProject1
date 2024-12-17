import Ticket from "../Entities/Ticket";
import { TicketPageType } from "../Pages/Tickets";
import TicketDisplay from "./TicketDisplay";

interface TicketListProps {
  tickets: Ticket[],

  viewType: TicketPageType
}
export default function TicketList(props: TicketListProps) {

  const tickets = props.tickets;
  const viewType = props.viewType;

  return (
    <>
      {tickets.map((ticket: Ticket) => {
        return (
          <TicketDisplay ticket={ticket} viewType={viewType} key={ticket.id} />
        );
      })}
    </>
  );
}