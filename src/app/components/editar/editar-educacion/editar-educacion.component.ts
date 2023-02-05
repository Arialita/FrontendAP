import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/interface/educacion.interface';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent {
  title: string = 'Agregar historia académica';

  educacion: Educacion = { titulo: '', instituto: '', fecha_ini: '', fecha_fin: '' };

  eduForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eduServ: EducacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.eduForm = this.fb.group({
      titulo: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      instituto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    })
    if (id != undefined) {
      let controlFecha_ini;
      let controlFecha_fin;
      this.eduServ.verEducacionDetalle(id).subscribe({
        next: data => {
          this.educacion = data;
          controlFecha_fin = this.datePipe.transform(this.educacion.fecha_fin, "yyyy-MM-dd");
          controlFecha_ini = this.datePipe.transform(this.educacion.fecha_ini, "yyyy-MM-dd");
          this.eduForm.patchValue({ titulo: this.educacion.titulo, instituto: this.educacion.instituto, fecha_ini: controlFecha_ini, fecha_fin: controlFecha_fin });
        },
        error: err => console.log(err)
      })
      this.title = 'Editar historia académica';
    }
  }

  get titulo() {
    return this.eduForm.get('titulo')!;
  }

  get instituto() {
    return this.eduForm.get('instituto')!;
  }

  get fecha_ini() {
    return this.eduForm.get('fecha_ini')!;
  }

  get fecha_fin() {
    return this.eduForm.get('fecha_fin')!;
  }

  tituloClass() {
    return {
      'valid-input': !this.titulo.invalid ,
      'invalid-input': (this.titulo.invalid && this.titulo.dirty)
    }
  }

  institutoClass() {
    return {
      'valid-input': !this.instituto.invalid,
      'invalid-input': (this.instituto.invalid && this.instituto.dirty)
    }
  }

  fecha_iniClass() {
    return {
      'valid-input': !this.fecha_ini.invalid,
      'invalid-input': (this.fecha_ini.invalid && this.fecha_ini.dirty)
    }
  }

  fecha_finClass() {
    return {
      'valid-input': !this.fecha_fin.invalid,
      'invalid-input': (this.fecha_fin.invalid && this.fecha_fin.dirty)
    }
  }

  onSubmit() {
    let temp: Educacion = this.eduForm.value;
    let newfecha_ini = this.datePipe.transform(this.fecha_ini.value, "yyyy-MM-dd HH:mm:ss", "utc");
    let newfecha_fin = this.datePipe.transform(this.fecha_fin.value, "yyyy-MM-dd HH:mm:ss", "utc");
    temp.fecha_ini = newfecha_ini!;
    temp.fecha_fin = newfecha_fin!;
    if (this.educacion.id_edu != undefined) {
      this.eduServ.editarEducacion(temp, this.educacion.id_edu).subscribe(
        {
          next: () => {
            this.eduForm.reset();
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.educacion));
            console.log(this.eduForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      this.eduServ.crearEducacion(temp).subscribe(
        {
          next: () => {
            this.eduForm.reset();
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.educacion));
            console.log(this.eduForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  onCancel() {
    this.eduForm.reset();
    this.router.navigate(['/home/educacion']);
  }
}
