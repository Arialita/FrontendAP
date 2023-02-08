import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/interface/proyecto.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  id_proy: number = 0;
  isLoggedIn: boolean = false;
  proyecto: Proyecto[] = [];

  constructor(private proyServ: ProyectoService, private auth: AuthService, private router: Router, private imgServ: ImageService) { }


  ngOnInit(): void {
    this.verProyecto();
    this.scrollToElement();
    this.auth.isLogged.subscribe({ next: data => this.isLoggedIn = data });
  }
  verProyecto(): void {
    this.proyServ.verProyecto().subscribe({
      next: data => { this.proyecto = data },
      error: err => { console.log(err) }
    })
  }

  scrollToElement(): void {
    const target = document.getElementById("proyecto")!;
    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  onChoose(id: number) {
    this.id_proy = id;
  }

  onDelete() {
    const name = 'img' + this.id_proy;
    this.proyServ.borrarProyecto(this.id_proy).subscribe(
      {
        next: data => {this.proyecto = data; this.imgServ.deleteImg(name)},
        error: err => alert('Error: ' + JSON.stringify(err)) 
      }
    )
  }

  goTo(id:number, isimg:boolean | null){
    this.router.navigate([`/editar/proyecto/${id}` ], {queryParams: { img: isimg }, queryParamsHandling: 'merge',})
  }
}
