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
    return this.http.get<LogIn[]>(`${this.baseUrl}/getAll`);
  }

  createPermission(permissionToAdd: SignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, permissionToAdd);
  }

  deletePermission(permissionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${permissionId}`);
  }

  updatePermission(permissionId: number, permissionToUpdate: LogIn): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${permissionId}`, permissionToUpdate);
  }
}
