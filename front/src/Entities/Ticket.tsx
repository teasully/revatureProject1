export enum TicketStatus {
  NONE,

  PENDING,

  APPROVED,
  DENIED
}
export default class Ticket {
  id: number;

  submittedById: number;
  processById: number;

  amount: number;
  description: string;

  status: TicketStatus;

  constructor(id: number) {
    this.id = id;

    this.submittedById = 0;
    this.processById = 0;

    this.amount = 0;
    this.description = "";

    this.status = TicketStatus.NONE;
  }
}