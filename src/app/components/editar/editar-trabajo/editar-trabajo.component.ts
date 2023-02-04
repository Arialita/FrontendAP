import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabajo } from 'src/app/interface/trabajo.interface';
import { TrabajoService } from 'src/app/services/trabajo.service';

@Component({
  selector: 'app-editar-trabajo',
  templateUrl: './editar-trabajo.component.html',
  styleUrls: ['./editar-trabajo.component.css']
})
export class EditarTrabajoComponent implements OnInit {
  trabajo: Trabajo = { puesto: '', compania: '', descripcion: '', fecha_ini: '', fecha_fin: '' };

  trabForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trabServ: TrabajoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.trabServ.verTrabajo(id).subscribe({
      next: data => this.trabajo = data,
      error: err => console.log(err)
    })

    this.trabForm = this.fb.group({
      puesto: ['', Validators.required],
      compania: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    })
  }

  get puesto() {
    return this.trabForm.get('puesto')!;
  }

  get compania() {
    return this.trabForm.get('compania')!;
  }

  get descripcion() {
    return this.trabForm.get('descripcion')!;
  }

  get fecha_ini() {
    return this.trabForm.get('fecha_ini')!;
  }

  get fecha_fin() {
    return this.trabForm.get('fecha_fin')!;
  }

  puestoClass() {
    return {
      'valid-input': !this.puesto.invalid,
      'invalid-input': (this.puesto.invalid && this.puesto.dirty)
    }
  }

  companiaClass() {
    return {
      'valid-input': !this.compania.invalid,
      'invalid-input': (this.compania.invalid && this.compania.dirty)
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

  descripcionClass() {
    return {
      'valid-input': !this.descripcion.invalid,
      'invalid-input': (this.descripcion.invalid && this.descripcion.dirty)
    }
  }
  onSubmit() {
    if (this.trabajo.id_trab != undefined) {
      let temp: Trabajo = this.trabForm.value;
      let newfecha_ini = this.datePipe.transform(this.fecha_ini.value, "yyyy-MM-dd HH:mm:ss", "utc");
      let newfecha_fin = this.datePipe.transform(this.fecha_fin.value, "yyyy-MM-dd HH:mm:ss", "utc");
      temp.fecha_ini = newfecha_ini!;
      temp.fecha_fin = newfecha_fin!;
      this.trabServ.editarTrabajo(temp, this.trabajo.id_trab).subscribe(
        {
          next: () => {
            this.trabForm.reset(this.trabForm.value);
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.trabajo));
            console.log(this.trabForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  onCancel() {
    this.trabForm.reset(this.trabForm.value);
    this.router.navigate(['/home/trabajo']);
  }
}
