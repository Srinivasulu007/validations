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
      mobile:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
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

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const userDetails = JSON.stringify(this.registrationForm.value);
      console.log("registration form data", userDetails);
    }
   
  }

}
