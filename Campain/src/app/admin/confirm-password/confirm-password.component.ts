import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent {



  password: string='';
  isPasswordCorrect: boolean = false;
  hide: boolean = true;

  checkPassword(password: string) {
    // Your password verification logic goes here
    // For example:
    if (password === 'yourAdminPassword') {
      this.isPasswordCorrect = true;
    } else {
      this.isPasswordCorrect = false;
    }
  }
}
