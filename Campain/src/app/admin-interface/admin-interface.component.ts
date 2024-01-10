import { Component } from '@angular/core';
import { DonateService } from '../Services/donate.service';
import { CampaignService } from '../Services/campaign.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Campaign } from '../Classes/Campaign';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonorService } from '../Services/donor.service';
import { DonationService } from '../Services/donation.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  campaignForm: FormGroup;
  selectedFile: File | null = null;
  fileMessage: string | undefined;
  campaign!: Campaign;
  deleteAllCampain: boolean = false;
  status: string | undefined;
  constructor(private donateService: DonateService, private campainService: CampaignService, private snackBar: MatSnackBar, private donorService: DonorService, private donationService: DonationService) {
    this.campaignForm = new FormGroup({
      name: new FormControl("",),
      startDate: new FormControl("",),
      duration: new FormControl("",),
      goul: new FormControl("",),
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.ifCSV();
  }

  ifCSV() {
    const validExtensions = ['.csv'];
    if (this.selectedFile != null) {
      const file = this.selectedFile;
      const ext = file.name.split('.').pop();

      if (validExtensions.indexOf('.' + ext) !== -1) {
        this.fileMessage = ("קובץ תקין");
      }
      else {
        this.fileMessage = ("קובץ לא תקין העלה שוב");
        this.selectedFile = null
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
          this.showMessageOK("למערכת נוספו " + this.selectedFile?.size + "נתמכים ")
          console.log(response);
        },
        (error) => {
          this.showMessageOK("ארעה שגיאה בהעלאת הקובץ, נסה שנית")
          console.error(error);
        }
      );
    }
  }
  downloadDonatesCSV()//הורדת קובץ נתרמים
   {
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


  downloadDonationsCSV()//הורדת קובץ תרומות
   {
    this.donationService.getDonationsByExcel().subscribe(
      (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'רשימת תרומות.csv';
        link.click();
        console.log(blob);
      },
      (error) => {
        console.error(error);
      }
    );

  }

  //delete & create level 4
  updateCampaign() {
    this.campainService.getByIdCampaign(1).subscribe(
      (campaign) => {
        this.status = "apdate"
        this.campaign = campaign;
        this.campaignForm.setValue({
          name: this.campaign.name,
          goul: this.campaign.goul,
          startDate: this.campaign.startDate,
          duration: this.campaign.duration,
        });
        // this.campaignForm=campaign
        console.log(campaign);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmitUpdateCampaignForm() {
    this.campaign = this.campaignForm.value;
    this.campaign.id = 1;
    this.campainService.updateCampaign(this.campaign).subscribe(
      (campaign) => {
        this.showMessageOK("!הנתונים עודכנו בהצלחה")
        console.log("!!!!!");
        this.status = "";
        //  this.fullCampain=false;
        console.log(this.campaign);
      },
      (error) => {
        this.showMessageOK("העדכון לא הצליח נסה שנית")
        console.error(error);
      }
    );
  }

  //delete & create level 1
  ifcreateCampaign() {
    const ifDelete = this.showMessage("באפשרותך ליצא לקובץ אקסל את הנתונים... \n מחיקה זו תגרום לכל הנתונים שבקמפיין הנוכחי להמחק  \n ?האם אתה בטוח שברצונך למחוק את הקמפיין הנוכחי וליצור חדש");
    console.log(ifDelete);
  }
  //delete & create level 3
  deleteCampaign() {
   
    
    this.donationService.deleteAllEntitiesDonations().subscribe(
      (campaign) => {
        console.log("התרומות נמחקו בהצלחה");
        this.donorService.deleteAllEntitiesDonors().subscribe(
          (campaign) => {
            console.log("התורמים נמחקו בהצלחה");
          },
          (error) => {
            console.error(error);
            this.deleteAllCampain = false;
          }
        );
        this.donateService.deleteAllEntitiesDonates().subscribe(
          (campaign) => {
            console.log("הנתרמים נמחקו בהצלחה");
          },
          (error) => {
            console.error(error);
            this.deleteAllCampain = false;
          }
        );
      },
      (error) => {
        console.error(error);
        this.deleteAllCampain = false;
      }
    );
    this.campainService.deleteAllEntitiesCampaign().subscribe(
      (campaign) => {
       
        console.log("הקמפיין נמחק בהצלחה");
        this.status = "create"
        this.updateCampaign()
      },
      (error) => {
        this.showMessageOK("העדכון לא הצליח נסה שנית")
         this.deleteAllCampain = false;
        console.error(error);
      }
    );
if  ( this.deleteAllCampain = false){
 this.showMessageOK("הקמפיין נמחק בהצלחה")
}
  }

  onSubmitCrateCampaignForm() { }


  //delete & create level 2
  showMessage(messege: string) {
    const snackBarRef = this.snackBar.open(messege, 'מחיקת כל הקמפיין', {
      duration: 5000,
      panelClass: ['snackbar']
    });
    snackBarRef.onAction().subscribe((action: void) => {
      this.deleteCampaign()
    })
  }

  showMessageOK(messege: string) {
    const snackBarRef = this.snackBar.open(messege, 'Close', {
      duration: 5000,
      panelClass: ['snackbar']
    });
  };



  

}
