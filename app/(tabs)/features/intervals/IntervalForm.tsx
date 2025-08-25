import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const validName = useMemo(() => {
    return name !== "";
  }, [name]);

  const validReps = useMemo(() => {
    return Number(repCount) > 0 && Number(repTime) > 0 && Number(repRest) > 0;
  }, [repCount, repTime, repRest]);

  const validSets = useMemo(() => {
    return Number(setCount) > 0 && Number(setRest) > 0;
  }, [setCount, setRest]);

  const validForm = useMemo(() => {
    return validName && validReps && validSets;
  }, [validName, validReps, validSets]);

  const handleDelete = () => {
    removeInterval(index);
    navigation.goBack();
  };

  // TODO: show error state
  return (
    <SafeAreaView style={styles.container}>
      {/* NAME */}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Interval Name</Text>
        {!validName ? (
          <Text style={[styles.label, styles.labelRed]}> *required</Text>
        ) : null}
      </View>
      <TextInput
        maxLength={50}
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Interval Name"
      />
      {/* REPETITIONS */}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Repetitions</Text>
        {!validReps ? (
          <Text style={[styles.label, styles.labelRed]}>
            {" "}
            *zero values not allowed
          </Text>
        ) : null}
      </View>
      <View style={styles.spacedItems}>
        <View style={styles.labeledBox}>
          <Text style={styles.label}>Count</Text>
          <TextInput
            maxLength={3}
            // aria-label="Set Repetition Count"
            style={styles.input}
            value={repCount}
            onChangeText={setRepCount}
            keyboardType="numeric"
            textAlign="center"
          />
        </View>
        <View style={styles.labeledBox}>
          <Text style={styles.label}>Time</Text>
          <TextInput
            maxLength={3}
            style={styles.input}
            value={repTime}
            onChangeText={setRepTime}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.labeledBox}>
          <Text style={styles.label}>Rest</Text>
          <TextInput
            maxLength={3}
            style={styles.input}
            value={repRest}
            onChangeText={setRepRest}
            keyboardType="numeric"
          />
        </View>
      </View>
      {/* SETS */}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Sets</Text>
        {!validSets ? (
          <Text style={[styles.label, styles.labelRed]}>
            {" "}
            *zero values not allowed
          </Text>
        ) : null}
      </View>
      <View style={styles.spacedItems}>
        <View style={styles.labeledBox}>
          <Text style={styles.label}>Total</Text>
          <TextInput
            style={styles.input}
            maxLength={3}
            value={setCount}
            onChangeText={setSetCount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.labeledBox}>
          <Text style={styles.label}>Rest</Text>
          <TextInput
            maxLength={3}
            style={styles.input}
            value={setRest}
            onChangeText={setSetRest}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>Configure</Text>
      <View style={styles.spacedItems}>
        <TouchableOpacity
          onPress={handleSave}
          style={[styles.button, !validForm ? styles.buttonDisabled : null]}
          disabled={!validForm}
        >
          <Text
            style={[
              styles.buttonText,
              !validForm ? styles.buttonTextDisabled : null,
            ]}
          >
            Save
          </Text>
          <FontAwesome6
            name="square-check"
            size={20}
            color={!validForm ? "gray" : "black"}
          />
        </TouchableOpacity>

        {existingInterval !== undefined ? (
          <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
            <FontAwesome6 name="trash" size={20} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  labeledBox: {
    flexDirection: "column",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },

  spacedItems: { flexDirection: "row", justifyContent: "center", gap: 20 },

  container: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontFamily: "QuickSand",
    // fontFamily: "SpaceMono",
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "bold",
  },
  labelRed: {
    color: "red",
  },
  input: {
    fontFamily: "QuickSand",
    textAlign: "center",
    fontWeight: 500,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minWidth: 54,
  },

  button: {
    marginVertical: 8,
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
    flex: 1,
  },
  buttonDisabled: {
    color: "gray",
    borderColor: "gray",
  },

  buttonText: {
    fontFamily: "QuickSand",
    fontWeight: 500,
    fontSize: 18,
  },
  buttonTextDisabled: {
    color: "gray",
    borderColor: "gray",
  },
});
