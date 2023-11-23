import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from '../Classes/LogIn';
import { PermissionService } from '../Services/permission.service';
import { SignUp } from '../Classes/SignUp';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

constructor(public myRouter: Router, public permissionSer: PermissionService) {
}
NewUser: SignUp = {ManagerName: '', Password: '',Email: '' };
toJoin() {

  this.permissionSer.createPermission(this.NewUser).subscribe({
    next: (res) => { alert(res)
    //העברה לממשק מנהלים
    },
    error: (err) => {
      console.log(' error: ' + err);
    }
  })
}

}
