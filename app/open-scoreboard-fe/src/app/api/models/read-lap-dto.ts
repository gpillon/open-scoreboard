/* tslint:disable */
/* eslint-disable */
export interface ReadLapDto {
  id: string;
  lapNum: number;

  /**
   * Lap Time in seconds.milliseconds
   */
  lapTime: number;
  player: string;
  track: string;
}
