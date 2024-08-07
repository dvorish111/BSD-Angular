import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PermissionService } from 'src/app/Services/permission.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent {

  password: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmPasswordComponent>,
    private permissionService:PermissionService
  ) {}

  confirmPassword() {
    console.log(this.password)
    // if (this.permissionService.confirmPassword(this.password))
        if (this.password==='123456789')
       {
      this.dialogRef.close(true);
    } else {
      this.errorMessage = 'סיסמא לא נכונה. בבקשה נסה שוב.';
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  // password: string='';
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
