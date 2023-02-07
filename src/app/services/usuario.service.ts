import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, list, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Redes } from '../interface/redes.interface';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  loaded$:BehaviorSubject<boolean> = new BehaviorSubject(false);
  url: string[] = ['', ''];
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  usrURL: string = 'https://portfolioap-arialita.koyeb.app/usuario/';

  redesURL: string = 'https://portfolioap-arialita.koyeb.app/redes/';

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  public verUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usrURL + `ver/${id}`);
  }

  public editarPersona(persona: Usuario): Observable<any> {
    return this.httpClient.put(this.usrURL + `editar/1`, persona, this.httpOptions);
  }

  public verRedes(): Observable<Redes> {
    return this.httpClient.get<Redes>(this.redesURL + "ver/1")
  }

  public editarRedes(redes: Redes): Observable<any> {
    return this.httpClient.put(this.redesURL + "editar/1", redes, this.httpOptions)
  }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);
    uploadBytes(imgRef, file)
      .then(() => { this.getImages(name) })
      .catch(err => console.log(err)
      )
  }

  getImages(name:string) {
    const imagesRef = ref(this.storage, 'imagen');
    list(imagesRef)
      .then(async (res) => {
        for (let i = 0; i < res.items.length; i++) {
          const item = res.items[i];
          this.url[i] = await getDownloadURL(item);
        };
        this.loaded$.next(false);
      })
      .catch(err => console.log(err)
      )
  }

  get loaded():Observable<boolean>{
    return this.loaded$.asObservable();
  }
}
