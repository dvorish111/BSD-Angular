import { Component } from '@angular/core';
import { DonateService } from '../Services/donate.service';
import { CampaignService } from '../Services/campaign.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  campaignForm: FormGroup;
  selectedFile: File | null = null;
  fileMessage: string | undefined;
  constructor(private donateService: DonateService,private campainService:CampaignService) {
    this.campaignForm = new FormGroup({
      name: new FormControl("", ),
      startDate: new FormControl("",),
      duration: new FormControl("", ),
      goul: new FormControl("", ),
    })}
  
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
  downloadDonatesCSV(){
    this.donateService.getDonatesByExcel().subscribe(
     (blob: Blob) => { 
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'רשימת נתרמים.csv';
      link.click(); 
      console.log(blob);
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  updateCampaign(){
    this.campainService.getByIdCampaign(1).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
