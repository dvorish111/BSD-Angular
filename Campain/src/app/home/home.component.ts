import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../Services/campaign.service';
import { Campaign } from '../Classes/Campaign';
import { DonationService } from '../Services/donation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  TotalRaised!:number;
  campaign!: Campaign;
  campaignGoul!: number;

  constructor(public myRouter: Router, private campaignService: CampaignService,private donationService:DonationService) {

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


    this.donationService.GetSumDonation().subscribe({
      next: (sum: number) => {
        this.TotalRaised = sum;        
        console.log(this.TotalRaised);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
