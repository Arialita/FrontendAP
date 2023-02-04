import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next:HttpHandler):Observable<any>{
    var currentUser = this.auth.usuarioAutenticado;
    if(currentUser){
      req=req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser}`
        }
      })
    }
    return next.handle(req);
  }
}
