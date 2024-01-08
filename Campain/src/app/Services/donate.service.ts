import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Donate } from '../Classes/Donate';
import { AllDonate } from '../Classes/AllClasses/AllDonate';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  baseUrl = "https://localhost:7182/api/Donate"
  constructor(private http: HttpClient) { }

  
  getAllDonates(): Observable<Donate[]> {
    return this.http.get<Donate[]>(`${this.baseUrl}`);
  }
  getAllStatus(statusId:number): Observable<Donate[]> {
    return this.http.get<Donate[]>(`${this.baseUrl}/Status/${statusId}`);
  }
   getAllByNeeded(neededId:number):Observable<Donate[]>{
    return this.http.get<Donate[]>(`${this.baseUrl}/Needed/${neededId}`);
   }
  getAllByNumOfChildren(maxNumOfChildren:number):Observable<Donate[]>{
    return this.http.get<Donate[]>(`${this.baseUrl}/NumOfChildren/${maxNumOfChildren}`)
  }
  getByTazDonate(donateTaz:number):Observable<Donate>{
    return this.http.get<Donate>(`${this.baseUrl}/TazDonate/${donateTaz}`);
  }
  createDonate(donateToAdd: AllDonate): Observable<any> {
    return this.http.post(`${this.baseUrl}`, donateToAdd);
  }

  deleteDonate(donateId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${donateId}`);
  }

  updateDonate(donateToUpdate: Donate): Observable<any> {
    return this.http.put(`${this.baseUrl}`, donateToUpdate);
  }

  getNumFamily():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/NumFamily`);
  }

  getNumChildren():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/NumChildren`);
  }

craeteDonatesByExcel(ExcelToAdd:FormData ): Observable<any> {
  return this.http.post(`${this.baseUrl}/CraeteDonatesByExcel`, ExcelToAdd);
}
getDonatesByExcel(): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/GetDonatesByExcel`,  { responseType: 'blob' });
}

deleteAllEntitiesDonates(): Observable<any> {
  return this.http.delete(`${this.baseUrl}/DeleteAllEntities`);
}
}
