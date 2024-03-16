import { Component } from '@angular/core';
import { SignUp } from 'src/app/Classes/SignUp';

@Component({
  selector: 'app-update-manager-details',
  templateUrl: './update-manager-details.component.html',
  styleUrls: ['./update-manager-details.component.css']
})
export class UpdateManagerDetailsComponent {
  manager: SignUp = {
    managerName: "",
    password: "",
    email: ""
  }

  saveUser(form: any) {
    console.log("chekkkkkkk")
  }
 
}
