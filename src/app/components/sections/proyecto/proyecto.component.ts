import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/interface/proyecto.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  isLoggedIn:boolean = false;
  proyecto:Proyecto[] = [];

  constructor(private proyServ:ProyectoService, private auth:AuthService){}


  ngOnInit(): void {
    //this.verProyecto();
    this.auth.isLogged.subscribe({next:data=>this.isLoggedIn=data})

  }
  verProyecto():void{
    this.proyServ.verProyecto().subscribe({
      next: data=>{this.proyecto = data},
      error: err =>{console.log(err)}
    })
  }
}
