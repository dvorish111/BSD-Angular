import { Component, OnInit } from '@angular/core';
import { DonationService } from '../Services/donation.service';

@Component({
  selector: 'app-show-donations',
  templateUrl: './show-donations.component.html',
  styleUrls: ['./show-donations.component.css']
})
export class ShowDonationsComponent implements OnInit{
  TotalRaised!:number;
constructor(private donationService:DonationService){};
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




}
