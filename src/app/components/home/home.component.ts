import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  usuario: Usuario = { nombre: '', apellido: '', ocupacion: '', localidad: '', provincia: '', acercaDe: '', avatar: '', background: '' };
  constructor(private usrServ: UsuarioService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.verUsuario();
    this.auth.currentUserSubject$.subscribe({ next: data => this.isLoggedIn = data });
  }

  verUsuario(): void {
    this.usrServ.verUsuario(1).subscribe({
      next: data => { this.usuario = data },
      error: err => (console.log('error ' + JSON.stringify(err)))
    })
  }
}
