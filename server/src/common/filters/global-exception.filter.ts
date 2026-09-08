import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // If the response is an object (like validation errors), use it directly,
      // otherwise use the string message.
      message =
        typeof exceptionResponse === 'object' && exceptionResponse !== null
          ? (exceptionResponse as Record<string, unknown>).message ||
            exceptionResponse
          : exceptionResponse;
    } else if (exception instanceof Error) {
      // Log unhandled non-HTTP errors with stack trace for debugging
      this.logger.error(
        `Unhandled Exception: ${exception.message}`,
        exception.stack,
      );
      message = exception.message;
    }

    // Always log the error
    this.logger.error(
      `${request.method} ${request.url} [${status}]: ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      success: false,
      error: {
        statusCode: status,
        message,
        path: request.url,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
