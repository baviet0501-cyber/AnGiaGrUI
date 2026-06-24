import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { DimensionValue, Pressable, PressableProps, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius, shadows, spacing, typography } from "@/theme";

export type ShowcasePalette = {
  badgeBackground: string;
  border: string;
  gradient: readonly [string, string, string];
  glow: string;
  metricBackground: string;
  shine: string;
  wash: string;
};

type ShowcaseHeroProps = {
  body: string;
  children?: ReactNode;
  eyebrow?: string;
  palette?: ShowcasePalette;
  style?: StyleProp<ViewStyle>;
  title: string;
};

type FeatureTileProps = Omit<PressableProps, "style"> & {
  body: string;
  icon?: ReactNode;
  meta?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
};

type Metric = {
  label: string;
  value: string;
};

const defaultPalette: ShowcasePalette = {
  badgeBackground: "rgba(255,255,255,0.16)",
  border: "rgba(255,255,255,0.22)",
  gradient: [colors.secondaryDark, colors.primaryDark, colors.primary],
  glow: "rgba(255,237,3,0.22)",
  metricBackground: "rgba(229,250,253,0.16)",
  shine: "rgba(255,255,255,0.18)",
  wash: "rgba(119,186,0,0.18)"
};

export function ShowcaseHero({ eyebrow, title, body, children, palette = defaultPalette, style }: ShowcaseHeroProps) {
  return (
    <LinearGradient
      colors={palette.gradient}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.52, 1]}
      start={{ x: 0, y: 0 }}
      style={[styles.hero, { borderColor: palette.border }, style]}
    >
      <View style={[styles.heroGlow, { backgroundColor: palette.glow }]} />
      <LinearGradient colors={["transparent", palette.shine, "transparent"]} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={styles.heroSheen} />
      {eyebrow ? <Text style={[styles.eyebrow, { backgroundColor: palette.badgeBackground }]}>{eyebrow}</Text> : null}
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroBody}>{body}</Text>
      {children ? <View style={styles.heroSlot}>{children}</View> : null}
    </LinearGradient>
  );
}

type MemberCardProps = {
  badge: string;
  body: string;
  palette?: ShowcasePalette;
  points: string;
  progress: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

export function MemberCard({ badge, body, points, progress, palette = defaultPalette, style }: MemberCardProps) {
  return (
    <LinearGradient
      colors={palette.gradient}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.52, 1]}
      start={{ x: 0, y: 0 }}
      style={[styles.memberCard, { borderColor: palette.border }, style]}
    >
      <View style={[styles.memberGlow, { backgroundColor: palette.glow }]} />
      <LinearGradient colors={["transparent", palette.shine, "transparent"]} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={styles.memberSheen} />
      <Text style={[styles.memberBadge, { backgroundColor: palette.badgeBackground }]}>{badge}</Text>
      <Text style={styles.memberPoints}>{points} điểm an tâm</Text>
      <Text style={styles.memberBody}>{body}</Text>
      <View style={styles.progressTrack}>
        <LinearGradient colors={palette.gradient} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={[styles.progressFill, { width: progress }]} />
      </View>
    </LinearGradient>
  );
}

export function FeatureTile({ icon, title, body, meta, style, disabled, onPress, ...props }: FeatureTileProps) {
  const content = (
    <>
      <View style={styles.tileTop}>
        {icon ? <View style={styles.tileIcon}>{icon}</View> : null}
        {meta ? <Text style={styles.tileMeta}>{meta}</Text> : null}
      </View>
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileBody}>{body}</Text>
    </>
  );

  if (!onPress) {
    return <View style={[styles.tile, style]}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed, disabled && styles.disabled, style]}
      {...props}
    >
      {content}
    </Pressable>
  );
}

export function MetricStrip({ items, palette = defaultPalette }: { items: Metric[]; palette?: ShowcasePalette }) {
  return (
    <View style={styles.metricStrip}>
      {items.map(item => (
        <View key={item.label} style={[styles.metricItem, { backgroundColor: palette.metricBackground }]}>
          <Text style={styles.metricValue}>{item.value}</Text>
          <Text style={styles.metricLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.xl,
    overflow: "hidden",
    padding: spacing.lg,
    ...shadows.card
  },
  heroGlow: {
    borderRadius: radius.pill,
    height: 124,
    position: "absolute",
    right: -38,
    top: -52,
    width: 124
  },
  heroSheen: {
    height: 176,
    left: -58,
    opacity: 0.82,
    position: "absolute",
    top: -28,
    transform: [{ rotate: "-18deg" }],
    width: 94
  },
  eyebrow: {
    ...typography.caption,
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    color: colors.white,
    marginBottom: spacing.md,
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: 6
  },
  heroTitle: { ...typography.h1, color: colors.white, fontSize: 28, lineHeight: 35 },
  heroBody: { ...typography.body, color: "rgba(255,255,255,0.9)", marginTop: spacing.sm },
  heroSlot: { marginTop: spacing.lg },
  memberCard: { borderRadius: radius.lg, borderWidth: 1, overflow: "hidden", padding: spacing.lg, ...shadows.card },
  memberGlow: { borderRadius: radius.pill, height: 124, position: "absolute", right: -38, top: -52, width: 124 },
  memberSheen: { height: 176, left: -58, opacity: 0.82, position: "absolute", top: -28, transform: [{ rotate: "-18deg" }], width: 94 },
  memberBadge: { ...typography.caption, alignSelf: "flex-start", borderRadius: radius.pill, color: colors.white, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 5 },
  memberPoints: { ...typography.h2, color: colors.white, marginTop: spacing.md },
  memberBody: { ...typography.body, color: "rgba(255,255,255,0.9)", marginTop: spacing.xs },
  progressTrack: { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: radius.pill, height: 6, marginTop: spacing.md, overflow: "hidden" },
  progressFill: { borderRadius: radius.pill, height: 6 },
  tile: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    minHeight: 134,
    padding: spacing.lg,
    ...shadows.card
  },
  tileTop: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", minHeight: 34 },
  tileIcon: { alignItems: "center", backgroundColor: colors.primarySoft, borderRadius: radius.pill, height: 34, justifyContent: "center", width: 34 },
  tileMeta: { ...typography.caption, color: colors.primaryDark, fontWeight: "800" },
  tileTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md },
  tileBody: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.55 },
  metricStrip: { flexDirection: "row", gap: spacing.sm },
  metricItem: {
    borderRadius: radius.md,
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  metricValue: { ...typography.h3, color: colors.white },
  metricLabel: { ...typography.caption, color: "rgba(255,255,255,0.78)", marginTop: 2 }
});
