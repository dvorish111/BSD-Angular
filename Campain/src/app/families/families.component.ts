import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

enum Statuses {
  'Married' = 0,
  'Divorced' = 1,
  'Widow' = 2
}
@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css'],
 
})
export class FamiliesComponent implements OnInit{
  Statuses = Statuses; 
  donates!:Donate[];
  raised!:number;
  status!:string;

  constructor(private donateService:DonateService,public myRouter: Router) {
   
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


}
