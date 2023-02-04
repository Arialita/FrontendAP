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

  public verProyecto():Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.proyectoURL+`ver`);
  }

  verProyectoDetalle(id_proy:number):Observable<Proyecto>{
    return this.httpClient.get<Proyecto>(this.proyectoURL + `ver/${id_proy}`);
  }

  editarProyecto(proyecto:Proyecto, id_proy:number):Observable<any>{
    return this.httpClient.put(this.proyectoURL + `editar/1/${id_proy}`, proyecto);
  }
}
