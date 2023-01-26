import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../interface/educacion.interface';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  eduURL = 'http://localhost:8080/educacion/';
  constructor(private httpClient:HttpClient) { }

  verEducacion(id_usr:number):Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.eduURL + `ver/${id_usr}`)
  }

}
