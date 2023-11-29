import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../Services/campaign.service';
import { Campaign } from '../Classes/campaign';
import { FamiliesComponent } from '../families/families.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
  export class NavBarComponent implements OnInit {
    campaign!: Campaign;
    campaignGoul!:number;

    constructor(private campaignService: CampaignService) {
      
     }
  
    ngOnInit(): void {
    

      const campaignId = 1; 
      this.campaignService.getByIdCampaign(campaignId).subscribe({
        next: (campaign: Campaign) => {
          this.campaign = campaign;
        
          this.campaignGoul=this.campaign.goul;
          console.log(this.campaignGoul); 
        
        },
        error: (err) => {
          console.error(err); 
        }
     } );


    }

  }
