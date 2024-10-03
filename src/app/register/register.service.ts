import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(data) {
    let header:HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');
    
    return this.http.post('https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/auth/register', data);
  }
}
