import { Component, OnInit } from '@angular/core';
import { Neighborhood } from '../Classes/Neighborhood';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Statuses } from '../Enums/Statuses';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { AllDonate } from '../Classes/AllClasses/AllDonate';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-admin-families',
  templateUrl: './admin-families.component.html',
  styleUrls: ['./admin-families.component.css']
})

export class AdminFamiliesComponent implements OnInit {

  addFamilyForm: FormGroup;
  SearchForm:FormGroup;
  //statuses!:Statuses;
statusFamilyForm:string|undefined;
  allDonate!:AllDonate;
  donate!:AllDonate;
  statuses: typeof Statuses = Statuses;
  options = Object.keys(this.statuses);


  neighborhoods!: Neighborhood[];
  constructor(private neighborhoodService: NeighborhoodService, private donateService: DonateService,private formBuilder: FormBuilder,private snackBar: MatSnackBar) {
    this.addFamilyForm = this.formBuilder.group(
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
      this.SearchForm= this.formBuilder.group(
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
  raised:0,
  // idStatus:this.addFamilyForm.value.Status,
  idStatus:1,
  street: this.addFamilyForm.value.Street,
  needed: this.addFamilyForm.value.Needed,
  numberBuilding:this.addFamilyForm.value.NumberBuilding,
  idNeighborhood: this.addFamilyForm.value.Neighborhood
};
 

 
}
addFamilyFormrReset(){
  this.addFamilyForm.reset();
  Object.keys(this.addFamilyForm.controls).forEach(key =>{
    this.addFamilyForm.controls[key].setErrors(null)
 });
}


  onSubmitFamilyForm() {
    if(this.statusFamilyForm=='create'){
this.donateService.createDonate(this.mapAddFamilyFormToAllDonate()).subscribe(
  {
    next:()=>{
    
    console.log("create Donate Successfully!!")
    this.addFamilyFormrReset();
    this.snackBar.open('create Donate Successfully!!', 'Close', {
      duration: 3000, // optional: time in milliseconds
    });
   
  },

    error:(err)=>{
      console.error(err);
    }
  
  }
)}
else{
  this.donateService.updateDonate(this.mapAddFamilyFormToAllDonate()).subscribe(
    {
      next:()=>{
      console.log("update Donate Successfully!!")
      
      this.addFamilyFormrReset();
      
      this.snackBar.open('create Donate Successfully!!', 'Close', {
        duration: 3000, // optional: time in milliseconds
      });
     
    },
  
      error:(err)=>{
        console.error(err);
      }
    
    }
  ) 
}

  }

 createFamilyForm(){
this.statusFamilyForm='create';
this.addFamilyFormrReset();
  }
  updateFamilyForm(){
    this.statusFamilyForm='update';
    this.addFamilyFormrReset();
  }
  onSubmitSearchForm(){
    this.donateService.getByTazDonate(this.SearchForm.value.search).subscribe(
      {
        next:(donate:AllDonate)=>{
          this.donate=donate
         this.addFamilyForm.setValue(
          {
          ParentTaz:this.donate.parentTaz ,
          Name: this.donate.name,
          NumChildren:this.donate.numChildren,
          Street:this.donate.street ,
          Needed:this.donate.needed,
          NumberBuilding:this.donate.numberBuilding,
          Status: this.donate.idStatus,
          Neighborhood: this.donate.idNeighborhood
   }
         )
       
      }
        ,
        
        error:(err)=>console.log(err)
      }
    )
  }
}


