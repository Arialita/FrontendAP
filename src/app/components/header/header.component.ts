import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false;
  @Input() login:boolean = false;
  constructor(private router: Router, private auth:AuthService){}

  ngOnInit(): void {
    this.auth.isLogged.subscribe({next:data=>this.isLoggedIn=data})
  }

  logOut(){
    sessionStorage.clear();
    this.auth.setUsuarioAutenticado(null);
    this.auth.setLoggedIn();
    this.router.navigate([''])
  }
}
