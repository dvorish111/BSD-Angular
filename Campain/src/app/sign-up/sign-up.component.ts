import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from '../Classes/LogIn';
import { PermissionService } from '../Services/permission.service';
import { SignUp } from '../Classes/SignUp';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
loginForm:FormGroup;
model: any;
NewUser: SignUp | undefined ;
constructor(private myRouter: Router, private permissionSer: PermissionService,private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
    ManagerName: new FormControl() ,
    Email: new FormControl("", [Validators.required,Validators.minLength(5), Validators.email]),
    Password:new FormControl( "", [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)])
    
    });
} 
ngOnInit() {  } 


get formControls() {
  return this.loginForm.controls;
}
submitLoginForm() {
  if (this.loginForm.invalid) {
    return;}
    this.NewUser = this.loginForm.value;
    }
   

  }


// toJoin(NewUser:NgForm) {

//   this.permissionSer.createPermission(this.NewUser).subscribe({
//     next: (res) => { alert(res)
//       this.myRouter.navigate(['/admin-interface'])
//     },
//     error: (err) => {
//       console.log(' error: ' + err);
//     }
//   })
// }

// }
