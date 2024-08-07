import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/Classes/SignUp';
import { PermissionService } from 'src/app/Services/permission.service';
import { ConfirmPasswordComponent } from '../confirm-password/confirm-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent {
  loginForm: FormGroup;
  model: any;
  NewUser: SignUp = {
    password: '',
    managerName: '',
    email: ''
  };
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar ,private myRouter: Router, private permissionSer: PermissionService, private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      ManagerName: new FormControl(),
      Email: new FormControl("", [Validators.required, Validators.minLength(5), Validators.email]),
      Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)])
    });

  }

  ngOnInit() { 
    this.openConfirmPasswordDialog();

    // if(this.data){
    //   this.loginForm.setValue({
    //   ManagerName: this.data.managerName,
    //   Email: this.data.email,
    //   Password: this.data.password,
      
    // });}
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
    // if(this.data){
    //   this.permissionSer.updatePermissionByMail(this.data.email,this.NewUser).subscribe({
    //     next: (res) => {
    //       alert("successful")
    //       this.myRouter.navigate(['/admin-interface'])
    //     },
    //     error: (err) => {
    //       console.log(' error: ' + err);
    //     }
    //   })
    // }
   this.permissionSer.createPermission(this.NewUser).subscribe({
      next: (res) => {
        this.showMessageOK(" בהצלחה התווסף" +this.NewUser.managerName+" המנהל ") ;  

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


   //eקשור לאימות מנהל ראשי
   openConfirmPasswordDialog() {
    const dialogRef = this.dialog.open(ConfirmPasswordComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myRouter
        // הסיסמה נכונה, נווט לקומפוננטה היעד
        // לדוגמה: this.router.navigate(['/target-component']);
      } else {
        // הסיסמה לא נכונה או בוטלה
        this.navigateToPreviousRoute();
      }
    });
  }

  navigateToPreviousRoute() {
    // קבלת הנתיב הנוכחי
    const currentUrl = this.myRouter.url;
    // חלוקת הנתיב למרכיבים
    const urlSegments = currentUrl.split('/');
    // הסרת החלק האחרון של הנתיב
    urlSegments.pop();
    // יצירת הנתיב החדש
    const newUrl = urlSegments.join('/');
    // ניתוב לנתיב החדש
    this.myRouter.navigate([newUrl]);
  }

    //עד פה קשור לאימות מנהל ראשי

}
 
