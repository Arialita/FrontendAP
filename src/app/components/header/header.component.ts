import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  linkInstagram: string = '';
  linkLinkedIn: string = '';
  linkGithub: string = '';
  isLoggedIn: boolean = false;
  @Input() login: boolean = false;
  @Input() editRedes: boolean = false;
  constructor(private router: Router, private auth: AuthService, private redesServ: UsuarioService) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe({ next: data => this.isLoggedIn = data })
    this.redesServ.verRedes().subscribe({
      next: data => { this.linkGithub = data.github; this.linkInstagram = data.instagram; this.linkLinkedIn = data.linkedIn }
    })
  }

  logOut() {
    sessionStorage.clear();
    this.auth.setUsuarioAutenticado(null);
    this.auth.setLoggedIn();
    this.router.navigate([''])
  }
}
