import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  baseUrl = "https://localhost:7182/api/Donation";

  constructor(private http: HttpClient) { }

  getAllDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.baseUrl}/getAll`);
  }

  createDonation(donationToAdd: Donation): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, donationToAdd);
  }

  deleteDonation(donationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${donationId}`);
  }

  updateDonation( donationToUpdate: Donation): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, donationToUpdate);
  }
}
