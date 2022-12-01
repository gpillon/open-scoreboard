/* tslint:disable */
/* eslint-disable */
export interface CreateLapDto {
  lapNum: number;

  /**
   * Lap Time in seconds.milliseconds
   */
  lapTime: number;
  player: (string | string);
  track: (string | string);
}
