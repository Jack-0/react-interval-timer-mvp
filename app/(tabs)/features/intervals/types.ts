/** Represents the options for the current active interval */
export type IntervalMode = "Warmup" | "Work" | "Rest" | "Set Rest" | "Finished";

/**
 * Represents a workout interval.
 */
export type Interval = {
  /** Interval workout name */
  name: string;
  /** Number of repetitions per set */
  repCount: number;
  /** Rest time between repetitions in seconds */
  repRest: number;
  /** Total number of sets */
  setCount: number;
  /** Rest time between sets in seconds */
  setRest: number;
  /** Time taken per repetition in seconds */
  repTime: number;

  /** optional workout details */
  workoutDetails?: WorkoutDetails;
};

export type WorkoutDetails = {
  /** Optional description of load required */
  load: Load;
  /** Required equipment */
  equipment: "edge" | "hangboard";
};

export type Load = {
  loadType: "kg" | "percentage";
  value: number;
};

// TODO: guid would be included here with link to backend (name might be a unique key)
// TODO: could have a favourite option, UI would order by fav first
// TODO: note this file when located in /app/(tabs)/features/intervals/x confuses expo and generate a warning as (tabs) expects react components here
