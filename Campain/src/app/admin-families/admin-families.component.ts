import { Component } from '@angular/core';
import { Neighborhood } from '../Classes/Neighborhood';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Statuses } from '../Enums/Statuses';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-families',
  templateUrl: './admin-families.component.html',
  styleUrls: ['./admin-families.component.css']
})

export class AdminFamiliesComponent {
 
addFamilyForm:FormGroup;
status!:Statuses;
f:string[]=["A","B","C"];
foods: Food[] = [
  {value: 'steak-0', viewValue: 'Steak'},
  {value: 'pizza-1', viewValue: 'Pizza'},
  {value: 'tacos-2', viewValue: 'Tacos'},
];

// neighborhood:Neighborhood;
  constructor() {
    this.addFamilyForm=new FormGroup(
      {
        ParentTaz:  new FormControl("",[Validators.required]),
        Name:  new FormControl("",[Validators.required]),
        NumChildren:  new FormControl("",[Validators.required]),
        Street: new FormControl("",[Validators.required]),
        Needed:  new FormControl("",[Validators.required]),
        Status:  new FormControl("",[Validators.required])
      
      })
    
    
      }


    
  onSubmitAddFamilyForm(){

  }
  }


