export const colors = {
  primary: "#0F8F5F",
  primaryDark: "#076B46",
  primarySoft: "#E7F6EF",
  secondary: "#FFB84D",
  background: "#F6FBF8",
  surface: "#FFFFFF",
  surfaceMuted: "#F0F6F2",
  text: "#17322A",
  textMuted: "#6B7D76",
  border: "#DCE8E2",
  danger: "#D94F4F",
  success: "#28A36A",
  white: "#FFFFFF"
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999
} as const;

export const typography = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: "800" },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: "800" },
  h3: { fontSize: 18, lineHeight: 26, fontWeight: "700" },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" },
  label: { fontSize: 14, lineHeight: 20, fontWeight: "700" },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "500" }
} as const;

export const shadows = {
  card: {
    shadowColor: "#0B3D2C",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  }
} as const;
