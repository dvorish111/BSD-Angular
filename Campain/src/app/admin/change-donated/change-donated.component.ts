import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stats } from '@igniteui/material-icons-extended';
import { AllDonate } from 'src/app/Classes/AllClasses/AllDonate';
import { AllDonor } from 'src/app/Classes/AllClasses/AllDonor';
import { Neighborhood } from 'src/app/Classes/Neighborhood';
import { Statuses } from 'src/app/Enums/Statuses';
import { DonateService } from 'src/app/Services/donate.service';
import { NeighborhoodService } from 'src/app/Services/neighborhood.service';

@Component({
  selector: 'app-change-donated',
  templateUrl: './change-donated.component.html',
  styleUrls: ['./change-donated.component.css']
})
export class ChangeDonatedComponent {
  selectedFile: File | null = null;
  fileMessage: string | undefined;
  newDonate:AllDonate={
    parentTaz:"", 
    name:"",
    numChildren:0,
    idStatus:0,
    street:"",
    needed:0, 
    numberBuilding:0,
    raised:0,
    idNeighborhood:0
   
  }
  // newDonate!:AllDonate;
  Status!:string;
  selectedNeighborhood!:number;
  neighborhoods!:Neighborhood[];
  statuses: typeof Statuses = Statuses;
  options = Object.keys(this.statuses);
  // constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  
  constructor(private neighborhoodService:NeighborhoodService,private donateService: DonateService,private snackBar: MatSnackBar) { 

  }
  
ngOnInit(){
  this.options = this.options.slice(this.options.length / 2);

  this.getAllNeighborhoods();

}
  getAllNeighborhoods() {
      this.neighborhoodService.getAllNeighborhoods().subscribe
    ({
      next: (neighborhood:Neighborhood[]) => {
        this.neighborhoods = neighborhood;
        console.log(this.neighborhoods);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  resetForm(form: NgForm) {
    this.onSubmitCreateFamily();
    form.reset(); // אפס את כל הערכים בטופס
  }
  onSubmitCreateFamily(){
    
    this.newDonate.idStatus=this.Status=='Married'?1:this.Status=='Divorced'?2:3;
    this.donateService.createDonate(this.newDonate).subscribe(
      {
        next:()=>{
        console.log("create Donate Successfully!!")
        // this.addFamilyFormrReset();
        this.snackBar.open('create Donate Successfully!!', 'Close', {
          duration: 3000, // optional: time in milliseconds
        });
       
      },
    
        error:(err)=>{
          console.error(err);
        }
      
      }
    )  }


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
    downloadAllDonatesCsv(){
      this.donateService.getDonatesByExcel().subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
}


