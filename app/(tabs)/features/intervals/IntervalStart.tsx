import { ThemedText } from "@/components/ThemedText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
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
      console.log(currentTimeLeft)
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

  return (
    <SafeAreaView style={styles.container}>
      {interval === undefined ? (
        <ThemedText>Interval not found!</ThemedText>
      ) : (
        <>
          <Text style={styles.title}>{interval?.name}</Text>

          <Text style={styles.timer}>{currentTimeLeft}</Text>
          <Text style={styles.mode}>{activeMode}</Text>

          <Text>
            Rep {currentRep} of {interval?.repCount}
          </Text>
          <Text>
            Set {currentSet} of {interval?.setCount}
          </Text>
          <Text>
            Total reps {totalRepsDone} of {interval.repCount * interval.setCount}
          </Text>
 

          <TouchableOpacity
            onPress={() => setPaused((p) => !p)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{paused ? "Resume" : "Pause"}</Text>
          </TouchableOpacity>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 64,
    fontWeight: "bold",
    marginVertical: 20,
  },
  mode: {
    fontSize: 28,
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
