import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../Classes/campaign';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  baseUrl = "https://localhost:7182/api/Campaign"
  constructor(private http: HttpClient) { }

  
  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}/Gat`);
  }
  getByIdCampaign(campaignId:number):Observable<Campaign>{
    return this.http.get<Campaign>(`${this.baseUrl}/Gat/${campaignId}`);

  }

  createCampaign(campaignToAdd: Campaign): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, campaignToAdd);
  }

  deleteCampaign(campaignId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${campaignId}`);
  }

  updateCampaign(campaignId: number, campaignToUpdate: Campaign): Observable<any> {
    return this.http.put(`${this.baseUrl}/Put/${campaignId}`, campaignToUpdate);
  }
  // getAllCampaign(): Observable<campaign[]> {
  //   return this.http.get<campaign[]>(this.baseUrl+"Gat");
  // }
  // CreateCampaign(campaignToAdd: campaign[]): Observable<any> {
  //   return this.http.post(this.baseUrl+"post", campaignToAdd);
  // }
  // DeleteCampaign(campaignId: Campaign): Observable<any> {
  //   return this.http.delete(this.baseUrl+"Delete", campaignId)
  // }
  // UpdateCampaign(campaignId: Campaign):Observable<any>{
  //   return this.http.put(this.baseUrl+"Put",campaignId)
  // }
}
