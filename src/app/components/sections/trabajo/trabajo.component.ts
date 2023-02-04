import { Component, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/interface/trabajo.interface';
import { TrabajoService } from 'src/app/services/trabajo.service';
import myLocaleEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit{

  trabajo:Trabajo[] = [];

  constructor(private trabServ: TrabajoService){}

  ngOnInit(): void {
    this.verTrabajo();
    this.scrollToElement();
    registerLocaleData(myLocaleEs);
  }

  scrollToElement(): void {
    const target = document.getElementById("trabajo")!;
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  verTrabajo():void {
    this.trabServ.verTrabajos().subscribe({
      next:data =>{this.trabajo = data},
      error: err =>{console.log(err)}
    })
  }

  test(id:number | undefined){
    console.log(id)
  }
}
