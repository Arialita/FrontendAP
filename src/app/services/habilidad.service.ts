import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../interface/habilidad.interface';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  habURL = 'http://localhost:8080/habilidad/'
  constructor(private httpClient: HttpClient) { }


  verHabilidad():Observable<Habilidad[]>{
    return this.httpClient.get<Habilidad[]>(this.habURL + `ver`);
  }

  verHabilidadDetalle(id_hab:number):Observable<Habilidad>{
    return this.httpClient.get<Habilidad>(this.habURL + `ver/${id_hab}`);
  }

  editarHabilidad(habilidad:Habilidad, id_hab:number):Observable<any>{
    return this.httpClient.put(this.habURL + `editar/1/${id_hab}`, habilidad);
  }
}
