import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from 'src/app/Services/images.service';
import { Image } from 'src/app/Classes/Image';

@Component({
  selector: 'app-design-options',
  templateUrl: './design-options.component.html',
  styleUrls: ['./design-options.component.css']
})
export class DesignOptionsComponent {
 
    selectedFile!: File ;
   
    flagImageMessage: boolean = false;
    imageMessage: string = '';
    image :Image={
      contentType:"",fileName:"",fileSize:0,id:0
    };
    flagImageMessege!:boolean;
    constructor(private http: HttpClient,private imagesService:ImagesService) { }
//     onFileSelected(event: any) {
//       this.selectedFile = event.target.files[0];

//     const reader = new FileReader();
//     this.image.contentType=this.selectedFile.type
//     this.image.fileName=this.selectedFile.name
//     this.image.fileSize=this.selectedFile.size
//     this.image.id=1
//     reader.onload = (e) => {
//       const arrayBuffer = reader.result as ArrayBuffer;
//       const fileBytes = new Uint8Array(arrayBuffer);
//       const fileNumbers = Array.from(fileBytes);
  
//       // השימוש במערך של מספרים כדי לשמור את התמונה
//       this.image.fileData = fileNumbers;
//      this.uploadImage(fileBytes)}
//      reader.readAsArrayBuffer(this.selectedFile);}

//      uploadImage(fileBytes: Uint8Array) {
//       const fileNumbers: number[] = [];
//   for (let i = 0; i < fileBytes.length; i++) {
//     fileNumbers.push(fileBytes[i]);
//   }
  
//   // השימוש במערך של מספרים כדי לשמור את התמונה
//   this.image.fileData = fileNumbers
  
//       this.imagesService.saveImage( this.image).subscribe(
//         (response) => {
//           console.log(response); // Handle success
//           // Display uploaded image in your UI
//         },
//         (error) => {
//           console.error('Upload failed:', error); // Handle error
//         }
//       );
//     }



    
//     onFileChanged(event: any) {
//       this.selectedFile = event.target.files[0];
//     // }
  
//     // onFileSelected(event: any) {
//       event.preventDefault();
//       if (this.selectedFile) {
//        this.image.contentType=this.selectedFile.type
//        this.image.fileName=this.selectedFile.name
//        this.image.fileSize=this.selectedFile.size
//        this.image.id=2
//         //formData.append('image', this.selectedFile);
//         this.imagesService.saveImage( this.image).subscribe(
//           (response) => {
//             console.log(response); // Handle success
//             // Display uploaded image in your UI
//           },
//           (error) => {
//             console.error('Upload failed:', error); // Handle error
//           }
//         );
//       }
//     }
// }

// uploadImage(file: File) {
//   const formData = new FormData();
//   formData.append('imageFile', file);
//   this.imagesService.saveImage( formData).subscribe(
//               (response) => {
//                 console.log(response); // Handle success
//                 // Display uploaded image in your UI
//               },
//               (error) => {
//                 console.error('Upload failed:', error); // Handle error
//               }
//             );
// }

onFileChanged(event: any,num:number) {
  this.selectedFile = event.target.files[0];
  if (this.selectedFile&&this.selectedFile.size<200 * 1024) {
    this.flagImageMessage = false;
    const formData = new FormData();
   
    formData.append('file', this.selectedFile);

    this.imagesService.saveImage( formData,num).subscribe(
                    (response) => {
                      console.log(response); // Handle success
                      // Display uploaded image in your UI
                    },
                    (error) => {
                      console.error('Upload failed:', error); // Handle error
                    }
                  );
      }
      else{
        this.flagImageMessage = true;
        if (!this.selectedFile) {
          this.imageMessage = 'לא נבחר קובץ';
        } else {
          this.imageMessage = 'הקובץ גדול מדי. אנא בחר קובץ קטן מ-200KB';
        }
      }
}
}