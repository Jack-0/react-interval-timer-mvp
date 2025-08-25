import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IntervalItem } from "./components/IntervalItem";
import { useIntervals } from "./context/IntervalsContext";

export default function Intervals() {
  const { intervals } = useIntervals();
  const router = useRouter();

  return (
    <ScrollView>
      <SafeAreaView style={{ padding: 28 }}>
        {/* SHOW ALL INTERVALS */}
        <FlatList
          data={intervals}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <IntervalItem interval={item} index={index} />
          )}
          scrollEnabled={false}
        />
        {/* CREATE NEW INTERVAL */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/features/intervals/IntervalForm")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create New Interval</Text>
          <FontAwesome6 name="add" size={20} color="black" />
        </TouchableOpacity>

        <View style={{ height: 50 }}></View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "QuickSand",
    fontWeight: 500,
    fontSize: 18,
  },
  button: {
    marginVertical: 8,
    borderWidth: 2,
    // backgroundColor: 'skyblue',
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
  },

  header: {
    fontFamily: "QuickSand",
    fontWeight: "bold",
    fontSize: 18,
  },
  body: {
    fontSize: 16,
    fontFamily: "QuickSand",
  },

  left: {
    padding: 5,
    paddingLeft: 8,
    flex: 1,
    borderWidth: 2,
    // backgroundColor: 'skyblue',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  right: {
    padding: 2,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    minWidth: 60,
    maxWidth: 60,
    height: "100%",
  },
});
