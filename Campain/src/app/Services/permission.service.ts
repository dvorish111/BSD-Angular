import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUp } from '../Classes/SignUp';
import { LogIn } from '../Classes/LogIn';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  baseUrl = "https://localhost:7182/api/Permission";

  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<LogIn[]> {
    return this.http.get<LogIn[]>(`${this.baseUrl}`);
  }
  
  getByPassword_Email(password: string, email: string): Observable<LogIn> {
    console.log("getByPassword_Email")
    return this.http.get<LogIn>(`${this.baseUrl}/Password/${password}/Email/${email}`);
  }
  
  createPermission(permissionToAdd: SignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}`, permissionToAdd);
  }

  deletePermission(permissionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${permissionId}`);
  }

  updatePermission(permissionId: number, permissionToUpdate: LogIn): Observable<any> {
    return this.http.put(`${this.baseUrl}/${permissionId}`, permissionToUpdate);
  }
}
