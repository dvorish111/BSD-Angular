import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Neighborhood } from '../Classes/Neighborhood';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {
  baseUrl = "https://localhost:7182/api/Neighborhood";

  constructor(private http: HttpClient) { }

  getAllNeighborhoods(): Observable<Neighborhood[]> {
    return this.http.get<Neighborhood[]>(`${this.baseUrl}`);
  }
  getByIdNeighborhood(neighborhoodId:number):Observable<Neighborhood>{
    return this.http.get<Neighborhood>(`${this.baseUrl}/${neighborhoodId}`);

  }
  createNeighborhood(neighborhoodToAdd: Neighborhood): Observable<any> {
    return this.http.post(`${this.baseUrl}`, neighborhoodToAdd);
  }

  deleteNeighborhood(neighborhoodId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${neighborhoodId}`);
  }

  updateNeighborhood(neighborhoodToUpdate: Neighborhood): Observable<any> {
    return this.http.put(`${this.baseUrl}`, neighborhoodToUpdate);
  }
}
