import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  usrURL: string = 'http://localhost:8080/usuario/';

  constructor(private httpClient: HttpClient) { }

  public verUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usrURL + `ver/${id}`);
  }

  public editarPersona(persona: Usuario): Observable<any> {
    return this.httpClient.put(this.usrURL + `editar/1`, persona, this.httpOptions);
  }
}
