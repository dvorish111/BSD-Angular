import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Campaign } from 'src/app/Classes/Campaign';
import { CampaignService } from 'src/app/Services/campaign.service';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.css']
})
export class CampaignManagementComponent  implements OnInit{
  constructor(private campainService: CampaignService, private snackBar: MatSnackBar) {
    this.updateCampaign() 
  }
  ngOnInit(): void {
    this.updateCampaign() 
   
  }

  dataLoaded: boolean = false; // משתנה שמציין האם הנתונים נטענו או לא
campaign!: Campaign;

updateCampaign() {
  this.campainService.getByIdCampaign(1).subscribe(
    (campaign) => {
      console.log(campaign)
      this.campaign = campaign;
      // this.campaign.name=campaign.name
      // this.campaign.goul=campaign.goul
      // this.campaign.startDate=campaign.startDate
      // this.campaign.endDate=campaign.endDate
      this.dataLoaded = true;
  
      console.log(campaign);
    },
    (error) => {
      console.error(error);
    }
  );
}

onSubmit()
 {
  
    // this.campaign = this.campaignForm.value;
    this.campaign.id = 1;
    this.campainService.updateCampaign(this.campaign).subscribe(
      (campaign) => {
        this.showMessageOK("!נא לרענן את הדף, הנתונים עודכנו בהצלחה")
        console.log("!!!!!");
        // this.statusFormCampgian = "";
        //  this.fullCampain=false;
        console.log(this.campaign);
      },
      (error) => {
        this.showMessageOK("העדכון לא הצליח נסה שנית")
        console.error(error);
      }
    );
  
  // console.log('Form submitted:', this.campaign);
  // Here you can implement logic to submit the form data to your backend
}



showMessageOK(messege: string) {
  const snackBarRef = this.snackBar.open(messege, 'Close', {
    duration: 5000,
    panelClass: ['snackbar']
  });
};


}