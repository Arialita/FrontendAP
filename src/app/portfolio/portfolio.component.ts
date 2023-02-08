import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  bgUrl: string = ' ';
  isLoggedIn: boolean = false;
  constructor(
    private persoServ: UsuarioService,
    private authServ: AuthService,
    private router: Router) { }
  ngOnInit(): void {
    this.persoServ.verUsuario(1).subscribe({
      next: data => this.bgUrl = data.background
    });
    this.authServ.isLoggedIn$.subscribe({
      next: data => this.isLoggedIn = data
    })
  }
  goTo(){
    this.router.navigate(['editar/usuario'], { queryParams: { img: 'background' } });
  }
}
