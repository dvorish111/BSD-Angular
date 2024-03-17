import { Component } from '@angular/core';
import { AllDonate } from 'src/app/Classes/AllClasses/AllDonate';
import { AllDonor } from 'src/app/Classes/AllClasses/AllDonor';
import { Neighborhood } from 'src/app/Classes/Neighborhood';
import { NeighborhoodService } from 'src/app/Services/neighborhood.service';

@Component({
  selector: 'app-adding-donors',
  templateUrl: './adding-donors.component.html',
  styleUrls: ['./adding-donors.component.css']
})
export class AddingDonorsComponent {

  newDonor: AllDonor={
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    city:"",
    street:""
  }; 
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

  selectedNeighborhood!:number;
  neighborhoods!:Neighborhood[];

  // constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  
  constructor(private neighborhoodService:NeighborhoodService) { }
  
ngOnInit(){
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

  keepData(){
    console.log("chekkk")
  }
}
