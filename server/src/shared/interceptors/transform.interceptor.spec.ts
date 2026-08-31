import { TransformInterceptor } from './transform.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor<any>;

  beforeEach(() => {
    interceptor = new TransformInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should wrap primitive data in a success envelope', (done) => {
    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of('simple string'),
    } as CallHandler;

    interceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe((result) => {
        expect(result).toEqual({
          success: true,
          message: undefined,
          data: 'simple string',
        });
        done();
      });
  });

  it('should extract message property from objects and return the rest as data', (done) => {
    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of({ message: 'Item created', id: 1, name: 'Test' }),
    } as CallHandler;

    interceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe((result) => {
        expect(result).toEqual({
          success: true,
          message: 'Item created',
          data: { id: 1, name: 'Test' },
        });
        done();
      });
  });

  it('should return undefined data if message was the only property', (done) => {
    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of({ message: 'Success only' }),
    } as CallHandler;

    interceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe((result) => {
        expect(result).toEqual({
          success: true,
          message: 'Success only',
          data: undefined,
        });
        done();
      });
  });
});
