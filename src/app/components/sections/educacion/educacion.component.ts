import { registerLocaleData } from '@angular/common';
import myLocaleEs from '@angular/common/locales/es';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/interface/educacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  id_edu: number = 0;
  isLoggedIn: boolean = false;
  educacion: Educacion[] = []

  constructor(private eduServ: EducacionService, private auth: AuthService) { }

  ngOnInit(): void {
    this.verEducacion();
    this.scrollToElement();
    registerLocaleData(myLocaleEs);
    this.auth.isLogged.subscribe({ next: data => this.isLoggedIn = data })
  }

  scrollToElement(): void {
    const target = document.getElementById("educacion")!;
    target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  verEducacion(): void {
    this.eduServ.verEducacion().subscribe({
      next: data => { this.educacion = data },
      error: err => { console.log(err) }
    })
  }

  onChoose(id: number) {
    this.id_edu = id;
  }
  onDelete() {
    this.eduServ.borrarEducacion(this.id_edu).subscribe({
      next: (data) => this.educacion = data,
      error: err => alert('Error: ' + JSON.stringify(err))
    })
  }
}
