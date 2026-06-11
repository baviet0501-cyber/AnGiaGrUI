export type CrmCustomer = {
  id: string;
  fullName: string;
  phone: string;
  segment: "new" | "member" | "vip";
};

export type CrmTicket = {
  id: string;
  customerId: string;
  subject: string;
  status: "open" | "pending" | "closed";
  source: "mobile" | "chatbot";
};

export async function createCrmTicket(ticket: Omit<CrmTicket, "id" | "status">): Promise<CrmTicket> {
  return {
    id: `ticket-${Date.now()}`,
    status: "open",
    ...ticket
  };
}
