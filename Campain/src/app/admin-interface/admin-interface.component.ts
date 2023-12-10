import { Component } from '@angular/core';
import { DonateService } from '../Services/donate.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  selectedFile: File | null = null;
  fileMessage: string | undefined;
  constructor(private donateService: DonateService) { }

  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0] as File;
    this.ifCSV();
  }
  
  ifCSV(){
    const validExtensions = ['.csv'];
    if (this.selectedFile!=null)
      {const file = this.selectedFile;
      const ext = file.name.split('.').pop();
      
      if (validExtensions.indexOf('.' + ext) !== -1) 
      {
        this.fileMessage=("קובץ תקין");
      }
      else { this.fileMessage=("קובץ לא תקין העלה שוב");
      this.selectedFile=null
    }

    }
   }
   


  uploadFile(event: Event) {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.donateService.craeteDonatesByExcel(formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }


}
