import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { Statuses } from '../Enums/Statuses';


@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css']
})
export class FamiliesComponent {
 status:Statuses | undefined;

  constructor(public myRouter: Router, private donateService: DonateService) {

  }
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

  

    needed(needed: number) {
      this.donateService.getAllByNeeded(needed).subscribe
  ({
    next: (donate:Donate[]) => {
             
      console.log(donate);

    },
    error: (err) => {
      console.error(err);
    }
  });
      }

      funded(funded: boolean) {
       
            }
        }


