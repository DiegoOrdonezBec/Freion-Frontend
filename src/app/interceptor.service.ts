import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './components/shared/service/token.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor{

  constructor(private tokenService : TokenService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedReq = req;
    const token = this.tokenService.getToken();

    if(token != null){
      interceptedReq = req.clone({ 
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(interceptedReq);
  }

}
