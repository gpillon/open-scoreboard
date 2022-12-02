import {
  validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsType implements ValidatorConstraintInterface {
  async validate(value: unknown, validationArguments: ValidationArguments) {
    return await asyncSome(
      validationArguments.constraints,
      async (constrain) => {
        switch (constrain) {
          case String:
            return typeof value === 'string';
          case Number:
            return !Number.isNaN(value);
          default:
            const v = new constrain();
            Object.assign(v, value);
            return (
              value instanceof constrain && (await validate(v)).length === 0
            );
        }
      },
    );
  }
}

const asyncSome = async (
  arr: unknown[],
  predicate: (costrain: any) => boolean | Promise<boolean>,
): Promise<boolean> => {
  for (const e of arr) {
    if (await predicate(e)) return true;
  }
  return false;
};
