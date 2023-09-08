import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent { 
  submitted:boolean = false
  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ){}

  getControl(name: any): AbstractControl | null {
    return this.contactForm.get(name);
  }
  async onSubmit(){
    this.submitted = true
    if(this.contactForm.valid){
      const {name,email,message} = this.contactForm.value
      emailjs.init('nhE2f_gGh278n3ySF')
      let sendMessage = emailjs.send("service_jcppioj","template_oh7htcg",{
        from_name: name,
        message: message,
        from_email: email,
      });
      this._snackBar.open("Message Has Sented!", 'Close', {
        duration: 2000,
      });
    this.submitted = false

      this.contactForm.reset();
    }
  }
}
