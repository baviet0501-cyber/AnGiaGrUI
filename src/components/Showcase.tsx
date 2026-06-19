import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radius, shadows, spacing, typography } from "@/theme";

type ShowcaseHeroProps = {
  body: string;
  children?: ReactNode;
  eyebrow?: string;
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

export function ShowcaseHero({ eyebrow, title, body, children, style }: ShowcaseHeroProps) {
  return (
    <LinearGradient
      colors={[colors.secondaryDark, colors.primaryDark, colors.primary]}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.48, 1]}
      start={{ x: 0, y: 0 }}
      style={[styles.hero, style]}
    >
      <View style={styles.heroGlow} />
      <View style={styles.heroWash} />
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroBody}>{body}</Text>
      {children ? <View style={styles.heroSlot}>{children}</View> : null}
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

export function MetricStrip({ items }: { items: Metric[] }) {
  return (
    <View style={styles.metricStrip}>
      {items.map(item => (
        <View key={item.label} style={styles.metricItem}>
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
    marginBottom: spacing.xl,
    overflow: "hidden",
    padding: spacing.xl,
    ...shadows.card
  },
  heroGlow: {
    backgroundColor: "rgba(255,237,3,0.22)",
    borderRadius: radius.pill,
    height: 160,
    position: "absolute",
    right: -54,
    top: -64,
    width: 160
  },
  heroWash: {
    backgroundColor: "rgba(0,177,213,0.18)",
    borderRadius: radius.pill,
    bottom: -70,
    height: 180,
    left: -58,
    position: "absolute",
    width: 180
  },
  eyebrow: {
    ...typography.caption,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.16)",
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
    backgroundColor: "rgba(229,250,253,0.16)",
    borderRadius: radius.md,
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  metricValue: { ...typography.h3, color: colors.white },
  metricLabel: { ...typography.caption, color: "rgba(255,255,255,0.78)", marginTop: 2 }
});
