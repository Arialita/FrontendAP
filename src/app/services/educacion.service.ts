import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../interface/educacion.interface';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

eduURL:string = 'https://portfolioap-arialita.koyeb.app/educacion/';
//:string = 'http://localhost:8080/educacion/';
  constructor(private httpClient: HttpClient) { }

  verEducacion(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.eduURL + `ver`);
  }

  verEducacionDetalle(id_edu: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(this.eduURL + `ver/${id_edu}`);
  }

  editarEducacion(educacion: Educacion, id_edu: number): Observable<any> {
    return this.httpClient.put(this.eduURL + `editar/1/${id_edu}`, educacion, this.httpOptions);
  }

  crearEducacion(educacion: Educacion): Observable<any> {
    return this.httpClient.post(this.eduURL + `crear/1`, educacion, this.httpOptions)
  }

  borrarEducacion(id: number): Observable<any> {
    return this.httpClient.delete(this.eduURL + `borrar/${id}`, this.httpOptions)
  }
}
