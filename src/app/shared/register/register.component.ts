import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{AuthService} from "../auth.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  hobbies!: FormArray;

  constructor(public auth: AuthService, public route:Router) {
    this.form = new FormGroup({
      user_name: new FormControl('', Validators.required),
      user_email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      user_phone_no: new FormControl('', Validators.required),
      user_pwd: new FormControl('', Validators.required),
      user_gender: new FormControl('', Validators.required),

    });
   }

  ngOnInit(): void {
    
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.auth.post(this.form.value).subscribe((res) => {
      // this.message = true;
      console.log('Employee created successfully!');
      this.form.reset({});
      this.form.disable();
      this.route.navigateByUrl('/login');
    });
  }
  changeuser_gender(e:any) {

   }
   
}
