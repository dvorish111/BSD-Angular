import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../Classes/OtherObject/Contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = "https://localhost:7182/api/Contact"
  constructor(private http: HttpClient) { }

  sendEmail(contact:Contact): Observable<any> {
    return this.http.post(`${this.baseUrl}`,contact);
  }

 
  
}
