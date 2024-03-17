import { Component } from '@angular/core';
import { SignUp } from 'src/app/Classes/SignUp';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent {
  manager: SignUp = {
    managerName: "",
    password: "",
    email: ""
  }

  saveUser(form: any) {
    console.log("chekkkkkkk")
  }
}
