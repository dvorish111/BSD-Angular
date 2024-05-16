import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Donate } from '../Classes/Donate';
import { Statuses } from '../Enums/Statuses';
import { DonationService } from '../Services/donation.service';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { Neighborhood } from '../Classes/Neighborhood';
import { Donation } from '../Classes/Donation';
import { DatePipe } from '@angular/common';
import { DonorService } from '../Services/donor.service';
import { CampaignService } from '../Services/campaign.service';
import { Campaign } from '../Classes/Campaign';

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
totalRaised!:number;
donationsByDonated!:Donation[];
donations!:Donation[];
showDonations!:Donation[];
flagFamily!:boolean;
date!:Date;
initialFamiliesCount: number = 5;
fullDonations!: Donation[];
campaign!:Campaign;
campaignGoul!:number;

formattedTime: string = '';
  timer: any;
  endDate!: Date;
  startDate!: Date; // התאריך שבו הקמפיין מתחיל
  timeLeftInMilliseconds!:number;
  timeOverInMilliseconds!:number;
  timeInMilliseconds!:number;
  valuetimeInMilliseconds!:number;

constructor(private donationService:DonationService,private neighborhoodService:NeighborhoodService,private donorService:DonorService,private campaignService:CampaignService) {
this.date=new Date();
}
ngOnInit(): void {
  const campaignId = 1;
  this.campaignService.getByIdCampaign(campaignId).subscribe({
    next: (campaign: Campaign) => {
      this.campaign = campaign;
      this.campaignGoul = this.campaign.goul;
      this.startDate = this.campaign.startDate;
      this.endDate = this.campaign.endDate;
      console.log(this.startDate);
      // this.counters[0].target = campaign.goul
      this.startTimer();

    },
    error: (err) => {
      console.error(err);
    }
  });
  this.donationService.getSumDonation().subscribe
  ({
    next: (sum: number) => {
      this.totalRaised = sum;        
      console.log(this.totalRaised);

    },
    error: (err) => {
      console.error(err);
    }
  });

  
}
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['donate'] && changes['donate'].currentValue) {
  this.donationService.getAllDonationsByDonated(this.donate.id).subscribe(
    {
      next:(donations:Donation[])=>{
        
        this.donationsByDonated=this.reverseArray(donations);
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
      this.donations=this.reverseArray(donations);
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




// -timer---



delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// async startCounting(): Promise<void> {
//   await Promise.all(this.startInterval(1));
// }

// async startInterval(counter: any): Promise<void> {
//   const increment = counter.target / 1000;
//   while (counter.current < counter.target) {
//     await this.delay(1); 
//     counter.current += increment;
//   }
//   this.startTimer();
// }



startTimer(): void {
  console.log("campaign:"+this.campaign)

  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  const updateTimer = () => {
    const now = new Date().getTime();
    this.timeLeftInMilliseconds = endDate.getTime() - now;
    this.timeOverInMilliseconds=endDate.getTime()-startDate.getTime()- this.timeLeftInMilliseconds ;
    this.timeInMilliseconds=endDate.getTime()-startDate.getTime();
    this.valuetimeInMilliseconds=this.timeOverInMilliseconds/this.timeInMilliseconds*100;
    if (this.timeLeftInMilliseconds <= 0) {
      this.formattedTime = '00:00:00:00';
    }
     else {
      const days = Math.floor(this.timeLeftInMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor((this.timeLeftInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((this.timeLeftInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((this.timeLeftInMilliseconds % (1000 * 60)) / 1000);
      this.formattedTime = `${this.padNumber(days)} : ${this.padNumber(hours)} : ${this.padNumber(minutes)} : ${this.padNumber(seconds)}`;
      this.timer = setTimeout(updateTimer, 1000);
    }
  };

  updateTimer();
}

padNumber(number: number): string {
  return number < 10 ? `0${number}` : `${number}`;
}


ngOnDestroy(): void {
  clearTimeout(this.timer);
}

maxHeight: string | undefined;
 reverseArray(arr: any[]): any[] {
  return arr.reverse();
}

}