import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Donate } from '../Classes/Donate';
import { Statuses } from '../Enums/Statuses';
import { DonationService } from '../Services/donation.service';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { Neighborhood } from '../Classes/Neighborhood';
import { Donation } from '../Classes/Donation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-donations',
  templateUrl: './show-donations.component.html',
  styleUrls: ['./show-donations.component.css']
})
export class ShowDonationsComponent implements OnInit,OnChanges{
 
  Statuses= Statuses ;
@Input() 
donate!:Donate;
@Input() 
sumDonationsByDonated!:number;
neighborhood!:Neighborhood;
TotalRaised!:number;
donationsByDonated!:Donation[];
donations!:Donation[];
showDonations!:Donation[];
flagFamily!:boolean;
date!:Date;

constructor(private donationService:DonationService,private neighborhoodService:NeighborhoodService) {
this.date=new Date();

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
  });}
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['donate'] && changes['donate'].currentValue) {
  this.donationService.getAllDonationsByDonated(this.donate.id).subscribe(
    {
      next:(donation:Donation[])=>{
        this.donationsByDonated=donation;
       this.showDonations= this.donationsByDonated;
       this.flagFamily=true;
        console.log(this.donationsByDonated+"donationsByDonated")
      },
      error:(err)=>{
        console.error(err);
      }
    }
  )}
  else{
 this.donationService.getAllDonations().subscribe(
  {
    next:(donations:Donation[])=>{
      this.donations=donations;
      this.showDonations=this.donations;
      console.log(donations+"donations")
    },
    error:(err)=>{
      console.error(err);
    }
  }
 ) 
}


}

calculateDaysSinceDonation(date: Date): number {
  const donationDate = new Date(date);
  const currentDate = new Date();
  const timeDifferenceMs = currentDate.getTime() - donationDate.getTime();
console.log(currentDate+"currentDate")
console.log("date"+date)
  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  return daysDifference;
}
}