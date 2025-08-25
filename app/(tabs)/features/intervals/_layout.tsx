import { Stack } from "expo-router";
import { IntervalsProvider } from "./context/IntervalsContext";

export default function FeatureLayout() {
  return (
    <IntervalsProvider>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="Intervals"
      >
        {/* <Stack.Screen
        name="IntervalForm"
        options={{
          presentation: "modal",
        }}
      /> */}
      </Stack>
    </IntervalsProvider>
  );
}
