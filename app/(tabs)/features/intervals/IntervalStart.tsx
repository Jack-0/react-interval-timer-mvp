import { ThemedText } from "@/components/ThemedText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIntervals } from "./context/IntervalsContext";
import { IntervalMode } from "./types";

// Route params
type RouteParams = {
  index: number;
};

export default function IntervalStart() {
  const route = useRoute();
  const navigation = useNavigation();
  const { index } = route.params as RouteParams;
  const { intervals } = useIntervals();
  const interval = index !== undefined ? intervals[index] : undefined;

  const WARM_UP_TIME = 10; // 10 seconds

  const [currentTimeLeft, setCurrentTimeLeft] = useState<number>(WARM_UP_TIME);
  const [activeMode, setActiveMode] = useState<IntervalMode>("Warmup");
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [totalRepsDone, setTotalRepsDone] = useState<number>(0);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [paused, setPaused] = useState<boolean>(false);

  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (!interval || activeMode === "Finished") return;

    if (timerRef.current) clearInterval(timerRef.current);

    /** Every second check if we have ran the timer down to zero. Once we have handlePhaseEnd() */
    timerRef.current = setInterval(() => {
      if (!paused) {
        setCurrentTimeLeft((prev) => {
          if (prev > 1) return prev - 1;
          handlePhaseEnd();
          return prev;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, activeMode, currentRep, currentSet, interval]);

  /** Use the 'activeMode' to determine what the next action is */
  function handlePhaseEnd() {
    if (!interval) return;

    // 'Warmup' transitions into rep
    if (activeMode === "Warmup") {
      setActiveMode("Work");
      setCurrentTimeLeft(interval.repTime);
      return;
    }

    // 'Work' transitions into 'Set Rest' or 'Finished'...
    // Note: only 'Work' translates to 'Finished' as we check at the end of a rep if that was the last in the set
    if (activeMode === "Work") {
      // if more reps left in the set goto Rest
      if (currentRep < interval.repCount) {
        setActiveMode("Rest");
        setCurrentTimeLeft(interval.repRest);
      } else {
        // no intervals reps left
        if (currentSet < interval.setCount) {
          // if there is a set left start the set rest period
          setActiveMode("Set Rest");
          setCurrentTimeLeft(interval.setRest);
        } else {
          // no sets left, assume finished state
          setActiveMode("Finished");
          setCurrentTimeLeft(0);
        }
      }
      setTotalRepsDone((r) => r + 1);
      return;
    }

    // 'Rest' transitions into 'Work'
    if (activeMode === "Rest") {
      setActiveMode("Work");
      setCurrentRep((r) => r + 1);
      setCurrentTimeLeft(interval.repTime);
      return;
    }

    // 'Set Rest' transitions into 'Work'
    if (activeMode === "Set Rest") {
      setActiveMode("Work");
      setCurrentSet((s) => s + 1);
      setCurrentRep(1);
      setCurrentTimeLeft(interval.repTime);
      return;
    }
  }

  /** Split time into 4 values mm:ss as m1m2:s1s2 */
  function splitTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const m1 = Math.floor(mins / 10);
    const m2 = mins % 10;
    const s1 = Math.floor(secs / 10);
    const s2 = secs % 10;

    return { m1, m2, s1, s2 };
  }
  const { m1, m2, s1, s2 } = splitTime(currentTimeLeft);


  function colorFromMode(mode:IntervalMode){
    switch(mode){
      case "Work": 
        return "#fe6100"
      case "Rest": 
        return "#648fff"
      case "Set Rest": 
        return "#648fff"
      case "Warmup":
        return "#785ef0"
    }
    return "#785ef0"
  }

  return (
    <SafeAreaView style={styles.container}>
      {interval === undefined ? (
        <ThemedText>Interval not found!</ThemedText>) : (
        <>
          <Text style={styles.title}>{interval?.name}</Text>

          <View style={{flex:1}}></View>

          <View
            style={[activeMode != "Finished" ? styles.timerBox : null, activeMode != "Finished" ? {backgroundColor: colorFromMode(activeMode)} : null]}
          >
            {/* TIMER FORMATTING (required for none mono-spaced font) */}
            {activeMode == "Finished" ? (<Text style={styles.timer}>🥳</Text>) : (
              <>
                <Text style={styles.timer}>{m1}</Text>
                <Text style={styles.timer}>{m2}</Text>
                <Text style={styles.timer}>:</Text>
                <Text style={styles.timer}>{s1}</Text>
                <Text style={styles.timer}>{s2}</Text>
              </>
            )}
          </View>

          <View style={{flex:1}}></View>

          <Text style={[styles.mode, {color:colorFromMode(activeMode)}]}>{activeMode}</Text>

          <ThemedText>
            Rep {currentRep} of {interval?.repCount}
          </ThemedText>
          <ThemedText>
            Set {currentSet} of {interval?.setCount}
          </ThemedText>
          <ThemedText>
            Total reps {totalRepsDone} of{" "}
            {interval.repCount * interval.setCount}
          </ThemedText>



          <View style={{flexDirection:"row"}}>

          <TouchableOpacity
            onPress={() => setPaused((p) => !p)}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>
              {paused ? "Resume" : "Pause"}
            </ThemedText>
{paused ? (

              <FontAwesome6 name="play" size={20} color="black"/>
) : (

              <FontAwesome6 name="pause" size={20} color="black"/>
)}
          </TouchableOpacity>
          </View>


          <View style={{flex:1}}></View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 54
  },
  title: {
    fontSize: 42,
    fontWeight: 600,
    marginBottom: 20,
    fontFamily:"QuickSand",
    textAlign:"center"
  },
  timer: {
    fontSize: 64,
    minWidth: 40,
    fontFamily: "QuickSand",
    fontWeight: "bold",
    textAlign: "center",
  },
  timerBox:{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              gap: 0,
              borderWidth: 5,
              borderRadius: 10,
              padding: 10
            },
  mode: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily:"QuickSand"
  },
  button: {
    flex:1,
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    textAlign: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
