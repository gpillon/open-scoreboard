import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { instanceToPlain } from 'class-transformer';

export class DtoUtils {
  static instanceToReadDto<T, U extends Constructor<unknown>>(
    instance: T,
    dto: U,
  ): InstanceType<U> {
    const instanceDto = new dto();
    Object.assign(instanceDto, instance);
    return instanceToPlain(instanceDto, {
      excludeExtraneousValues: true,
    }) as InstanceType<U>;
  }

  static instanceToReadDtoArray<T, U extends Constructor<unknown>>(
    instances: T[],
    dto: U,
  ): InstanceType<U>[] {
    return instances.map((i) => DtoUtils.instanceToReadDto(i, dto));
  }
}
