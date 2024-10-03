import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  login(data){
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http.post('https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/auth/login',data, {headers:headers})
  }
}
