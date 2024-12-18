export enum TicketStatus {
  PENDING,

  APPROVED,
  DENIED
}
export default class Ticket {
  ticketId: number;

  submittedById: number;
  processById: number;

  amount: number;
  description: string;

  status: TicketStatus;

  constructor(ticketId: number) {
    this.ticketId = ticketId;

    this.submittedById = 0;
    this.processById = 0;

    this.amount = 0;
    this.description = "";

    this.status = TicketStatus.PENDING;
  }
}