import { Component, Input, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/interface/habilidad.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {
  n: number = 0;
  isLoggedIn: boolean = false;
  id_hab: number = 0;
  habilidad: Habilidad[] = [];


  constructor(private habServ: HabilidadService, private auth: AuthService) { }

  ngOnInit(): void {
    this.verHabilidad();
    this.scrollToElement();
    this.auth.isLogged.subscribe({ next: data => this.isLoggedIn = data })
  }

  scrollToElement(): void {
    const target = document.getElementById("habilidad")!;
    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  verHabilidad(): void {
    this.habServ.verHabilidad().subscribe({
      next: data => { this.habilidad = data; },
      error: err => { console.log(err) }
    })
  }

  onChoose(id: number) {
    this.id_hab = id;
  }

  onDelete() {
    this.habServ.borrarHabilidad(this.id_hab).subscribe({
      next: (data) => this.habilidad = data,
      error: err => alert('Error: ' + JSON.stringify(err))
    })
  }
}
