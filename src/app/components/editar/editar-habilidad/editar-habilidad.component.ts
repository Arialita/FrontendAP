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
  title: string = 'Agregar nueva habilidad';
  habilidad: Habilidad = { nombre_hab: '', nivel: 0, nivel_nombre: '' }
  idioma: boolean = false;
  nivel_nombre!: string | undefined;
  habForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private habServ: HabilidadService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.habForm = this.fb.group({
      nombre_hab: ['', [Validators.required, Validators.maxLength(100)]],
      nivel: ['', Validators.required]
    })
    const id = this.activatedRoute.snapshot.params['id'];
    if (id != undefined) {
      this.title = 'Editar habilidad';
      this.habServ.verHabilidadDetalle(id).subscribe({
        next: data => {this.habilidad = data; this.habForm.patchValue({nombre_hab:this.habilidad.nombre_hab})},
        error: err => console.log(err)
      });
    }
  }

  get nombre_habilidad() {
    return this.habForm.get('nombre_hab')!;
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
    this.nivel_nombre = document.getElementById(this.nivel.value)?.innerText
    if (this.idioma) {
      let n: number = parseInt(this.nivel.value) - 10;
      this.habForm.patchValue({ 'nivel': n });
    }
    let temp: Habilidad = this.habForm.value;
    temp.nivel_nombre = this.nivel_nombre!;
    if (this.habilidad.id_hab != undefined) {
      this.habServ.editarHabilidad(temp, this.habilidad.id_hab).subscribe(
        {
          next: () => {
            this.habForm.reset();
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.habilidad));
            console.log(this.habForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      this.habServ.crearHabilidad(temp).subscribe(
        {
          next: () => {
            this.habForm.reset();
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.habilidad));
            console.log(this.habForm.value)
            this.router.navigate(['/']);
          }
        }
      )
    }
  }

  onCancel() {
    this.habForm.reset();
    this.router.navigate(['/home/habilidad']);
  }

  onToggle(temp: boolean) {
    this.idioma = temp;
  }
}
