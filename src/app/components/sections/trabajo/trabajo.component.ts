import { Component, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/interface/trabajo.interface';
import { TrabajoService } from 'src/app/services/trabajo.service';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit{

  trabajo:Trabajo[] = [];

  constructor(private trabServ: TrabajoService){}

  ngOnInit(): void {
    /*this.verTrabajo();*/
    this.scrollToElement();
  }

  scrollToElement(): void {
    const target = document.getElementById("trabajo")!;
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  verTrabajo():void {
    this.trabServ.verTrabajo(1).subscribe({
      next:data =>{this.trabajo = data},
      error: err =>{console.log(err)}
    })
  }
}
