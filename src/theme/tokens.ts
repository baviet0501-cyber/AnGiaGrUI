export const colors = {
  primary: "#77BA00",
  primaryDark: "#3F7200",
  primarySoft: "#EEF8D7",
  secondary: "#00B1D5",
  secondaryDark: "#055E69",
  secondarySoft: "#E5FAFD",
  accent: "#FFED03",
  accentSoft: "#FFF8C5",
  background: "#F6FBEC",
  surface: "#FFFFFF",
  surfaceMuted: "#EDF6DA",
  text: "#0F3B14",
  textMuted: "#5C6E4A",
  border: "#DDE9C4",
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
