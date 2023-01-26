import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/interface/educacion.interface';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{

  educacion:Educacion[]=[]

  constructor(private eduServ: EducacionService){}

  ngOnInit(): void {
    this.verEducacion();
    this.scrollToElement();
  }

  scrollToElement(): void {
    const target = document.getElementById("educacion")!;
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  verEducacion():void{
    this.eduServ.verEducacion(1).subscribe({
      next: data => {this.educacion = data},
      error: err =>{console.log(err)}
    })
  }
}
