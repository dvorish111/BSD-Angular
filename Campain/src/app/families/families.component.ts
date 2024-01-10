import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { DonationService } from '../Services/donation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Statuses } from '../Enums/Statuses';
import { Neighborhood } from '../Classes/Neighborhood';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { findIndex } from 'rxjs';


@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css'],

})




export class FamiliesComponent implements OnInit {

  neighborhoods!:Neighborhood[];
  donates!: Donate[];
  donatesN!: Donate[];
  tempdonates =this.donates;
  sumAllDonationsByDonated!:number[];
//flagIsFulldonates:boolean=false;
  Statuses= Statuses ;
  constructor( public myRouter: Router,private donateService: DonateService,private donationService:DonationService,private neighborhoodService:NeighborhoodService) {

  }


  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
      ({
        next: (donates: Donate[]) => {
          this.donates = donates;
          console.log(this.donates);
          this.getAllNeighborhoods();
         this.tempdonates =this.donates;
       // this.flagIsFulldonates=true;
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


  familyOfChildren(NumChildren: number) {
    this.donateService.getAllByNumOfChildren(NumChildren).subscribe
      ({
        next: (donates: Donate[]) => {
          this.donates = donates;

          console.log(donates);

        },
        error: (err) => {
          console.error(err);
        }
      });
  }



  needed(needed: number) {
    this.donateService.getAllByNeeded(needed).subscribe
      ({
        next: (donates: Donate[]) => {
          this.donates = donates;
          console.log(donates);

        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  funded(funded: boolean) {
    //if(this.flagIsFulldonates==false)
    this.donates=this.tempdonates;
    if(funded){
      // this.donates=this.donates.filter((d=>d.needed-this.sumAllDonationsByDonated[]))
      this.donates = this.donates.map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.needed - this.sumAllDonationsByDonated[index] <= 0)
      .map(({ item }) => item);
    
    }
    else{
      this.donates = this.donates.map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.needed - this.sumAllDonationsByDonated[index] > 0)
      .map(({ item }) => item);
    
      }
   //   this.flagIsFulldonates=false;

  }

  status(status:number){
    this.donateService.getAllStatus(status).subscribe
    ({
        next: (donates: Donate[]) => {
        this.donates = donates;
        console.log(donates);
      },
      error: (err) => {
        console.error(err);
      }
    });
    
  }

  neighborhood(neighborhoodId:number)
  {
    this.donates=this.tempdonates;
    this.donatesN = [];
    this.donates.forEach(element => {
    if(element.idNeighborhood==neighborhoodId)
    {this.donatesN.push(element)}    
   });
    //this.tempdonates =this.donates;
    this.donates=this.donatesN;
  }

  getAllNeighborhoods(){
    this.neighborhoodService.getAllNeighborhoods().subscribe
    ({
      next: (neighborhood:Neighborhood[]) => {
        this.neighborhoods = neighborhood;
        console.log(this.neighborhoods);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}


