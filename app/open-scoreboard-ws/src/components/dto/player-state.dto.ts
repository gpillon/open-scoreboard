import { Expose, Transform } from 'class-transformer';

export class PlayerState {
  @Expose()
  @Transform(({ value }: { value: number }) => (value != null ? value : 0))
  posX: number;

  @Expose()
  @Transform(({ value }: { value: number }) => (value != null ? value : 0))
  posY: number;
}
