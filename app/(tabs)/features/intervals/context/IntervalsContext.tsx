// app/(tabs)/features/intervals/IntervalsContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Interval } from "../types";

// TODO: prototype data in lieu of an api
const intervalsExample: Interval[] = [
{
    name: "Demo (Near Instant)",
    repCount: 1,
    repTime: 1,
    repRest: 1,
    setRest: 1, 
    setCount: 1,
  },
{
    name: "Demo (Fast)",
    repCount: 2,
    repTime: 2,
    repRest: 3,
    setRest: 10,
    setCount: 2,
  },
  {
    name: "Aerobic Capacity",
    repCount: 18,
    repTime: 7,
    repRest: 3,
    setRest: 60 * 4, // 4min
    setCount: 5,
    workoutDetails: {
      equipment: "edge",
      load: {
        loadType: "percentage",
        value: 0.3, // 30%
      },
    },
  },
  {
    name: "Anaerobic Capacity",
    repCount: 5,
    repTime: 7,
    repRest: 3,
    setRest: 60 * 3, // 3min
    setCount: 6,
    workoutDetails: {
      equipment: "edge",
      load: {
        loadType: "percentage",
        value: 0.7, // 70%
      },
    },
  },
];

type IntervalsContextType = {
  intervals: Interval[];
  addInterval: (interval: Interval) => void;
  updateInterval: (index: number, interval: Interval) => void;
  removeInterval: (index: number) => void;
};

const IntervalsContext = createContext<IntervalsContextType | undefined>(
  undefined,
);

export const useIntervals = () => {
  const context = useContext(IntervalsContext);
  if (!context)
    throw new Error("useIntervals must be used within IntervalsProvider");
  return context;
};

export const IntervalsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [intervals, setIntervals] = useState<Interval[]>(intervalsExample);

  const addInterval = (interval: Interval) =>
    setIntervals((prev) => [...prev, interval]);

  const updateInterval = (index: number, interval: Interval) => {
    setIntervals((prev) =>
      prev.map((item, i) => (i == index  ? interval : item)),
    );

  }

  const removeInterval = (index: number) =>
    setIntervals((prev) => prev.filter((_, i) => i != index));

  return (
    <IntervalsContext.Provider
      value={{ intervals, addInterval, updateInterval, removeInterval }}
    >
      {children}
    </IntervalsContext.Provider>
  );
};
