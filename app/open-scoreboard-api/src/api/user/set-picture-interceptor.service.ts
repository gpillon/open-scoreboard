import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserPhoto } from './entities/user_photo.entity';

export interface Response<T> {
  data: T;
}

@Injectable()
export class FileSender<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((userPhoto: UserPhoto) => {
        const res = context.switchToHttp().getResponse();
        res.header('Content-Type', userPhoto.mimeType);
        res.header(
          'Content-Disposition',
          `attachment; filename=${userPhoto.name}`,
        );
        res.header('Content-Length', userPhoto.size);
        res.write(userPhoto.data);
        return res.end();
      }),
    );
  }
}
