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

  verEducacion():Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.eduURL + `ver`);
  }

  verEducacionDetalle(id_edu:number):Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.eduURL + `ver/${id_edu}`);
  }

  editarEducacion(educacion:Educacion, id_edu:number):Observable<any>{
    return this.httpClient.put(this.eduURL + `editar/1/${id_edu}`, educacion);
  }

}
