import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { useIntervals } from "../context/IntervalsContext";
import { Interval } from "../types";

type Props = {
  interval: Interval;
  index: number;
};

export const IntervalItem: React.FC<Props> = ({ interval, index }) => {
  const { removeInterval } = useIntervals();
  const router = useRouter();

  return (
    <View
      style={{
        marginVertical: 5,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 2,
      }}
    >
      <Text>{interval.name}</Text>
      <Text>Reps: {interval.repCount}</Text>
      <Text>Sets: {interval.setCount}</Text>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Button
          title="Edit"
          onPress={() => {
            router.push({
              pathname: "/(tabs)/features/intervals/IntervalForm",
              params: { index: index },
            });
          }}
        ></Button>
        <Button
          title="Start"
          onPress={() => {
            router.push({
              pathname: "/(tabs)/features/intervals/IntervalStart",
              params: { index: index },
            });
          }}
        ></Button>
      </View>
    </View>
  );
};
