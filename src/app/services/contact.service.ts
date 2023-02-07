import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private emailUrl = 'https://mailthis.to/ArielPortfolio';
  constructor(private httpClient: HttpClient) { }

  enviarCorreo(input:any){
    return this.httpClient.post(this.emailUrl, input, {responseType: 'text'}).pipe(
      map(
        (res: any)=>{
          if(res){
            return res;
          }
        }
    ))
  }
}
