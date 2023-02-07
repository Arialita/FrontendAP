import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUserSubject$.subscribe({next: data => this.isLoggedIn = data})
  }
}
