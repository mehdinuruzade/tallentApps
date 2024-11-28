import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Default error response
    const errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      status: 'error',
      message: 'An unexpected error occurred',
    };

    // Handle RpcException
    if (exception instanceof RpcException) {
      this.logger.error('RpcException caught:', exception.message);

      const error = exception.getError() as any;

      errorResponse.statusCode =
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse.status = error.error || 'error';
      errorResponse.message = error.message || 'An unexpected error occurred';
    }
    // Handle HttpException (optional, in case you forward them)
    else if (exception instanceof HttpException) {
      this.logger.error('HttpException caught:', exception.message);

      const error = exception.getResponse() as any;

      errorResponse.statusCode = exception.getStatus();
      errorResponse.status = error.error || 'error';
      errorResponse.message = error.message || 'An unexpected error occurred';
    }
    // Handle Unexpected Exceptions
    else {
      this.logger.error('Unexpected exception caught:', exception);

      // Log stack trace if available
      if (exception.stack) {
        this.logger.error(exception.stack);
      }

      // Keep the default errorResponse values for unexpected errors
    }

    // Send the error response
    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
