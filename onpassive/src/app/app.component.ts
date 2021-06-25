import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'onpassive';
  submitted = false;
  registrationForm : FormGroup | any;
  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
      lastname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[7-9]\\d{9}')]],
        password:['',[Validators.required]],
        confirmpassword:['',[Validators.required]],
      },
      {
        validators: this.passwordMatch('password','confirmpassword')
    });
  }


  // Validations for matchpassword
  passwordMatch(password:string, matchPassword:string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[matchPassword];
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMatch : true})
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const userDetails = JSON.stringify(this.registrationForm.value);
      console.log("registration form data", userDetails);
    }
   
  }

}
