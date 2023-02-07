import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  bgUrl:string = ' ';
  constructor(private persoServ: UsuarioService ){}
  ngOnInit(): void {
    this.persoServ.verUsuario(1).subscribe({
      next: data => this.bgUrl = data.background
    })
  }
  
}
