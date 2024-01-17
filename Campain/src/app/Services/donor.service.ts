import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Donor } from '../Classes/Donor';
import { AllDonor } from '../Classes/AllClasses/AllDonor';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  baseUrl = "https://localhost:7182/api/Donor"
  constructor(private http: HttpClient) { }

  getAllDonors(): Observable<Donor[]> {
    return this.http.get<Donor[]>(`${this.baseUrl}`);
  }
  GetAllByCity(city:string): Observable<Donor[]> {
    return this.http.get<Donor[]>(`${this.baseUrl}/${city}`);
  }
  getByIdDonor(donorId:number):Observable<Donor>{
    return this.http.get<Donor>(`${this.baseUrl}/${donorId}`);

  }
  createDonor(donorToAdd: AllDonor): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}`, donorToAdd);
  }

  deleteDonor(donorId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${donorId}`);
  }

  updateDonor(donorToUpdate: Donor): Observable<any> {
    return this.http.put(`${this.baseUrl}`, donorToUpdate);
  }
  deleteAllEntitiesDonors(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteAllEntities`);
  }
  getDonorsByExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/GetDonorsByExcel`,  { responseType: 'blob' });
  }
  
}
