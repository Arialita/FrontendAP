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

  trabajoURL:string = 'https://portfolioap-arialita.koyeb.app/trabajo/';

  constructor(private httpClient: HttpClient) { }

  public verTrabajos():Observable<Trabajo[]>{
    return this.httpClient.get<Trabajo[]>(this.trabajoURL+`ver`);
  }

  public verTrabajo(id_trab:number):Observable<Trabajo>{
    return this.httpClient.get<Trabajo>(this.trabajoURL + `ver/${id_trab}`)
  }

  public editarTrabajo(trabajo:Trabajo, id_trab:number):Observable<any>{
    return this.httpClient.put(this.trabajoURL + `editar/1/${id_trab}`, trabajo, this.httpOptions );
  }

  public crearTrabajo(trabajo:Trabajo):Observable<any>{
    return this.httpClient.post(this.trabajoURL + `crear/1`, trabajo, this.httpOptions)
  }

  public borrarTrabajo(id:number):Observable<any>{
    return this.httpClient.delete(this.trabajoURL + `borrar/${id}`, this.httpOptions )
  }
}
