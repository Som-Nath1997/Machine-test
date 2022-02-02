import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import{Item} from './item';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "https://3-upstesting.com/machine_test/index.php/web_api/Users";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
   
  getAll() {
    return this.httpClient.get(this.apiURL + '/Users')
  }
   
  post(post:any): Observable<Item> {
    return this.httpClient.post<Item>(this.apiURL + '/Register', JSON.stringify(post), this.httpOptions)
  }  
  login(post:any){
    return this.httpClient.get<any>(this.apiURL + `/login?user_email=` + post.user_email + `&user_pwd=` + post.user_pwd )
  }  
   
  find(user_id:number)  {
    return this.httpClient.get<any>(this.apiURL + '/user_detail?' + 'user_id=' + user_id)
  }
   
  update(post: any) {
    return this.httpClient.put<any>(this.apiURL + '/update_user')
  }
   
  delete(user_id: number){
    return this.httpClient.get(this.apiURL + '/Users/remove_user"' + user_id, this.httpOptions)
  }
  
}
