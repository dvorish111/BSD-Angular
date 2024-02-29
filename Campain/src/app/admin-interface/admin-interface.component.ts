import { Component, Input, OnInit } from '@angular/core';
import { DonateService } from '../Services/donate.service';
import { CampaignService } from '../Services/campaign.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Campaign } from '../Classes/Campaign';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonorService } from '../Services/donor.service';
import { DonationService } from '../Services/donation.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../Services/permission.service';
import { SignUp } from '../Classes/SignUp';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent  implements OnInit{
  campaignForm: FormGroup;
  selectedFile: File | null = null;
  fileMessage: string | undefined;
  campaign!: Campaign;
  deleteAllCampain: boolean = false;
  statusFormCampgian: string | undefined;
  ellowName!: string | null;
  detailesMenegr!:SignUp;
  showSignUpComponentC:boolean=false;
  showSignUpComponentU:boolean=false;
  showPasswordPrompt: boolean = false;//confirmPassword
  password: string = '';//confirmPassword
  ifPasswodOk:Boolean=false;//confirmPassword
  constructor(private premissionSer:PermissionService,private activatedRoute:ActivatedRoute,private donateService: DonateService, private campainService: CampaignService, private snackBar: MatSnackBar, private donorService: DonorService, private donationService: DonationService) {
    this.campaignForm = new FormGroup({
      name: new FormControl("",),
      startDate: new FormControl("",),
      duration: new FormControl("",),
      goul: new FormControl("",),
    })
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      var name=params.get('name');
      this.ellowName=name;
  });

  this.detailesMenegr= this.premissionSer.detailesMenegr;// להוריד סילוש ..שליפת פרטי המנהל מהסרוויס
  console.log("detailesMenegr:", this.detailesMenegr)
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
        this.statusFormCampgian = "apdate"
        this.campaign = campaign;
        this.campaignForm.setValue({
          name: this.campaign.name,
          goul: this.campaign.goul,
          startDate: this.campaign.startDate,
          duration: this.campaign.endDate,
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
        this.showMessageOK("!נא לרענן את הדף, הנתונים עודכנו בהצלחה")
        console.log("!!!!!");
        this.statusFormCampgian = "";
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
        this.statusFormCampgian = "create"
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





funcAftercConfirmPassword: number=0;
 
 // storedPassword: string = "this.detailesMenegr.password";

 showconfirmPassword( funcAftercConfirmPassword:number) {
  this.funcAftercConfirmPassword=funcAftercConfirmPassword;
    this.showPasswordPrompt = true;
  }
 ifPasswodAdminOk(password: string){
  this.premissionSer.confirmPassword(password).subscribe(
    (ifOk) => { 
      console.log("ifOk:" + ifOk)  
      if (ifOk ) {
        console.log("Authentication successful! Proceed with the change.");
        switch (this.funcAftercConfirmPassword){
        case(0):{this.ifcreateCampaign(); break;}
        case(1):{this.updateCampaign();  break;}
        case(2):{this.showSignUpComponentC = !this.showSignUpComponentC;  break;}
       }
      } else {
        console.log("Authentication failed! Incorrect password.");
        this.showMessageOK("סיסמא שגויה - אין הרשאת שינוי");
      }
      return ifOk;
    },
    (error) => {
      return false;
    }
    
  );return false;
 }
  
  authenticate() {
   this.ifPasswodOk =this.ifPasswodAdminOk(this.password) 
    this.showPasswordPrompt = false;
    this.password = '';
  }
  

}
