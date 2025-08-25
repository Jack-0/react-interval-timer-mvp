import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IntervalItem } from "./components/IntervalItem";
import { useIntervals } from "./context/IntervalsContext";

const Intervals: React.FC = () => {
  const { intervals } = useIntervals();
  const router = useRouter();

  return (
    <SafeAreaView style={{ padding: 20 }}>
      {/* SHOW ALL INTERVALS */}
      <FlatList
        data={intervals}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <IntervalItem interval={item} index={index} />
        )}
      />
      {/* CREATE NEW INTERVAL */}
      <Button
        title="Create New Interval"
        onPress={() => {
          router.push("/(tabs)/features/intervals/IntervalForm");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default Intervals;
