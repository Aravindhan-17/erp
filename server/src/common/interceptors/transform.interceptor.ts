import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: unknown) => {
        // If the controller already returned a structure with a message, extract it
        let message: string | undefined = undefined;
        let responseData: unknown = data;

        if (data && typeof data === 'object' && 'message' in data) {
          const typedData = data as Record<string, unknown>;
          message =
            typeof typedData.message === 'string'
              ? typedData.message
              : String(typedData.message);
          // Create a shallow copy without the message property for the data payload

          const { message: _, ...rest } = typedData;

          // If the only property was message, data becomes empty object,
          // or we can just use the rest of the object
          responseData = Object.keys(rest).length > 0 ? rest : undefined;
        }

        return {
          success: true,
          message,
          data: responseData as T,
        };
      }),
    );
  }
}
