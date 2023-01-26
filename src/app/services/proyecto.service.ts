import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interface/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectoURL:string = 'http://localhost:8080/proyecto/';

  constructor(private httpClient: HttpClient) { }

  public verProyecto(id_usr:number):Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.proyectoURL+`ver/${id_usr}`);
  }
}
