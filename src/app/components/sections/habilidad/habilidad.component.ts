import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/interface/habilidad.interface';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit{
  habilidad:Habilidad[] = [];

  constructor(private habServ:HabilidadService){}

  ngOnInit(): void {
    this.verHabilidad();
    this.scrollToElement();
  }

  scrollToElement(): void {
    const target = document.getElementById("habilidad")!;
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  verHabilidad():void {
    this.habServ.verHabilidad(1).subscribe({
      next: data => {this.habilidad = data},
      error: err => {console.log(err)}
    })
  }
}
