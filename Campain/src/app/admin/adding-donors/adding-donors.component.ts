import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllDonate } from 'src/app/Classes/AllClasses/AllDonate';
import { AllDonor } from 'src/app/Classes/AllClasses/AllDonor';
import { Neighborhood } from 'src/app/Classes/Neighborhood';
import { Statuses } from 'src/app/Enums/Statuses';
import { DonateService } from 'src/app/Services/donate.service';
import { NeighborhoodService } from 'src/app/Services/neighborhood.service';

@Component({
  selector: 'app-adding-donors',
  templateUrl: './adding-donors.component.html',
  styleUrls: ['./adding-donors.component.css']
})
export class AddingDonorsComponent {

 
  newDonate:AllDonate={
    parentTaz:"", 
    name:"",
    numChildren:0,
    idStatus:0,
    street:"",
    needed:0, 
    numberBuilding:0,
    raised:0,
    idNeighborhood:0
   
  }
  // newDonate!:AllDonate;


  selectedNeighborhood!:number;
  neighborhoods!:Neighborhood[];
  allDonate!:AllDonate;
  SearchForm:FormGroup;
  search1!:number;
  statuses: typeof Statuses = Statuses;
  options = Object.keys(this.statuses);

  // constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  
  constructor(private neighborhoodService:NeighborhoodService,private donateService: DonateService,private snackBar: MatSnackBar,private formBuilder: FormBuilder) { 
    this.SearchForm= this.formBuilder.group(
      {
        search:new FormControl("",[Validators.required])
      }
    )
  }
  
ngOnInit(){
  this.options = this.options.slice(this.options.length / 2);

  this.getAllNeighborhoods();

}
  getAllNeighborhoods() {
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

  // keepData(){
  //   console.log("chekkk")
  // }
  onSubmitUpdateFamily(){
  this.donateService.updateDonate(this.newDonate).subscribe(
    {
      next:()=>{
      console.log("update Donate Successfully!!")
      
      // this.addFamilyFormrReset();
      
      this.snackBar.open('update Donate Successfully!!', 'Close', {
        duration: 3000, // optional: time in milliseconds
      });
     
    },
  
      error:(err)=>{
        console.error(err);
      }
    
    }
  ) 
}
resetForm(form: NgForm) {
  this.onSubmitUpdateFamily()
  form.reset(); // אפס את כל הערכים בטופס
}
// mapAddFamilyFormToAllDonate():AllDonate{
//   return this.allDonate={
//     parentTaz:this.ngForm.value.ParentTaz,
//     name:this.addFamilyForm.value.Name,
//     numChildren:this.addFamilyForm.value.NumChildren,
//     raised:0,
//     // idStatus:this.addFamilyForm.value.Status,
//     idStatus:1,
//     street: this.addFamilyForm.value.Street,
//     needed: this.addFamilyForm.value.Needed,
//     numberBuilding:this.addFamilyForm.value.NumberBuilding,
//     idNeighborhood: this.addFamilyForm.value.Neighborhood
//   };
   
  
   
//   }
  // addFamilyFormrReset(){
  //   this.addFamilyForm.reset();
  //   Object.keys(this.addFamilyForm.controls).forEach(key =>{
  //     this.addFamilyForm.controls[key].setErrors(null)
  //  });
  // }
  
  onSubmitSearchForm(){
    this.donateService.getByTazDonate(this.search1).subscribe(
      {
        next:(donate:AllDonate)=>{
          this.newDonate=donate
          
  //        this.addFamilyForm.setValue(
  //         {
  //         ParentTaz:this.donate.parentTaz ,
  //         Name: this.donate.name,
  //         NumChildren:this.donate.numChildren,
  //         Street:this.donate.street ,
  //         Needed:this.donate.needed,
  //         NumberBuilding:this.donate.numberBuilding,
  //         Status: this.donate.idStatus,
  //         Neighborhood: this.donate.idNeighborhood
    // }
    //      )
       
      }
        ,
        
        error:(err)=>console.log(err)
      }
    )
  }



  
  }

