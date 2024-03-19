import { Component } from '@angular/core';
import { AllDonate } from 'src/app/Classes/AllClasses/AllDonate';
import { AllDonor } from 'src/app/Classes/AllClasses/AllDonor';
import { Neighborhood } from 'src/app/Classes/Neighborhood';
import { Status } from 'src/app/Classes/Status';
import { Statuses } from 'src/app/Enums/Statuses';
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

  selectedNeighborhood!:number;
  neighborhoods!:Neighborhood[];
// statuses!:Status[]
// statuses: typeof Statuses = Statuses;
// options = Object.keys(this.statuses);
statuses = Object.getOwnPropertyNames(Statuses) as (keyof typeof Statuses)[]; 
  Statuses = this.statuses.slice(-3);
  
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


