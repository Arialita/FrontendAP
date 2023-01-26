import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajo } from '../interface/trabajo.interface';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  trabajoURL:string = 'http://localhost:8080/trabajo/';

  constructor(private httpClient: HttpClient) { }

  public verTrabajo(id_usr:number):Observable<Trabajo[]>{
    return this.httpClient.get<Trabajo[]>(this.trabajoURL+`ver/${id_usr}`);
  }
}
