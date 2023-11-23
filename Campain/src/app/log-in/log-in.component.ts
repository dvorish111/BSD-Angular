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

    this.permissionSer.getByIdPermission(5).subscribe({
      next: (res) => { alert(res) 
       //העברה לממשק מנהלים
      },
      error: (err) => {
        console.log(' error: ' + err);
      }
    })
  }

 
}
