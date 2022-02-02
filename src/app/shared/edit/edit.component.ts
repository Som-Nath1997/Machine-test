import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../auth.service'
import{Item} from '../item'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public item: any;
  public form: FormGroup;
  user_id:number;

  constructor(public auth: AuthService, public route:Router, private routes: ActivatedRoute,) { 
    this.user_id = this.routes.snapshot.params['itemId'];
    this.auth.find(this.user_id).subscribe((res) => {
      this.item = res.data[0];
      this.form.patchValue({
        user_id: this.item.user_id,
        user_name: this.item.user_name,
        user_email: this.item.user_email,
        user_phone_no: this.item.user_phone_no,
        user_pwd: this.item.user_pwd,
        user_gender: this.item.user_gender,
      });
    });

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
    this.auth.update(this.form.value).subscribe((res) => {
      console.log(res)
      // this.message = true;
      console.log('Employee updated successfully!');
      this.form.reset({});
      this.form.disable();
      // this.route.navigateByUrl('/login');
    });
  }
  changeuser_gender(e:any) {

  }

}
