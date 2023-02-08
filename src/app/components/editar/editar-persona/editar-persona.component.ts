import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario.interface';
import { ImageService } from 'src/app/services/image.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})

export class EditarPersonaComponent {
  persona: Usuario = { nombre: '', apellido: '', ocupacion: '', localidad: '', provincia: '', acercaDe: '', avatar: '', background: '' }
  isEdittingImg: boolean = false;
  isLoading: boolean = false;
  persoForm!: FormGroup;
  title!: string;
  imgName!: string;
  img!:string;
  constructor(
    private fb: FormBuilder,
    private persoServ: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private imgServ: ImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: data => { this.img = data['img'] }
    })
    this.persoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(20)]],
      ocupacion: ['', [Validators.required, Validators.maxLength(20)]],
      localidad: ['', [Validators.required, Validators.maxLength(50)]],
      provincia: ['', [Validators.required, Validators.maxLength(50)]],
      acercaDe: ['', [Validators.required, Validators.maxLength(255)]],
      avatar: '',
      background:''
    })
    this.persoServ.verUsuario(1).subscribe({
      next: data => {
        this.persona = data,
          this.persoForm.patchValue({ nombre: this.persona.nombre, apellido: this.persona.apellido, ocupacion: this.persona.ocupacion, localidad: this.persona.localidad, provincia: this.persona.provincia, acercaDe: this.persona.acercaDe, avatar: this.persona.avatar, background: this.persona.background })
      },
      error: err => console.log(err)
    })
    this.imgServ.loaded.subscribe({
      next: data => {
        this.isLoading = data
      }
    })
    this.imgServ.imgName.subscribe({
      next: data => this.imgName = data
    })
    if (this.img != undefined) {
      this.isEdittingImg = true;
      this.title = this.img;
    }
  }

  get nombre() {
    return this.persoForm.get('nombre')!;
  }

  get apellido() {
    return this.persoForm.get('apellido')!;
  }

  get ocupacion() {
    return this.persoForm.get('ocupacion')!;
  }

  get localidad() {
    return this.persoForm.get('localidad')!;
  }

  get provincia() {
    return this.persoForm.get('provincia')!;
  }

  get acercaDe() {
    return this.persoForm.get('acercaDe')!;
  }

  nombreClass() {
    return {
      'valid-input': !this.nombre.invalid,
      'invalid-input': (this.nombre.invalid && this.nombre.dirty)
    }
  }

  apellidoClass() {
    return {
      'valid-input': !this.apellido.invalid,
      'invalid-input': (this.apellido.invalid && this.apellido.dirty)
    }
  }

  ocupacionClass() {
    return {
      'valid-input': !this.ocupacion.invalid,
      'invalid-input': (this.ocupacion.invalid && this.ocupacion.dirty)
    }
  }

  localidadClass() {
    return {
      'valid-input': !this.localidad.invalid,
      'invalid-input': (this.localidad.invalid && this.localidad.dirty)
    }
  }

  provinciaClass() {
    return {
      'valid-input': !this.provincia.invalid,
      'invalid-input': (this.provincia.invalid && this.provincia.dirty)
    }
  }

  acercaDeClass() {
    return {
      'valid-input': !this.acercaDe.invalid,
      'invalid-input': (this.acercaDe.invalid && this.acercaDe.dirty)
    }
  }



  onSubmit() {
    let temp: Usuario = this.persoForm.value;
    if (this.imgName == 'avatar') {
      temp.avatar = this.imgServ.url;
    } else if (this.imgName == 'background'){
      temp.background = this.imgServ.url
    }
    this.persoServ.editarPersona(temp).subscribe(
      {
        next: () => {
          this.persoForm.reset();
        },
        error: err => {
          console.log('Fail ' + JSON.stringify(err));
          this.router.navigate(['/']);
        }
      }
    );
  }

  uploadImage($event: any) {
    this.isLoading = true;
    const nombre = $event.target.id;
    if (nombre == 'avatar' || nombre == 'background') {
      this.imgServ.uploadImg($event, nombre);
    }
  }

  onCancel() {
    this.persoForm.reset();
    this.router.navigate(['/home/persona']);
  }
}
