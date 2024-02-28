import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Donation } from '../Classes/Donation';
import { AllDonation } from '../Classes/AllClasses/AllDonation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  baseUrl = "https://localhost:7182/api/Donation";

  private donationAmountSubject= new BehaviorSubject<number>(0);
  donationAmount$ = this.donationAmountSubject.asObservable();
 
  constructor(private http: HttpClient) { }

  getAllDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.baseUrl}`);
  }
  getByIdDonation(donationId:number):Observable<Donation>{
    return this.http.get<Donation>(`${this.baseUrl}/${donationId}`);

  }
  createDonation(donationToAdd: AllDonation): Observable<any> {
    return this.http.post(`${this.baseUrl}`, donationToAdd).pipe(
      tap((next) => {
        this.getSumDonation().subscribe
        ({
          next: (amount) => {      
            this.donationAmountSubject.next(amount);
          },
          error: (err) => {  }})  
     })
     );
  }

  deleteDonation(donationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${donationId}`);
  }

  updateDonation( donationToUpdate: Donation): Observable<any> {
    return this.http.put(`${this.baseUrl}`, donationToUpdate);
  }

  getSumDonation(): Observable<number> {  
    return this.http.get<number>(`${this.baseUrl}/SumDonation`).pipe(
      tap((amount) => {
        this.donationAmountSubject.next(amount);
      })
    )
  }
  getSumDonationsByDonated(IdDonated:number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/GetSumDonationsByDonated/${IdDonated}`);
  }
  getAllSumDonationsByDonated(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/GetAllSumDonationsByDonated`);
  }
  getAllDonationsByDonated(IdDonated:number):Observable<Donation[]>{
    return this.http.get<Donation[]>(`${this.baseUrl}/GetAllDonationsByDonated/${IdDonated}`);
  }
  deleteAllEntitiesDonations(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteAllEntities`);
  }
  getDonationsByExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/GetDonationsByExcel`,  { responseType: 'blob' });
  }

  
  updateDonationAmount(amount: number) {
    this.donationAmountSubject.next(amount);
  }
 
}
