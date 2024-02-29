import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SignUp } from '../Classes/SignUp';
import { LogIn } from '../Classes/LogIn';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  baseUrl = "https://localhost:7182/api/Permission";
  detailesMenegr!:SignUp;
  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<LogIn[]> {
    return this.http.get<LogIn[]>(`${this.baseUrl}`);
  }
  
  getByPassword_Email(password: string, email: string): Observable<SignUp> {
    console.log("getByPassword_Email")
   return this.http.get<SignUp>(`${this.baseUrl}/Password/${password}/Email/${email}`).pipe(
    tap((response: SignUp) => {
      this.detailesMenegr = response; // Save the response in the detailsMenegr variable
      this.detailesMenegr.password="";
   })
   )
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

  updatePermissionByMail(permissionMail: string, permissionToUpdate: SignUp): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateByGmail/${permissionMail}`, permissionToUpdate);
  }

  confirmPassword(password: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/ConfirmPassword/${password}`,password);
  }
}
