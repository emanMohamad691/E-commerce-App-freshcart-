import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinerInterceptor: HttpInterceptorFn = (req, next) => {
 const ngxSpinnerService = inject(NgxSpinnerService);
 if( ! (((req.body && typeof req.body === 'object') && ('productId' in req.body && req.body.productId)) ||((req.body && typeof req.body === 'object') &&('count' in req.body && req.body.count))) ){
  ngxSpinnerService.show();
 }
 
  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide();
  }));
};
