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
// TotalRaised!:number;
donationsByDonated!:Donation[];
donations!:Donation[];
showDonations!:Donation[];
flagFamily!:boolean;
date!:Date;
initialFamiliesCount: number = 5;
fullDonations!: Donation[];


constructor(private donationService:DonationService,private neighborhoodService:NeighborhoodService) {
this.date=new Date();

}
ngOnInit(): void {

  // this.donationService.getSumDonation().subscribe
  // ({
  //   next: (sum: number) => {
  //     this.TotalRaised = sum;        
  //     console.log(this.TotalRaised);

  //   },
  //   error: (err) => {
  //     console.error(err);
  //   }
  // });
}
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['donate'] && changes['donate'].currentValue) {
  this.donationService.getAllDonationsByDonated(this.donate.id).subscribe(
    {
      next:(donations:Donation[])=>{
        this.donationsByDonated=donations;
        this.ShowLoadedDonationsCount(donations);
       //this.showDonations= this.donationsByDonated;
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
      this.ShowLoadedDonationsCount(donations);
     // this.showDonations=this.donations;
      console.log(donations+"donations")
    },
    error:(err)=>{
      console.error(err);
    }
  }
 ) 
}


}



calculateTimeDifference(date: Date): string {
  const currentDate = new Date();
  const donationDate = new Date(date);
  const timeDifferenceMs = currentDate.getTime() - donationDate.getTime();

  // Calculate the difference in milliseconds, hours, days, months, and years
  const milliseconds = timeDifferenceMs;
  const seconds=Math.floor(milliseconds/(1000*60));
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30.44));
  const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365.25));

  // Determine the appropriate time difference unit to display
  let timeDifference = '';
  if (years > 0) {
    timeDifference = `${years} ${years === 1 ? 'year' : 'years'}`;
  } else if (months > 0) {
    timeDifference = `${months} ${months === 1 ? 'month' : 'months'}`;
  } else if (days > 0) {
    timeDifference = `${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (hours > 0) {
    timeDifference = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } 
   else {
    timeDifference=`${seconds} ${seconds==1? 'second' : 'seconds'}`;}
  


  return timeDifference;
}
showMoreDonations(): void {
  const currentDonationsCount = this.showDonations.length;
  const additionalDonations = this.fullDonations.slice(currentDonationsCount, currentDonationsCount + 5);
  this.showDonations = this.showDonations.concat(additionalDonations);
 //this.donates=this.tempdonates.slice(0,this.donates.length+10)
}
ShowLoadedDonationsCount(donates:Donation[]){
 this.fullDonations =donates;
 this.showDonations = donates.slice(0, this.initialFamiliesCount);

}
}