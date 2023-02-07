import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Redes } from 'src/app/interface/redes.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-redes',
  templateUrl: './editar-redes.component.html',
  styleUrls: ['./editar-redes.component.css']
})
export class EditarRedesComponent implements OnInit {
  editRedes:boolean = false;
  redesForm!: FormGroup;

  constructor(
    private redesServ: UsuarioService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.redesForm = this.fb.group({
      instagram: ['', [Validators.maxLength(255), Validators.required]],
      linkedIn: ['', [Validators.maxLength(255), Validators.required]],
      github: ['', [Validators.maxLength(255), Validators.required]]
    });
    this.redesServ.verRedes().subscribe({
      next: data => this.redesForm.patchValue({instagram:data.instagram, linkedIn:data.linkedIn, github:data.github})
    })
    this.editRedes = true;
  }

  get instagram(){
    return this.redesForm.get('instagram')!;
  }

  get github(){
    return this.redesForm.get('github')!;
  }

  get linkedIn(){
    return this.redesForm.get('linkedIn')!;
  }

  instagramClass(){
    return {
      'valid-input': !this.instagram.invalid,
      'invalid-input': (this.instagram.invalid && this.instagram.dirty)
    }
  }

  githubClass(){
    return {
      'valid-input': !this.github.invalid,
      'invalid-input': (this.github.invalid && this.github.dirty)
    }
  }

  linkedInClass(){
    return {
      'valid-input': !this.linkedIn.invalid,
      'invalid-input': (this.linkedIn.invalid && this.linkedIn.dirty)
    }
  }

  onSubmit(redes: Redes){
    this.redesServ.editarRedes(redes).subscribe({
      next: () => this.redesForm.reset(),
      error: err => alert('Error: ' + JSON.stringify(err))
    })
  }

  onCancel(){
    this.redesForm.reset();
    this.router.navigate(['/home']);
  }
}
