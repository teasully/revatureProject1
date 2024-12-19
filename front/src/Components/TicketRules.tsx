import { TicketPageType } from "../Pages/Tickets";

interface TicketRulesProps {
  currentView: TicketPageType
}
export default function TicketRules({ currentView }: TicketRulesProps) {

  return (
    <>
      {
        currentView == TicketPageType.CREATE ?
          <>
            <p>To submit a ticket, ticket amount must be greater $0 and the description must not be empty</p>
          </>
          :
          <></>
      }
    </>
  );

}