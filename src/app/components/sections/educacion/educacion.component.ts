import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/interface/educacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  isLoggedIn:boolean = false;
  educacion:Educacion[]=[]

  constructor(private eduServ: EducacionService, private auth:AuthService){}

  ngOnInit(): void {
    //this.verEducacion();
    this.scrollToElement();
    this.auth.isLogged.subscribe({next:data=>this.isLoggedIn=data})
  }

  scrollToElement(): void {
    const target = document.getElementById("educacion")!;
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  verEducacion():void{
    this.eduServ.verEducacion().subscribe({
      next: data => {this.educacion = data},
      error: err =>{console.log(err)}
    })
  }
}
