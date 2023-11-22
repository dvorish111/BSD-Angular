import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http:HttpClient) { }
  baseUrl = "http://localhost:5095/api/LogIn";

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

 

}
