import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllDonate } from 'src/app/Classes/AllClasses/AllDonate';
import { AllDonor } from 'src/app/Classes/AllClasses/AllDonor';
import { Neighborhood } from 'src/app/Classes/Neighborhood';
import { DonateService } from 'src/app/Services/donate.service';
import { NeighborhoodService } from 'src/app/Services/neighborhood.service';

@Component({
  selector: 'app-change-donated',
  templateUrl: './change-donated.component.html',
  styleUrls: ['./change-donated.component.css']
})
export class ChangeDonatedComponent {
  // newDonor: AllDonor={
  //   firstName:"",
  //   lastName:"",
  //   email:"",
  //   phone:"",
  //   city:"",
  //   street:""
  // }; 
  // newDonate:AllDonate={
  //   parentTaz:"", 
  //   name:"",
  //   numChildren:0,
  //   idStatus:0,
  //   street:"",
  //   needed:0, 
  //   numberBuilding:0,
  //   raised:0,
  //   idNeighborhood:0
   
  // }
  newDonate!:AllDonate;

  selectedNeighborhood!:number;
  neighborhoods!:Neighborhood[];
  // statuses: typeof Statuses = Statuses;
  // options = Object.keys(this.statuses);
  // constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  
  constructor(private neighborhoodService:NeighborhoodService,private donateService: DonateService,private snackBar: MatSnackBar) { 

  }
  
ngOnInit(){
  // this.options = this.options.slice(this.options.length / 2);

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

  onSubmitCreateFamily(){
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
}


