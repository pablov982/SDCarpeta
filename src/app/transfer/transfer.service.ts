import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operators } from '../core/mock';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor( private http: HttpClient) { }

  getOperators(){
    return this.http.get('https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/operators/list')
  }

  transferUser(data){
    return this.http.post('https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/transfer', data)
  }
}
