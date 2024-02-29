import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../Services/permission.service';
import { Parser } from '@angular/compiler';
import { LogIn } from '../Classes/LogIn';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUp } from '../Classes/SignUp';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
 

  loginForm: FormGroup;
  model: any;
  User: SignUp = {
    password: '',
    email: '',
    managerName: ''
  };
  constructor(private myRouter: Router, private permissionSer: PermissionService) {
    this.loginForm = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.minLength(5), Validators.email]),
      Password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)])
    });

  }

  ngOnInit() { }


  get formControls() {
    return this.loginForm.controls;
  }
  onSubmitLoginForm(): void {
    if (this.loginForm.valid) {
      this.User.password = this.loginForm.value.Password;
      this.User.email = this.loginForm.value.Email;
    }
    this.permissionSer.getByPassword_Email(this.User.password,this.User.email).subscribe({
      next: (permission) => {
        this.User=permission;
      this.login();
        alert("successful")
        this.myRouter.navigate(['/admin-interface',permission.managerName])
      },
      error: (err) => {
        alert("no user")
      }
    })
  }

  @Output() loginParams = new EventEmitter<any>();

  login() {
    // Emit the parameters when login button is clicked
    this.loginParams.emit({ username: this.User.managerName, mail:this.User.email });
  }


  }

 

