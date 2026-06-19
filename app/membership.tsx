import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Screen } from "@/components";
import { activeMembershipTier, membershipTiers } from "@/data/mock";
import { colors, radius, shadows, spacing, typography } from "@/theme";

export default function MembershipScreen() {
  return (
    <Screen scroll>
      <Header title="An Gia Green Membership" subtitle="Quyền lợi hội viên và tích điểm" showBack showNotification />
      <View style={styles.list}>
        {membershipTiers.map(tier => {
          const isActive = tier.id === activeMembershipTier.id;
          return (
            <LinearGradient
              key={tier.id}
              colors={tier.palette.gradient}
              end={{ x: 1, y: 1 }}
              start={{ x: 0, y: 0 }}
              style={[styles.tierCard, { borderColor: tier.palette.border }, isActive && styles.activeCard]}
            >
              <View style={[styles.glow, { backgroundColor: tier.palette.glow }]} />
              <LinearGradient colors={["transparent", tier.palette.shine, "transparent"]} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={styles.sheen} />
              <View style={styles.tierTop}>
                <Text style={[styles.badge, { backgroundColor: tier.palette.badgeBackground }]}>{isActive ? "Đang dùng" : tier.minPoints}</Text>
                <Text style={styles.level}>{tier.label}</Text>
              </View>
              <Text style={styles.benefit}>{tier.benefit}</Text>
              <View style={styles.progressTrack}>
                <LinearGradient colors={tier.palette.gradient} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={[styles.progressFill, { width: tier.progress as DimensionValue }]} />
              </View>
            </LinearGradient>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  tierCard: { borderRadius: radius.lg, borderWidth: 1, minHeight: 136, overflow: "hidden", padding: spacing.lg, ...shadows.card },
  activeCard: { borderWidth: 2 },
  glow: { borderRadius: radius.pill, height: 120, position: "absolute", right: -36, top: -44, width: 120 },
  sheen: { height: 190, left: -70, opacity: 0.82, position: "absolute", top: -30, transform: [{ rotate: "-18deg" }], width: 96 },
  tierTop: { alignItems: "flex-start", gap: spacing.sm },
  badge: { color: colors.white, fontSize: 11, fontWeight: "700", lineHeight: 15, borderRadius: radius.pill, overflow: "hidden", paddingHorizontal: spacing.md, paddingVertical: 5 },
  level: { ...typography.h3, color: colors.white },
  benefit: { ...typography.caption, color: "rgba(255,255,255,0.88)", marginTop: spacing.xs },
  progressTrack: { backgroundColor: "rgba(255,255,255,0.26)", borderRadius: radius.pill, height: 7, marginTop: spacing.md, overflow: "hidden" },
  progressFill: { borderRadius: radius.pill, height: 7 }
});


