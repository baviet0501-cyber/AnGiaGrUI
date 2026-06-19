export const colors = {
  primary: "#00B1D5",
  primaryDark: "#055E69",
  primarySoft: "#E5FAFD",
  secondary: "#77BA00",
  secondaryDark: "#3F7200",
  secondarySoft: "#EEF8D7",
  accent: "#FFED03",
  accentSoft: "#FFF8C5",
  background: "#F4FBF9",
  surface: "#FFFFFF",
  surfaceMuted: "#EAF7F3",
  text: "#073B3F",
  textMuted: "#5F7679",
  border: "#CFE8E4",
  danger: "#D94F4F",
  success: "#65A500",
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
    shadowColor: "#055E69",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  }
} as const;
