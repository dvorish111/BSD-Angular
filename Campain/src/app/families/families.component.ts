import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DonationService } from '../Services/donation.service';

export enum Statuses {
  'Married' = 1,
  'Divorced' = 2,
  'Widow' = 3
}

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css'],
 // changeDetection: ChangeDetectionStrategy.OnPush
 
})
export class FamiliesComponent implements OnInit{
 Statuses = Statuses; 
  donates!:Donate[];
  raised!:number;
  status!:string;
  sumAllDonationsByDonated!:number[];
  flag:boolean=false;
  needded:number=0;
  constructor(private donateService:DonateService,private donationService:DonationService,public myRouter: Router,private cdr:ChangeDetectorRef ) {
   
  }
 
  
  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
    ({
      next: (donates:Donate[]) => {       
        this.donates =donates ;        
        console.log(this.donates);
       
      },
      error: (err) => {
        console.error(err);
      }
    });
    
      this.donationService.getAllSumDonationsByDonated().subscribe
      ({
        
        next: (sumAllDonationsByDonated:number[]) => {       
         this.sumAllDonationsByDonated=sumAllDonationsByDonated;
         console.log(this.sumAllDonationsByDonated);
         
        },
        error: (err) => {
          console.error(err);
        }
      });
      
    
  }


// async SumDonationsByDonated(IdDonated: number): Promise<number> {
//   try {
//     const sumDonationsByDonated: number | undefined = await this.donationService.getSumDonationsByDonated(IdDonated).toPromise();
//     if (sumDonationsByDonated) {
//       const sum: number = sumDonationsByDonated;
//       console.log(sum);
//       return sum;
    
//     } else {
//       throw new Error('Sum of donations is undefined');
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

 familyOfChildren(NumChildren:number) {
  this.donateService.getAllByNumOfChildren(NumChildren).subscribe
  ({
    next: (donate:Donate[]) => {
             
      console.log(donate);

    },
    error: (err) => {
      console.error(err);
    }
  });
}


}
