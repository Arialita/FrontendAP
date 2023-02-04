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
  educacion: Educacion = {titulo:'',instituto:'', fecha_ini:'', fecha_fin:''};

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
    this.eduServ.verEducacionDetalle(id).subscribe({
      next: data => this.educacion = data,
      error: err => console.log(err)
    })
    
    this.eduForm = this.fb.group({
      titulo: ['', Validators.required],
      instituto: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    })
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
      'valid-input': !this.titulo.invalid,
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
    if (this.educacion.id_edu != undefined) {
      let temp:Educacion = this.eduForm.value;
      let newfecha_ini = this.datePipe.transform(this.fecha_ini.value, "yyyy-MM-dd HH:mm:ss","utc");
      let newfecha_fin = this.datePipe.transform(this.fecha_fin.value, "yyyy-MM-dd HH:mm:ss","utc");
      temp.fecha_ini = newfecha_ini!;
      temp.fecha_fin = newfecha_fin!;
      this.eduServ.editarEducacion(temp, this.educacion.id_edu).subscribe(
        {
          next: () => {
            this.eduForm.reset(this.eduForm.value);
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

  onCancel(){
    this.eduForm.reset(this.eduForm.value);
    this.router.navigate(['/home/educacion']);
  }
}
