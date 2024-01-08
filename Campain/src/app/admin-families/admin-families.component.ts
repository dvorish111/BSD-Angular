import { Component, OnInit } from '@angular/core';
import { Neighborhood } from '../Classes/Neighborhood';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Statuses } from '../Enums/Statuses';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { AllDonate } from '../Classes/AllClasses/AllDonate';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-families',
  templateUrl: './admin-families.component.html',
  styleUrls: ['./admin-families.component.css']
})

export class AdminFamiliesComponent implements OnInit {

  addFamilyForm: FormGroup;
  SearchForm:FormGroup;
  //statuses!:Statuses;
  //keys = Object.keys;
  allDonate!:AllDonate;
  donate!:Donate;
  statuses: typeof Statuses = Statuses;
  options = Object.keys(this.statuses);


  neighborhoods!: Neighborhood[];
  constructor(private neighborhoodService: NeighborhoodService, private donateService: DonateService) {
    this.addFamilyForm = new FormGroup(
      {
        ParentTaz: new FormControl("", [Validators.required]),
        Name: new FormControl("", [Validators.required]),
        NumChildren: new FormControl("", [Validators.required]),
        Street: new FormControl("", [Validators.required]),
        Needed: new FormControl("", [Validators.required]),
        NumberBuilding:new FormControl("",[Validators.required]),
        Status: new FormControl("", [Validators.required]),
        Neighborhood: new FormControl("", [Validators.required])

      })
      this.SearchForm=new FormGroup(
        {
          search:new FormControl("",[Validators.required])
        }
      )


  }
  ngOnInit(): void {
    this.options = this.options.slice(this.options.length / 2);
    this.neighborhoodService.getAllNeighborhoods().subscribe
      ({
        next: (neighborhood: Neighborhood[]) => {
          this.neighborhoods = neighborhood;
          console.log(this.neighborhoods);

        },
        error: (err) => {
          console.error(err);
        }
      });

  }


  mapAddFamilyFormToAllDonate():AllDonate{
return this.allDonate={
  parentTaz:this.addFamilyForm.value.ParentTaz,
  name:this.addFamilyForm.value.Name,
  numChildren:this.addFamilyForm.value.NumChildren,
  // idStatus:this.addFamilyForm.value.Status,
  idStatus:1,
  street: this.addFamilyForm.value.Street,
  needed: this.addFamilyForm.value.Needed,
  numberBuilding:this.addFamilyForm.value.NumberBuilding,
  idNeighborhood: this.addFamilyForm.value.Neighborhood
};
 

 
}


  onSubmitAddFamilyForm() {
this.donateService.createDonate(this.mapAddFamilyFormToAllDonate()).subscribe(
  {
    next:()=>{
    console.log("create Donate Successfully!!")},

    error:(err)=>{
      console.error(err);

    }

  }
)

  }
  onSubmitSearchForm(){
    this.donateService.getByTazDonate(this.SearchForm.value.search).subscribe(
      {
        next:(donate:Donate)=>{this.donate=donate
        this.addFamilyForm.value.ParentTaz.setValue(1)}
        ,
        
        error:(err)=>console.log(err)
      }
    )
  }
}


