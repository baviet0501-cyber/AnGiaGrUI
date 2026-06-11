export type Product = { id: string; name: string; description: string; price: string; tag: string };
export type NewsItem = { id: string; title: string; summary: string; date: string };
export type NotificationItem = { id: string; title: string; body: string; route: string };
export type Consultation = { id: string; title: string; status: string; updatedAt: string };

export const products: Product[] = [
  { id: "tra-giao-co-lam", name: "Trà giảo cổ lam", description: "Dược liệu sạch • phơi sấy chuẩn • không phụ gia", price: "119.000đ", tag: "VietGAP" },
  { id: "cao-ca-gai-leo", name: "Cao cà gai leo", description: "Dược liệu sạch • phơi sấy chuẩn • không phụ gia", price: "159.000đ", tag: "Nam dược" },
  { id: "bot-sam-bo-chinh", name: "Bột sâm bố chính", description: "Dược liệu sạch • phơi sấy chuẩn • không phụ gia", price: "189.000đ", tag: "Mới" }
];

export const news: NewsItem[] = [
  { id: "traceability", title: "Minh bạch nguồn gốc sản phẩm", summary: "Cách kiểm tra lô hàng và chứng nhận chất lượng.", date: "08/06/2026" },
  { id: "wellness", title: "Chương trình hội viên An Gia Green", summary: "Tích điểm, nhận tư vấn và ưu đãi cá nhân hóa.", date: "06/06/2026" }
];

export const notifications: NotificationItem[] = [
  { id: "batch", title: "Lô hàng đã xác thực", body: "Sản phẩm bạn quan tâm có chứng nhận mới.", route: "/trace" },
  { id: "consult", title: "Tư vấn viên đã phản hồi", body: "Xem cập nhật trong hồ sơ tư vấn.", route: "/consultation/skin-care" }
];

export const consultations: Consultation[] = [
  { id: "skin-care", title: "Tư vấn chăm sóc sức khỏe", status: "Đang theo dõi", updatedAt: "Hôm nay" },
  { id: "nutrition", title: "Lộ trình dinh dưỡng", status: "Chờ bổ sung", updatedAt: "Hôm qua" }
];
