import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  throwError as observableThrowError,
} from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable()
export class HttpErrorsInterceptors implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        return observableThrowError(error);
      })
    );
  }
}
