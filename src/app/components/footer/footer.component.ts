import { Component, OnInit } from '@angular/core';
import { Redes } from 'src/app/interface/redes.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn:boolean = false;
  redes!:Redes;

  constructor(private auth: AuthService, private redesServ: UsuarioService) { }

  ngOnInit(): void {
    this.auth.currentUserSubject$.subscribe({next: data => this.isLoggedIn = data})
    this.redesServ.verRedes().subscribe({
      next: data => this.redes = data
    })
  }
}
