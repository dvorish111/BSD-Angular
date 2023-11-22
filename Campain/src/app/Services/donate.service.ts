import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Donate } from '../Classes/Donate';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  baseUrl = "https://localhost:7182/api/Donate"
  constructor(private http: HttpClient) { }

  
  getAllDonates(): Observable<Donate[]> {
    return this.http.get<Donate[]>(`${this.baseUrl}/Gat`);
  }

  createDonate(donateToAdd: Donate): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, donateToAdd);
  }

  deleteDonate(donateId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${donateId}`);
  }

  updateDonate(donateToUpdate: Donate): Observable<any> {
    return this.http.put(`${this.baseUrl}/Put`, donateToUpdate);
  }
}
