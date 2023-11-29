import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../Services/campaign.service';
import { Campaign } from '../Classes/campaign';
import { FamiliesComponent } from '../families/families.component';
import { DonationService } from '../Services/donation.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
  export class NavBarComponent implements OnInit {
    campaign!: Campaign;
    campaignGoul!:number;
    TotalRaised!:number;
    TotalRaisedPercentages!:number;
  campaignLoaded!: boolean;
  sumLoaded!: boolean;

    constructor(private campaignService: CampaignService,private donationService:DonationService) {
      
      
     }
  
     ngOnInit(): void {
      const campaignId = 1;
      this.campaignLoaded = false;
      this.sumLoaded = false;
      // Set up flags to track the completion of server calls
      
      
      // Make the first server call
      this.campaignService.getByIdCampaign(campaignId).subscribe({
        next: (campaign: Campaign) => {
          this.campaign = campaign;
          this.campaignGoul = this.campaign.goul;
          console.log(this.campaignGoul);
          
          // Set the flag to true when the first server call is complete
          this.campaignLoaded = true;
          
          // Call the callback function
          this.checkBothLoaded();
        },
        error: (err) => {
          console.error(err);
        }
      });
      
      // Make the second server call
      this.donationService.getSumDonation().subscribe({
        next: (sum: number) => {
          this.TotalRaised = sum;
          console.log(this.TotalRaised);
          
          // Set the flag to true when the second server call is complete
          this.sumLoaded = true;
          
          // Call the callback function
          this.checkBothLoaded();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    
    checkBothLoaded() {
      // Check if both server calls have finished
      if (this.campaignLoaded && this.sumLoaded) {
        // Call the calculation function
        this.TotalRaisedPercentagesCalculation();
      }
    }
    
    TotalRaisedPercentagesCalculation() {
      this.TotalRaisedPercentages = (this.TotalRaised / this.campaignGoul) * 100;
    }
  }    