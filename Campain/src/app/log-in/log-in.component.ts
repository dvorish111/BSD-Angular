import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../Services/permission.service';
import { Parser } from '@angular/compiler';
import { LogIn } from '../Classes/LogIn';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
 

  constructor(public myRouter: Router, public permissionSer: PermissionService) {
  }
  user: LogIn = { Email: '', Password: '' };
  login() {
    
console.log(this.user)
    this.permissionSer.getByPassword_Email(this.user.Password,this.user.Email).subscribe({
      next: (res) => { alert(res)
        this.myRouter.navigate(['/admin-interface'])
      },
      error: (err) => {
        console.log(' error: ' + err);
      }
    })
  }

 
}
