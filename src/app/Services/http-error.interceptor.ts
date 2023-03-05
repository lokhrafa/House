import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, concatMap, delay, of, retry, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorCode } from '../enums/enum';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    console.log('Http Request started');

    return next.handle(request)
    .pipe(retry({ delay: (error) => this.retryRequest(error,10)}),

    catchError((error: HttpErrorResponse) => {

      const errorMessage = this.setError(error);
      console.log(error);

      this.toastr.error(errorMessage);

       throw new Error(errorMessage);
    })
    );
    
  }
  setError(error: HttpErrorResponse) {
    let errorMessage = 'Unknow error occured';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      if(error.status === 401){
        return error.statusText;
      }
      if(error.error.errorMessage && error.status !== 0 ){
        {errorMessage = error.error.errorMessage;}
      }

      if(!error.error.errorMessage && error.error && error.status !== 0){
        {errorMessage = error.error;}
      }
    }

    return errorMessage;
  }
  retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown> {
     return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        if(count <= retryCount){
          switch(checkErr.status){
            case ErrorCode.serverDown:
              return of (checkErr);
          }
        }

          throw new Error(checkErr.error);
    
      })
     )
  }
}
