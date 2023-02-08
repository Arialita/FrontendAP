import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TokenDto } from '../model/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://portfolioap-arialita.koyeb.app/auth/login';
  //url = 'http://localhost:8080/auth/login';
  currentUserSubject$!:BehaviorSubject<any>;
  temp:boolean = false;
  isLoggedIn$:BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<any>(sessionStorage.getItem('token'));
    if(sessionStorage.getItem('token')){
      this.temp = true;
    }
    this.isLoggedIn$ = new BehaviorSubject<boolean>(this.temp);
    
   }

  iniciarSesion(credenciales: any):Observable<TokenDto>{
    return this.httpClient.post<TokenDto>(this.url, credenciales).pipe(
      map(data => {
        sessionStorage.removeItem('token');
        sessionStorage.setItem('token', data.token);
        this.currentUserSubject$.next(sessionStorage.getItem('token'))
        this.isLoggedIn$.next(true);
        return data;
      })
    )
  }

  get usuarioAutenticado(){
    return this.currentUserSubject$.value;
  }

  get isLogged(): Observable<boolean>{
    return this.isLoggedIn$.asObservable();
  }

  setUsuarioAutenticado(token:string | null){
    this.currentUserSubject$.next(token);
  }

  setLoggedIn(){
    this.isLoggedIn$.next(false);
  }
}
