import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { useIntervals } from "./context/IntervalsContext";
import { Interval } from "./types";

type RouteParams = {
  index: number;
};

export default function IntervalForm() {
  const route = useRoute();
  const navigation = useNavigation();
  const { index } = route.params as RouteParams;

  const { intervals, addInterval, updateInterval, removeInterval } =
    useIntervals();

  const existingInterval = index !== undefined ? intervals[index] : undefined;

  const [name, setName] = useState(existingInterval?.name ?? "");
  const [repCount, setRepCount] = useState(
    existingInterval?.repCount.toString() ?? "0",
  );
  const [repRest, setRepRest] = useState(
    existingInterval?.repRest.toString() ?? "0",
  );
  const [setCount, setSetCount] = useState(
    existingInterval?.setCount.toString() ?? "0",
  );
  const [setRest, setSetRest] = useState(
    existingInterval?.setRest.toString() ?? "0",
  );
  const [repTime, setRepTime] = useState(
    existingInterval?.repTime.toString() ?? "0",
  );

  const handleSave = () => {
    const interval: Interval = {
      name,
      repCount: Number(repCount),
      repRest: Number(repRest),
      setCount: Number(setCount),
      setRest: Number(setRest),
      repTime: Number(repTime),
    };
    if (index !== undefined) {
      updateInterval(index, interval);
    } else {
      addInterval(interval);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    removeInterval(index);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Interval Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Interval Name"
      />

      <Text style={styles.label}>Repetitions per Set</Text>
      <TextInput
        style={styles.input}
        value={repCount}
        onChangeText={setRepCount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rest Between Reps (sec)</Text>
      <TextInput
        style={styles.input}
        value={repRest}
        onChangeText={setRepRest}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Total Sets</Text>
      <TextInput
        style={styles.input}
        value={setCount}
        onChangeText={setSetCount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rest Between Sets (sec)</Text>
      <TextInput
        style={styles.input}
        value={setRest}
        onChangeText={setSetRest}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Time per Repetition (sec)</Text>
      <TextInput
        style={styles.input}
        value={repTime}
        onChangeText={setRepTime}
        keyboardType="numeric"
      />

      <Button title="Save Interval" onPress={handleSave} />

      {existingInterval !== undefined ? (
        <Button title="Delete" color="red" onPress={handleDelete}></Button>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});
