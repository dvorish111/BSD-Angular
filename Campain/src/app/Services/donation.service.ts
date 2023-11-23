import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donation } from '../Classes/Donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  baseUrl = "https://localhost:7182/api/Donation";

  constructor(private http: HttpClient) { }

  getAllDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.baseUrl}`);
  }
  getByIdDonation(donationId:number):Observable<Donation>{
    return this.http.get<Donation>(`${this.baseUrl}/${donationId}`);

  }
  createDonation(donationToAdd: Donation): Observable<any> {
    return this.http.post(`${this.baseUrl}`, donationToAdd);
  }

  deleteDonation(donationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${donationId}`);
  }

  updateDonation( donationToUpdate: Donation): Observable<any> {
    return this.http.put(`${this.baseUrl}`, donationToUpdate);
  }
}
