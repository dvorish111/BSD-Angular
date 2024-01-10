import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Contact1}     from '../Classes/otherObject/Contact1';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = "https://localhost:7182/api/Contact"
  constructor(private http: HttpClient) { }

  sendEmail(contact1:Contact1): Observable<any> {
    return this.http.post(`${this.baseUrl}`,contact1);
  }

 
  
}
