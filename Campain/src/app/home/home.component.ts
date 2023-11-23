import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../Services/campaign.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public myRouter: Router, public CSer:CampaignService) {
    
  }

delete(){
  this.CSer.deleteCampaign(5).subscribe({
    next: (res) =>{ alert(res)},
    error: (err) => {
      console.log(' error: ' + err);
    }
   }) 
  }
}
