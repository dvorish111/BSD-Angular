import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent {
  isPasswordCorrect: boolean = false;
  password: string = '';
  checkPassword(password: string): void {
    // בצע את האימות שלך כאן
    // אם הסיסמה נכונה, שנה את הערך של isPasswordCorrect ל true
    this.isPasswordCorrect = true;
  }
}
