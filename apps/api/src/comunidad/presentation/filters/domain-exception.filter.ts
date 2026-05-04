import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import {
  ComunidadNotFoundException,
  CategoriaNotFoundException,
  ComunidadYaActivaException,
  ComunidadYaInactivaException,
} from '../../domain/exceptions';

@Catch(
  ComunidadNotFoundException,
  CategoriaNotFoundException,
  ComunidadYaActivaException,
  ComunidadYaInactivaException,
)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    if (exception instanceof ComunidadNotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
    } else if (exception instanceof CategoriaNotFoundException) {
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (
      exception instanceof ComunidadYaActivaException ||
      exception instanceof ComunidadYaInactivaException
    ) {
      statusCode = HttpStatus.CONFLICT;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
