import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/interface/proyecto.interface';
import { ImageService } from 'src/app/services/image.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent {
  proyecto: Proyecto = {nombre_proyecto: '', img: '', descripcion: '', lenguaje: '', url: ''};
  img!: boolean;
  isLoading:boolean = false;
  title: string = 'Editar proyecto';
  proyForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private proyServ: ProyectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private imgServ: ImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: data => { this.img = data['img'] }
    })
    const id = this.activatedRoute.snapshot.params['id'];
    this.imgServ.loaded.subscribe({
      next: data => this.isLoading = data
    })
    this.proyForm = this.fb.group({
      nombre_proyecto: ['', [Validators.required, Validators.maxLength(100)]],
      url: ['', [Validators.required, Validators.maxLength(255)]],
      lenguaje: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      img: ['']
    });
    if (id != undefined) {
      this.proyServ.verProyectoDetalle(id).subscribe({
        next: data => {
          this.proyecto = data;
          this.proyForm.patchValue({
            nombre_proyecto: this.proyecto.nombre_proyecto,
            lenguaje: this.proyecto.lenguaje,
            url: this.proyecto.url,
            descripcion: this.proyecto.descripcion,
            img: this.proyecto.img
          })
        },
        error: err => console.log(err)
      })
    } else {
      this.title = 'Agregar nuevo proyecto';
    }
  }

  get nombre_proyecto() {
    return this.proyForm.get('nombre_proyecto')!;
  }

  get url() {
    return this.proyForm.get('url')!;
  }

  get lenguaje() {
    return this.proyForm.get('lenguaje')!;
  }

  get descripcion() {
    return this.proyForm.get('descripcion')!;
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

  descripcionClass() {
    return {
      'valid-input': !this.descripcion.invalid,
      'invalid-input': (this.descripcion.invalid && this.descripcion.dirty)
    }
  }


  onSubmit() {
    let temp: Proyecto = this.proyForm.value;
    if (this.imgServ.url != '') {
      temp.img = this.imgServ.url;
    }
    if (this.proyecto.id_proyecto != undefined) {
      this.proyServ.editarProyecto(temp, this.proyecto.id_proyecto).subscribe(
        {
          next: () => {
            this.proyForm.reset();
          },
          error: err => {
            console.log('Fail ' + JSON.stringify(err.error));
            console.log(JSON.stringify(this.proyecto));
            console.log(this.proyForm.value)
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      this.proyServ.crearProyecto(temp).subscribe(
        {
          next: () => {
            this.proyForm.reset();
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

  onCancel() {
    this.proyForm.reset();
    this.router.navigate(['/home/proyecto']);
  }

  uploadImg($event: any) {
    this.isLoading = true;
    const name = $event.target.id + this.proyecto.id_proyecto;
    this.imgServ.uploadImg($event, name)
  }
}
