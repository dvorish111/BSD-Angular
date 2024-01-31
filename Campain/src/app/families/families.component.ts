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
  fullDonates!: Donate[];
  sumAllDonationsByDonated!:number[];
  Statuses= Statuses ;
  initialFamiliesCount: number = 5;
  constructor( public myRouter: Router,private donateService: DonateService,private donationService:DonationService,private neighborhoodService:NeighborhoodService) {

  }


  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
      ({
        next: (donates: Donate[]) => {
          this.tempdonates =donates;
          this.ShowLoadedFamiliesCount(donates);
          this.getAllNeighborhoods();
       
        },
        error: (err) => {
          console.error(err);
        }
      });

  
    
    
      this.donationService.getAllSumDonationsByDonated().subscribe
      ({
        
        next: (sumAllDonationsByDonated:number[]) => {       
         this.sumAllDonationsByDonated=sumAllDonationsByDonated;
         console.log(this.sumAllDonationsByDonated+"sumAllDonationsByDonated");
         
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
          this.ShowLoadedFamiliesCount(donates);

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
          this.ShowLoadedFamiliesCount(donates);
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
      this.ShowLoadedFamiliesCount(this.donates);


   //   this.flagIsFulldonates=false;

  }

  status(status:number){
    this.donateService.getAllStatus(status).subscribe
    ({
        next: (donates: Donate[]) => {
          this.ShowLoadedFamiliesCount(donates);
        console.log(donates);
      },
      error: (err) => {
        console.error(err);
      }
    });
    
  }

  neighborhood(neighborhoodId:number)
  {
    //this.donates=this.tempdonates;
    this.donates = [];
    this.tempdonates.forEach(element => {
    if(element.idNeighborhood==neighborhoodId)
    {this.donates.push(element)}    
   });
   this.ShowLoadedFamiliesCount( this.donates);

    //this.tempdonates =this.donates;
   // this.donates=this.donatesN;
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
  showMoreFamilies(): void {
     const currentFamiliesCount = this.donates.length;
     const additionalFamilies = this.fullDonates.slice(currentFamiliesCount, currentFamiliesCount + 5);
     this.donates = this.donates.concat(additionalFamilies);
    //this.donates=this.tempdonates.slice(0,this.donates.length+10)
  }
  ShowLoadedFamiliesCount(donates:Donate[]){
    this.fullDonates =donates;
    this.donates = donates.slice(0, this.initialFamiliesCount);

  }
}


