import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/interface/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent {
  proyecto: Proyecto = {nombre_proyecto:'',url:'', lenguaje:''}

  proyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private proyServ: ProyectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyServ.verProyectoDetalle(id).subscribe({
      next: data => this.proyecto = data,
      error: err => console.log(err)
    })
    
    this.proyForm = this.fb.group({
      nombre_proyecto: ['', Validators.required],
      url: ['', Validators.required],
      lenguaje:['', Validators.required]
    })
  }

  get nombre_proyecto() {
    return this.proyForm.get('nombre_proyecto')!;
  }

  get url() {
    return this.proyForm.get('url')!;
  }

  get lenguaje(){
    return this.proyForm.get('lenguaje')!;
  }

  nombre_proyectoClass() {
    return {
      'valid-input': !this.nombre_proyecto.invalid,
      'invalid-input': (this.nombre_proyecto.invalid && this.nombre_proyecto.dirty)
    }
  }

  urlClass() {
    return {
      'valid-input': !this.url.invalid,
      'invalid-input': (this.url.invalid && this.url.dirty)
    }
  }

  lenguajeClass() {
    return {
      'valid-input': !this.lenguaje.invalid,
      'invalid-input': (this.lenguaje.invalid && this.lenguaje.dirty)
    }
  }

  onSubmit() {
    if (this.proyecto.id_proy != undefined) {
      let temp:Proyecto = this.proyForm.value;
      this.proyServ.editarProyecto(temp, this.proyecto.id_proy).subscribe(
        {
          next: () => {
            this.proyForm.reset(this.proyForm.value);
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.proyecto));
            console.log(this.proyForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  onCancel(){
    this.proyForm.reset(this.proyForm.value);
    this.router.navigate(['/home/proyecto']);
  }
}
