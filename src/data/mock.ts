import type { ShowcasePalette } from "@/components";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  purchaseUrl: string;
  tag: string;
};
export type NewsItem = { id: string; title: string; summary: string; date: string };
export type NotificationItem = { id: string; title: string; body: string; route: string };
export type Consultation = { id: string; title: string; status: string; updatedAt: string };
export type MembershipTierId = "member" | "silver" | "gold" | "platinum" | "diamond";
export type MembershipTier = {
  id: MembershipTierId;
  label: string;
  minPoints: string;
  benefit: string;
  palette: ShowcasePalette;
  progress: string;
};
export type MembershipStats = {
  points: string;
  tier: MembershipTierId;
  historyCount: string;
  verifiedBatches: string;
  responseTime: string;
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "member",
    label: "Member",
    minPoints: "0 điểm",
    benefit: "Tích điểm và tư vấn cơ bản.",
    progress: "20%",
    palette: {
      badgeBackground: "rgba(245,255,250,0.18)",
      border: "rgba(193,255,219,0.28)",
      gradient: ["#064E3B", "#0F8A5F", "#7DDC9F"],
      glow: "rgba(125,220,159,0.28)",
      metricBackground: "rgba(221,255,235,0.16)",
      shine: "rgba(255,255,255,0.16)",
      wash: "rgba(22,163,111,0.20)"
    }
  },
  {
    id: "silver",
    label: "Silver",
    minPoints: "2.000 điểm",
    benefit: "Ưu tiên phản hồi CSKH.",
    progress: "40%",
    palette: {
      badgeBackground: "rgba(245,250,252,0.24)",
      border: "rgba(226,237,241,0.42)",
      gradient: ["#344752", "#6E8793", "#E4EDF1"],
      glow: "rgba(226,237,241,0.34)",
      metricBackground: "rgba(245,250,252,0.18)",
      shine: "rgba(255,255,255,0.25)",
      wash: "rgba(158,181,190,0.22)"
    }
  },
  {
    id: "gold",
    label: "Gold",
    minPoints: "5.000 điểm",
    benefit: "Ưu đãi và quà tặng định kỳ.",
    progress: "60%",
    palette: {
      badgeBackground: "rgba(255,240,190,0.25)",
      border: "rgba(255,215,104,0.42)",
      gradient: ["#254D32", "#A36E12", "#F2C94C"],
      glow: "rgba(242,201,76,0.34)",
      metricBackground: "rgba(255,240,190,0.18)",
      shine: "rgba(255,255,255,0.20)",
      wash: "rgba(136,184,82,0.18)"
    }
  },
  {
    id: "platinum",
    label: "Platinum",
    minPoints: "8.000 điểm",
    benefit: "Chăm sóc nâng cao, ưu đãi riêng.",
    progress: "80%",
    palette: {
      badgeBackground: "rgba(240,248,255,0.26)",
      border: "rgba(225,242,250,0.48)",
      gradient: ["#172A46", "#668AA1", "#F0F6F8"],
      glow: "rgba(225,242,250,0.36)",
      metricBackground: "rgba(240,248,255,0.19)",
      shine: "rgba(255,255,255,0.28)",
      wash: "rgba(116,166,190,0.22)"
    }
  },
  {
    id: "diamond",
    label: "Diamond",
    minPoints: "10.000 điểm",
    benefit: "Đặc quyền cao nhất.",
    progress: "100%",
    palette: {
      badgeBackground: "rgba(230,255,251,0.28)",
      border: "rgba(185,255,246,0.52)",
      gradient: ["#041F2A", "#007F89", "#B9FFF2"],
      glow: "rgba(185,255,246,0.38)",
      metricBackground: "rgba(230,255,251,0.20)",
      shine: "rgba(255,255,255,0.30)",
      wash: "rgba(255,255,255,0.16)"
    }
  }
];

export const membershipStats: MembershipStats = {
  points: "1.250",
  tier: "diamond",
  historyCount: "12",
  verifiedBatches: "08",
  responseTime: "2h"
};

export const activeMembershipTier = membershipTiers.find(tier => tier.id === membershipStats.tier) ?? membershipTiers[0];

export const products: Product[] = [
  {
    id: "tra-giao-co-lam",
    name: "Trà giảo cổ lam",
    description: "Dược liệu sạch • phơi sấy chuẩn • không phụ gia",
    price: "119.000đ",
    purchaseUrl: "https://angiagreen.example/products/tra-giao-co-lam",
    tag: "VietGAP"
  },
  {
    id: "cao-ca-gai-leo",
    name: "Cao cà gai leo",
    description: "Dược liệu sạch • phơi sấy chuẩn • không phụ gia",
    price: "159.000đ",
    purchaseUrl: "https://angiagreen.example/products/cao-ca-gai-leo",
    tag: "Nam dược"
  },
  {
    id: "bot-sam-bo-chinh",
    name: "Bột sâm bố chính",
    description: "Dược liệu sạch • phơi sấy chuẩn • không phụ gia",
    price: "189.000đ",
    purchaseUrl: "https://angiagreen.example/products/bot-sam-bo-chinh",
    tag: "Mới"
  }
];

export const news: NewsItem[] = [
  { id: "traceability", title: "Minh bạch nguồn gốc sản phẩm", summary: "Cách kiểm tra lô hàng và chứng nhận chất lượng.", date: "08/06/2026" },
  { id: "wellness", title: "Chương trình hội viên An Gia Green", summary: "Tích điểm, nhận tư vấn và ưu đãi cá nhân hóa.", date: "06/06/2026" }
];

export const notifications: NotificationItem[] = [
  { id: "batch", title: "Lô hàng đã xác thực", body: "Sản phẩm bạn quan tâm có chứng nhận mới.", route: "/(tabs)/trace" },
  { id: "consult", title: "Tư vấn viên đã phản hồi", body: "Xem cập nhật trong hồ sơ tư vấn.", route: "/consultation/skin-care" }
];

export const consultations: Consultation[] = [
  { id: "skin-care", title: "Tư vấn chăm sóc sức khỏe", status: "Đang theo dõi", updatedAt: "Hôm nay" },
  { id: "nutrition", title: "Lộ trình dinh dưỡng", status: "Chờ bổ sung", updatedAt: "Hôm qua" }
];





