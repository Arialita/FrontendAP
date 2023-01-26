import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario:Usuario = {id:undefined, nombre:'', apellido:'', ocupacion:'', localidad:'', provincia:'', acerca_de:''};
  constructor(private usrServ: UsuarioService){
  }

  ngOnInit(): void {
    /*this.verUsuario();*/
  }

  verUsuario():void{
    this.usrServ.verUsuario(1).subscribe({
      next: data =>{this.usuario = data},
      error: err=>(console.log('error ' + JSON.stringify(err)))
    })
  }
}
