import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interface/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  proyectoURL: string = 'https://portfolioap-arialita.koyeb.app/proyecto/';

  constructor(private httpClient: HttpClient) { }

  public verProyecto(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.proyectoURL + `ver`);
  }

  verProyectoDetalle(id_proy: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.proyectoURL + `ver/${id_proy}`);
  }

  editarProyecto(proyecto: Proyecto, id_proy: number): Observable<any> {
    return this.httpClient.put(this.proyectoURL + `editar/1/${id_proy}`, proyecto, this.httpOptions);
  }

  crearProyecto(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post(this.proyectoURL + 'crear/1', proyecto, this.httpOptions);
  }

  borrarProyecto(id_proy: number): Observable<any> {
    return this.httpClient.delete(this.proyectoURL + `borrar/${id_proy}`, this.httpOptions);
  }
}
