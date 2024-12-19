import { createContext, Dispatch, SetStateAction, useState } from "react";
import Ticket from "../Entities/Ticket";

export const TicketsContext = createContext(Array<Ticket>());
export const SetTicketsContext = createContext<Dispatch<SetStateAction<Ticket[]>> | undefined>(undefined);

interface TicketProviderProps {
  children: React.ReactNode
}
export default function TicketProvider({ children }: TicketProviderProps) {

  const [tickets, setTickets] = useState(Array<Ticket>());

  return (
    <>
      <TicketsContext.Provider value={tickets}>
        <SetTicketsContext.Provider value={setTickets}>
          {children}
        </SetTicketsContext.Provider>
      </TicketsContext.Provider>
    </>
  );
}