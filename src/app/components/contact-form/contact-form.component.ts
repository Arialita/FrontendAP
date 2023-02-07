import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  constructor(private fb: FormBuilder, private contact: ContactService) {
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      Nombre: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      _subject: '',
      Comment: ['', [Validators.required]]
    })
  }

  get nombre(){
    return this.contactForm.get('Nombre')!;
  }

  get email(){
    return this.contactForm.get('Email')!;
  }

  get comment(){
    return this.contactForm.get('Comment')!;
  }

  nombreClass(){
    return {
      'valid-input': !this.nombre.invalid,
      'invalid-input': (this.nombre.invalid && this.nombre.dirty)
    }
  }

  emailClass (){
    return {
      'valid-input': !this.email.invalid,
      'invalid-input': (this.email.invalid && this.email.dirty)
    }
  }

  commentClass(){
    return {
      'valid-input': !this.comment.invalid,
      'invalid-input': (this.comment.invalid && this.comment.dirty)
    }
  }

  onSubmit(FormData: any) {
    console.log(FormData)
    this.contact.enviarCorreo(FormData)
      .subscribe({
        next: () => {
          location.href = 'https://mailthis.to/confirm'
        }, error: error => {
          console.warn(error.responseText)
          console.log({ error })
        }
      })
  }
}