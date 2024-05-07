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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AllDonate } from '../Classes/AllClasses/AllDonate';


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
  initialFamiliesCount: number = 45;
  SearchForm:FormGroup;
  constructor( public myRouter: Router,private donateService: DonateService,private donationService:DonationService,private neighborhoodService:NeighborhoodService,private formBuilder: FormBuilder) {
 this.SearchForm= this.formBuilder.group(
    {
      search:new FormControl("")
    })
  }
  familyOfChildrenSelectedValue = new FormControl();
  fundedSelectedValue = new FormControl();
  neededSelectedValue = new FormControl();
  statusSelectedValue = new FormControl();
  neighborhoodSelectedValue = new FormControl();
 

  ngOnInit(): void {
    this.donateService.getAllDonates().subscribe
      ({
        next: (donates: Donate[]) => {
          console.log("sum al donates "+donates.length)
          this.donates = donates;
          this.getAllSumDonationsByDonated(donates);
          this.tempdonates =donates;
          this.getAllNeighborhoods();
       
        },
        error: (err) => {
          console.error(err);
        }
      });

  
    
    

    
  }
  getAllSumDonationsByDonated(donates: Donate[]){
  this.donationService.getAllSumDonationsByDonated().subscribe
  ({
    
    next: (sumAllDonationsByDonated:number[]) => {       
     this.sumAllDonationsByDonated=sumAllDonationsByDonated;

     console.log(this.sumAllDonationsByDonated+"sumAllDonationsByDonated");
     this.ShowLoadedFamiliesCount(donates);
     
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
          this.resetOtherSelections()
          this.familyOfChildrenSelectedValue.setValue(NumChildren); 

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
          this.resetOtherSelections()
          this.neededSelectedValue.setValue(needed); 

        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  funded(funded: string) {
    //if(this.flagIsFulldonates==false)
    this.donates=this.tempdonates;
    if(funded=="true"){
       this.donates=this.tempdonates.filter((d=>d.needed-d.raised>0))
      // this.donates = this.donates.map((item, index) => ({ item, index }))
      // .filter(({ item, index }) => item.needed - item.raised <= 0)
      // .map(({ item }) => item);
    
    }
    if(funded=="false"){
      this.donates=this.tempdonates.filter((d=>d.needed-d.raised<=0))

      // this.donates = this.donates.map((item, index) => ({ item, index }))
      // .filter(({ item, index }) => item.needed -  item.raised > 0)
      // .map(({ item }) => item);
    
      }
      this.ShowLoadedFamiliesCount(this.donates);
this.resetOtherSelections()
this.fundedSelectedValue.setValue(funded); 


   //   this.flagIsFulldonates=false;

  }

  status(status:number){
    this.donateService.getAllStatus(status).subscribe
    ({
        next: (donates: Donate[]) => {
          this.ShowLoadedFamiliesCount(donates);
        console.log(donates);
        this.resetOtherSelections()
          this.statusSelectedValue.setValue(status); 

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
   this.resetOtherSelections()
   this.neighborhoodSelectedValue.setValue(neighborhoodId); 

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
    this.mapFamiliesRandom(donates);
    this.fullDonates =donates;
    this.donates = donates.slice(0, this.initialFamiliesCount);
  
  }
  mapFamiliesRandom(donates:Donate[]){//Fisher-Yates algorithm
      for (let i = donates.length  - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [donates [i],donates [j]] = [donates [j], donates [i]]; 
       [this.sumAllDonationsByDonated[i],this.sumAllDonationsByDonated [j]] = [this.sumAllDonationsByDonated [j], this.sumAllDonationsByDonated [i]]; 

      } 
  }

  resetOtherSelections(){
    this.familyOfChildrenSelectedValue.setValue(null); 
    this.fundedSelectedValue.setValue(null); 
    this.neededSelectedValue.setValue(null); 
    this.statusSelectedValue.setValue(null); 
    this.neighborhoodSelectedValue.setValue(null); 
  }


  onSubmitSearchForm(){
    this.resetOtherSelections()
      this.donates= this.tempdonates.filter(d=>d.id==this.SearchForm.value.search)

  
}
}

