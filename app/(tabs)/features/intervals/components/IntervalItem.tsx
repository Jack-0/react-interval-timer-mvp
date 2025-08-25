import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        marginVertical: 8,
        // backgroundColor: "#f0f0f0",
        // borderRadius: 5,
        // borderStyle: "solid",
        // borderWidth: 2,
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row"
      }}
    >
      <TouchableOpacity onPress={() => {
            router.push({
              pathname: "/(tabs)/features/intervals/IntervalStart",
              params: { index: index },
            });
          }

      }
      style={styles.left}
      >

        <Text numberOfLines={1} style={styles.header}>{interval.name}</Text>
        <Text style={styles.body}>{interval.setCount} {interval.setCount > 1 ? "sets" : "set"} with</Text>
        <Text style={styles.body}>{interval.repCount } {interval.repCount > 1 ? "reps" : "rep"} at {interval.repTime} (sec) each ({interval.repRest} sec rest) </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={
            styles.right
          }
      onPress={() => {
              router.push({
                pathname: "/(tabs)/features/intervals/IntervalForm",
                params: { index: index },
              });
            }}>
              <Text style={styles.body}>Edit</Text>
              <FontAwesome6 name="pen-to-square" size={20} color="black"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header:{
    fontFamily: "QuickSand",
    fontWeight: "bold",
    fontSize: 18,
  },
  body: {
    fontSize: 16,
    fontFamily: "QuickSand"
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
    justifyContent: "center",
    minWidth: 60,
    maxWidth: 60,
    height: "100%"
  },
});

