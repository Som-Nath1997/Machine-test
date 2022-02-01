import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service'
import {Item} from '../item'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public items : any;
  message: boolean = false;

  constructor(public auth: AuthService, public route:Router) { }

  ngOnInit(): void {
    this.auth.getAll().subscribe((data: any) => {
      this.items= data.data;
      console.log(this.items);
    });
  }


  deletePost(user_id: number, user_name: string) {
    if (
      confirm(
        'Do you really want to delete :  Id is => ' +
        user_id +
          ' First-Name =>' +
          user_name
      )
    ) {
      this.auth.delete(user_id).subscribe((res) => {
        this.items = this.items.filter((item:any) => item.user_id !== user_id)
        if ((this.message = true)) {
          setTimeout(() => this.remove(), 3000);
        console.log('Post deleted successfully!');
        this.message = true;
        }
    
      });
    }
  }
  remove() {
    // auto close alert if required
    this.message = false;
  }

}
