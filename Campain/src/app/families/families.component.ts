import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Statuses } from '../Enums/Statuses';
import { Neighborhood } from '../Classes/Neighborhood';
import { NeighborhoodService } from '../Services/neighborhood.service';


@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css'],

})




export class FamiliesComponent implements OnInit {

  neighborhoods!:Neighborhood[];
  donates!: Donate[];
  raised!: number;
  donatesN!: Donate[];
  tempdonates =this.donates;

  Statuses= Statuses ;
  constructor(private donateService: DonateService, public myRouter: Router,private neighborhoodService:NeighborhoodService) {

  }


  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
      ({
        next: (donates: Donate[]) => {
          this.donates = donates;
          console.log(this.donates);
          this.getAllNeighborhoods();
         this.tempdonates =this.donates;
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
  {this.donates=this.tempdonates;
    this.donatesN = [];
    this.donates.forEach(element => {
    if(element.idNeighborhood==neighborhoodId)
    {this.donatesN.push(element)}    
   });
    this.tempdonates =this.donates;
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


