import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CccException } from './CccException';

@Catch(CccException)
export class CccFilter implements ExceptionFilter {
  catch(exception: CccException, host: ArgumentsHost) {
    console.log('CccFilter catch', exception, host);
  }
}
