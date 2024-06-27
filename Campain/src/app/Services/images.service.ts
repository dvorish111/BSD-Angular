import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../Classes/Image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  // baseUrl = "https://campaignramot.org/api/Image"
  baseUrl = "https://localhost:7182/api/Image"

  constructor(private http: HttpClient) { }
  // saveImage(image:Image): Observable<any> {
  //   return this.http.post(`${this.baseUrl}`,image);
  // }
  saveImage(formData:FormData,num:number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${num}`,formData);
  }
  // getByIdImage(imageId:number):Observable<Blob>{
  //   return this.http.get<Blob>(`${this.baseUrl}/${imageId}`);

  // }
  getByIdImage(imageId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${imageId}`, { responseType: 'blob' });
  }

  getByIdImageData(imageId:number): Observable<Image> {
    return this.http.get<Image>(`${this.baseUrl}/ImageId/${imageId}`);
  }
  

}
