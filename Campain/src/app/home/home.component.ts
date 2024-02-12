import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../Services/campaign.service';
import { DonationService } from '../Services/donation.service';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { Campaign } from '../Classes/Campaign';
import { Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,  OnDestroy{
  progress: number = 0;
  TotalRaised!:number;
  campaign!: Campaign;
  campaignGoul!: number;
  numChildren!:number;
  numFamily!:number;
  timerSubscription!: Subscription ;
 
  constructor(public myRouter: Router, private campaignService: CampaignService,private donationService:DonationService,private donateService:DonateService) {
  }

  ngOnInit(): void {
    const campaignId = 1;
    this.campaignService.getByIdCampaign(campaignId).subscribe({
      next: (campaign: Campaign) => {
        this.campaign = campaign;
        this.campaignGoul = this.campaign.goul;
        console.log(this.campaignGoul);

      },
      error: (err) => {
        console.error(err);
      }
    });


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

    this.donateService.getNumChildren().subscribe
    ({
      next: (numChildren:number) => {       
        this.numChildren =numChildren ;        
        console.log(this.numChildren);
      },
      error: (err) => {
        console.error(err);
      }
    });


    this.donateService.getNumFamily().subscribe
    ({
      next: (numFamily:number) => {       
        this.numFamily =numFamily ;        
        console.log(this.numFamily);
      },
      error: (err) => {
        console.error(err);
      }
    });


    const targetValue = 100; // ערך היעד
    const animationDuration = 5000; // משך זמן האנימציה במילישניות
    const steps = 100; // מספר השלבים באנימציה
  
    const stepSize = targetValue /steps;
    const intervalTime = animationDuration /steps;
  
    const timer = interval(intervalTime);
    this.timerSubscription = timer.subscribe(() => {
      if (this.progress < targetValue) {
        this.progress += stepSize;
      } else {
        this.timerSubscription.unsubscribe(); // להפסיק את האינטרוול
      }
    });
  
}

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
 
}


