import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajo } from '../interface/trabajo.interface';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept':'application/json',
      'Content-Type': 'application/json'
    })
  };

  trabajoURL:string = 'http://localhost:8080/trabajo/';

  constructor(private httpClient: HttpClient) { }

  public verTrabajos():Observable<Trabajo[]>{
    return this.httpClient.get<Trabajo[]>(this.trabajoURL+`ver`);
  }

  public verTrabajo(id_trab:number):Observable<Trabajo>{
    return this.httpClient.get<Trabajo>(this.trabajoURL + `ver/${id_trab}`)
  }

  public editarTrabajo(trabajo:Trabajo, id_trab:number):Observable<any>{
    return this.httpClient.put(this.trabajoURL + `editar/1/${id_trab}`, trabajo );
  }
}
