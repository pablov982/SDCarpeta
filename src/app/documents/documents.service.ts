import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor( private http: HttpClient) { }

  uploadDocument(file:any, data:any, id){
    let headers = new HttpHeaders()
    .set('Content-Type', 'multipart/form-data')

    const body:FormData = new FormData()
    body.append('file', file)
    body.append('name', data.name)
    body.append('description', data.description)
    body.append('verify', data.verify)

    return this.http.post(`https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/api/files/upload/${id}`, body)

  }

  getListDocumentsUser(data:string){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json');


    return this.http.get(`https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/api/files/list/${data}`)
  }

  verifyDocument(documentId, user){
    let body = ''
    return this.http.post<any>(`https://cbhqf7r06b.execute-api.us-east-1.amazonaws.com/dev/api/files/verify/user/${user}/documentId/${documentId}`, body)
  }
}
