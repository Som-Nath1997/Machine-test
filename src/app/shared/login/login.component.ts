import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{AuthService} from "../auth.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message: boolean = false;
  public form: FormGroup;

  constructor(public auth: AuthService, public route:Router) {
    this.form = new FormGroup({
      user_email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),

      user_pwd: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.auth.login(this.form.value).subscribe((res) => {
      if(res.status == 1){
        console.log(res);
        this.route.navigateByUrl('/dashboard');
      }
      else{
        console.log(res);
        if ((this.message = true)) {
          setTimeout(() => this.remove(), 2000);
        }

      }
     
      
    });
  }
  remove() {
    // auto close alert if required
    this.message = false;
  }
}
