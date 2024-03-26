import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCampaignApprovalComponent } from '../new-campaign-approval/new-campaign-approval.component';
import { DonationService } from 'src/app/Services/donation.service';
import { DonateService } from 'src/app/Services/donate.service';
import { DonorService } from 'src/app/Services/donor.service';
import { CampaignService } from 'src/app/Services/campaign.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Campaign } from 'src/app/Classes/Campaign';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent {
  dataLoaded: boolean = false; // משתנה שמציין האם הנתונים נטענו או לא
  campaign!: Campaign;
  deleteAllCampain: boolean = false;
  createCampainOk:boolean=false;
  constructor( private snackBar: MatSnackBar,private campainService:CampaignService,private dialog: MatDialog, private donorService:DonorService,private donationService:DonationService, private donateService: DonateService) {
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(NewCampaignApprovalComponent, {
      width: '600px',
      data: { message: 'Are you sure you want to click?' }
    });

    dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the action when user confirms
        console.log('User confirmed the action');
      } else {
        // Perform any action when user cancels
        console.log('User canceled the action');
      }
    });
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
      // this.statusFormCampgian = "create"
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

//delete & create level 4


updateCampaign() {
  this.campainService.getByIdCampaign(1).subscribe(
    (campaign) => {
      console.log(campaign)
      this.campaign = campaign;
   
      this.dataLoaded = true;
      this.createCampainOk=true;
  
      console.log(campaign);
    },
    (error) => {
      console.error(error);
    }
  );
}


onSubmit()
 {
  
    this.campaign.id = 1;
    this.campainService.updateCampaign(this.campaign).subscribe(
      (campaign) => {
        this.showMessageOK("!נא לרענן את הדף, הנתונים עודכנו בהצלחה")
        console.log("!!!!!");
     
        console.log(this.campaign);
      },
      (error) => {
        this.showMessageOK("העדכון לא הצליח נסה שנית")
        console.error(error);
      }
    );
  

}


showMessageOK(messege: string) {
  const snackBarRef = this.snackBar.open(messege, 'Close', {
    duration: 5000,
    panelClass: ['snackbar']
  });
};
}
