import { registerLocaleData } from '@angular/common';
import myLocaleEs from '@angular/common/locales/es';
import { Component, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/interface/trabajo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TrabajoService } from 'src/app/services/trabajo.service';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {
  isLoggedIn: boolean = false;

  id_trab: number = 0;

  trabajo: Trabajo[] = [];

  constructor(private trabServ: TrabajoService, private auth: AuthService) { }

  ngOnInit(): void {
    this.verTrabajo();
    this.scrollToElement();
    registerLocaleData(myLocaleEs);
    this.auth.currentUserSubject$.subscribe({ next: data => this.isLoggedIn = data })
  }

  scrollToElement(): void {
    const target = document.getElementById("trabajo")!;
    target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
  verTrabajo(): void {
    this.trabServ.verTrabajos().subscribe({
      next: data => { this.trabajo = data },
      error: err => { console.log(err) }
    })
  }

  onChoose(id: number) {
    this.id_trab = id;
  }

  onDelete() {
    this.trabServ.borrarTrabajo(this.id_trab).subscribe({
      next: (data) => this.trabajo = data,
      error: err => alert('Error: ' + JSON.stringify(err))
    })
  }
}
