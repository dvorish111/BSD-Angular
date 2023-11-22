import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Donor } from '../Classes/Donor';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  baseUrl = "https://localhost:7182/api/Donor"
  constructor(private http: HttpClient) { }

  getAllDonors(): Observable<Donor[]> {
    return this.http.get<Donor[]>(`${this.baseUrl}/Gat`);
  }
  getByIdDonor(donorId:number):Observable<Donor>{
    return this.http.get<Donor>(`${this.baseUrl}/Gat/${donorId}`);

  }
  createDonor(donorToAdd: Donor): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, donorToAdd);
  }

  deleteDonor(donorId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${donorId}`);
  }

  updateDonor(donorToUpdate: Donor): Observable<any> {
    return this.http.put(`${this.baseUrl}/Put`, donorToUpdate);
  }
}
