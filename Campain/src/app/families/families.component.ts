import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
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

  constructor(private donateService:DonateService) {
   
  }
 
  
  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
    ({
      next: (donates:Donate[]) => {       
        this.donates =donates ;        
        console.log(this.donates);
       // this.status=stauses[1];
       
        //this.donates[0].street;
      },
      error: (err) => {
        console.error(err);
      }
    });
  
  }

}
