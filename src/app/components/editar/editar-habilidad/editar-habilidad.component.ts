import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Habilidad } from 'src/app/interface/habilidad.interface';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-editar-habilidad',
  templateUrl: './editar-habilidad.component.html',
  styleUrls: ['./editar-habilidad.component.css']
})
export class EditarHabilidadComponent {
  habilidad: Habilidad = {nombre_habilidad:'',nivel:0, nivel_nombre:''}
  idioma:boolean=false;
  nivel_nombre!:string | undefined;
  habForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private habServ: HabilidadService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.habServ.verHabilidadDetalle(id).subscribe({
      next: data => this.habilidad = data,
      error: err => console.log(err)
    })
    
    this.habForm = this.fb.group({
      nombre_habilidad: ['', Validators.required],
      nivel: ['', Validators.required]
    })
  }

  get nombre_habilidad() {
    return this.habForm.get('nombre_habilidad')!;
  }

  get nivel() {
    return this.habForm.get('nivel')!;
  }

  nombre_habilidadClass() {
    return {
      'valid-input': !this.nombre_habilidad.invalid,
      'invalid-input': (this.nombre_habilidad.invalid && this.nombre_habilidad.dirty)
    }
  }

  nivelClass() {
    return {
      'valid-input': !this.nivel.invalid,
      'invalid-input': (this.nivel.invalid && this.nivel.dirty)
    }
  }

  onSubmit() {
    if (this.habilidad.id_hab != undefined) {
      this.nivel_nombre = document.getElementById(this.nivel.value)?.innerText
      if(this.idioma){
        let n:number = parseInt(this.nivel.value) - 10;
        this.habForm.patchValue({'nivel':n});
      }
      this.nivel_nombre = document.getElementById("1")?.innerText
      console.log(this.nivel_nombre);
      let temp:Habilidad = this.habForm.value;
      temp.nivel_nombre = this.nivel_nombre!;
      this.habServ.editarHabilidad(temp, this.habilidad.id_hab).subscribe(
        {
          next: () => {
            this.habForm.reset(this.habForm.value);
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.habilidad));
            console.log(this.habForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  onCancel(){
    this.habForm.reset(this.habForm.value);
    this.router.navigate(['/home/habilidad']);
  }

  onToggle(temp:boolean){
    this.idioma = temp;
  }
}
