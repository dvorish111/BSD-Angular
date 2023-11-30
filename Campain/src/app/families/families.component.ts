import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Statuses } from '../Enums/Statuses';


@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css'],

})




export class FamiliesComponent implements OnInit {

  donates!: Donate[];
  raised!: number;

  Statuses= Statuses ;
  constructor(private donateService: DonateService, public myRouter: Router) {

  }


  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
      ({
        next: (donates: Donate[]) => {
          this.donates = donates;
          console.log(this.donates);
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
}


