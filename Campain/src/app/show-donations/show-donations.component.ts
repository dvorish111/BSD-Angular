import { Component, Input, OnInit } from '@angular/core';
import { Donate } from '../Classes/Donate';
import { Statuses } from '../Enums/Statuses';
import { DonationService } from '../Services/donation.service';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { Neighborhood } from '../Classes/Neighborhood';

@Component({
  selector: 'app-show-donations',
  templateUrl: './show-donations.component.html',
  styleUrls: ['./show-donations.component.css']
})
export class ShowDonationsComponent implements OnInit{
 
  Statuses= Statuses ;
@Input() 
donate!:Donate;
@Input() 
sumDonationsByDonated!:number;
neighborhood!:Neighborhood;
TotalRaised!:number;
constructor(private donationService:DonationService,private neighborhoodService:NeighborhoodService) {

}
ngOnInit(): void {
  this.donationService.getSumDonation().subscribe
  ({
    next: (sum: number) => {
      this.TotalRaised = sum;        
      console.log(this.TotalRaised);

    },
    error: (err) => {
      console.error(err);
    }
  });
}
getAllNeighborhoods(){
  this.neighborhoodService.getByIdNeighborhood(this.donate.idNeighborhood).subscribe
  ({
    next: (neighborhood:Neighborhood) => {
      this.neighborhood = neighborhood;
      console.log(this.neighborhood);

    },
    error: (err) => {
      console.error(err);
    }
  });
  
}




}
