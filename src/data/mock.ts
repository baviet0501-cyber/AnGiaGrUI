import type { ShowcasePalette } from "@/components";

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



export const consultations: Consultation[] = [
  { id: "skin-care", title: "Tư vấn chăm sóc sức khỏe", status: "Đang theo dõi", updatedAt: "Hôm nay" },
  { id: "nutrition", title: "Lộ trình dinh dưỡng", status: "Chờ bổ sung", updatedAt: "Hôm qua" }
];





