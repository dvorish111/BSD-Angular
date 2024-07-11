import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Image } from '../Classes/Image';
import { ShowImage } from '../Classes/ShowImage';

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
  // saveImage(formData:FormData,num:number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${num}`,formData);
  // }
  // getByIdImage(imageId:number):Observable<Blob>{
  //   return this.http.get<Blob>(`${this.baseUrl}/${imageId}`);

  // }
  // getByIdImage(imageId:number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${imageId}`, { responseType: 'blob' });
    
  // }

  // getByIdImageData(imageId:number): Observable<Image> {
  //   return this.http.get<Image>(`${this.baseUrl}/ImageId/${imageId}`);

  // }
  getByIdImage(imageId: number) {
    return this.http.get(`${this.baseUrl}/${imageId}`, { responseType: 'blob' });
  }

  getByIdImageData(imageId: number) {
    return this.http.get(`${this.baseUrl}/ImageId/${imageId}/metadata`);
  }

  saveImage(formData:FormData,num:number): Observable<any> {
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/${num}`,formData);
  }
  //  getImageById(imageId: number): Observable<Blob> {
  //   return this.http.get<ShowImage>(`${this.baseUrl}/ImageId/${imageId}`).pipe(
  //     map(imageDTO => {
  //       console.log(imageDTO.data)

  //       if (imageDTO.data && imageDTO.contentType) {
  //         return this.base64ToBlob(imageDTO.data, imageDTO.contentType);
  //       }
  //       throw new Error('Image data or content type is missing');
  //     })
  //   );
  // }

  getImageById(imageId: number): Observable<Image> {
    return this.http.get<Image>(`${this.baseUrl}/ImageId/${imageId}`);
  }
  // private base64ToBlob(base64: string, contentType: string): Blob {
  //   const byteCharacters = atob(base64);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   return new Blob([byteArray], { type: contentType });
  // }
}

