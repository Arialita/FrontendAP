import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/interface/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyecto:Proyecto[] = [];

  constructor(private proyServ:ProyectoService){}


  ngOnInit(): void {
    this.verProyecto();

  }
  verProyecto():void{
    this.proyServ.verProyecto(1).subscribe({
      next: data=>{this.proyecto = data},
      error: err =>{console.log(err)}
    })
  }
}
