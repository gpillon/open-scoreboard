/* tslint:disable */
/* eslint-disable */
export interface ReadUserDto {
  email: string;
  id: string;
  lastName: string;
  name?: string;
  roles: Array<'user' | 'admin'>;
}
