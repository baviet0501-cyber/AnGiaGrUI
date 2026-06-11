export type ChatRole = "customer" | "bot" | "agent";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  body: string;
  createdAt: string;
  crmTicketId?: string;
};

export type ChatbotSession = {
  id: string;
  customerId: string;
  messages: ChatMessage[];
};

export async function createChatbotSession(customerId: string): Promise<ChatbotSession> {
  return {
    id: `chat-${customerId}`,
    customerId,
    messages: [
      {
        id: "welcome",
        role: "bot",
        body: "Xin chào! Tôi có thể hỗ trợ sản phẩm, truy xuất nguồn gốc hoặc tạo yêu cầu CRM.",
        createdAt: new Date().toISOString()
      }
    ]
  };
}
