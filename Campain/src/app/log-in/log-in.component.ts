import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../Services/permission.service';
import { Parser } from '@angular/compiler';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(public myRouter: Router, public PSer:PermissionService) {
  }
  
 

 
}
