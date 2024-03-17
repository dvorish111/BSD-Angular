import { Component } from '@angular/core';
import { Campaign } from 'src/app/Classes/Campaign';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.css']
})
export class CampaignManagementComponent {
  
// newCampigan:Campaign={
//   name:"",
//   startDate:Date;

// }
campaign = {
  name: '',
  amount: 0,
  startDate: '',
  endDate: ''
};

onSubmit() {
  console.log('Form submitted:', this.campaign);
  // Here you can implement logic to submit the form data to your backend
}
}
