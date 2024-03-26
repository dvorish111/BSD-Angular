import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/Classes/SignUp';
import { PermissionService } from 'src/app/Services/permission.service';

@Component({
  selector: 'app-update-manager-details',
  templateUrl: './update-manager-details.component.html',
  styleUrls: ['./update-manager-details.component.css']
})
export class UpdateManagerDetailsComponent {
  loginForm: FormGroup;
  model: any;
  detailesMenegr!:SignUp;
  NewUser: SignUp = {
    password: '',
    managerName: '',
    email: ''
  };
  
  constructor(private premissionSer: PermissionService, private snackBar: MatSnackBar ,private myRouter: Router, private permissionSer: PermissionService, private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      ManagerName: new FormControl(),
      Email: new FormControl("", [Validators.required, Validators.minLength(5), Validators.email]),
      Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)])
    });

  }

  ngOnInit() { 
   
    this.detailesMenegr= this.premissionSer.detailesMenegr;// להוריד סילוש ..שליפת פרטי המנהל מהסרוויס
  console.log("detailesMenegr:", this.detailesMenegr) 
      this.loginForm.setValue({
      ManagerName: this.detailesMenegr.managerName,
      Email: this.detailesMenegr.email,
      Password: this.detailesMenegr.password,
      
    })
  }
  // @Input() data: SignUp | undefined;

  get formControls() { 
  
    return this.loginForm.controls;
   
  }
  submitLoginForm(): void {
    if (this.loginForm.valid) {
      this.NewUser.password = this.loginForm.value.Password;
      this.NewUser.email = this.loginForm.value.Email;
      this.NewUser.managerName = this.loginForm.value.ManagerName;
    }
    
      this.permissionSer.updatePermissionByMail(this.detailesMenegr.email,this.NewUser).subscribe({
        next: (res) => {
          this.showMessageOK("השינוי בוצע בהצלחה") ;  
  
        },
        error: (err) => {
          this.showMessageOK("ישנה בעיה, נסה שנית") ;  
  
          console.log(' error: ' + err);
        }
      })
     

  }
 

  showMessageOK(messege: string) {
    const snackBarRef = this.snackBar.open(messege, 'Close', {
      duration: 5000,
      panelClass: ['snackbar']
    });
  };

}
 

