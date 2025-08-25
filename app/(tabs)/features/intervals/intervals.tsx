import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntervalList() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Intervals</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}></ThemedView>
      <Link href={"/(tabs)/features/intervals/interval_config"}>config</Link>
      <Link href={"/(tabs)/features/intervals/interval_use"}>do</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
