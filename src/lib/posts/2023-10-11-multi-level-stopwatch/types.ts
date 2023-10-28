export type Interval = {
  start: number;

  // No end means it's still running
  end?: number;
};

export type StopwatchData = {
    levels: Interval[][];
}
